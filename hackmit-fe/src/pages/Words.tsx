import {
    IonContent,
    IonHeader,
    IonPage,
    IonToolbar,
    IonButton,
    IonButtons,
    IonTitle,
    IonSearchbar,
    IonBackButton,
} from '@ionic/react'
import React, { useRef, useEffect, useState } from 'react'
import './Words.css'
import '../theme/variables.css'
import logo from '../assets/nobg.png'
import { api } from '../../convex/_generated/api.js'
import { useQuery } from 'convex/react'

const Words: React.FC = () => {
    const [searchText, setSearchText] = useState<string>('') // Search text state

    // Fetching the words based on the search text using `useQuery`
    const fetchedWords = useQuery(api.tasks.getWords, {}) // Fetch initial words without search
    const filteredWords = useQuery(api.tasks.searchWords, { query: searchText }) // Fetch filtered words based on search text

    const colorClasses = [
        'var(--ion-color-color1)',
        'var(--ion-color-color4)',
        'var(--ion-color-color8)',
        'var(--ion-color-color9)',
    ]

    const wordOfTheDay = 'Technology'

    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const container = containerRef.current

        const handleScroll = () => {
            const cards = container?.getElementsByClassName('word-card')
            if (cards) {
                const containerHeight = container!.offsetHeight
                const middle = (containerHeight * 2) / 3

                for (let i = 0; i < cards.length; i++) {
                    const card = cards[i] as HTMLElement
                    const rect = card.getBoundingClientRect()
                    const distanceToMiddle = Math.abs(rect.top + rect.height / 2 - middle)

                    const scale = Math.max(0.85, 1 - distanceToMiddle / middle)
                    const zIndex = 10 - distanceToMiddle / middle

                    card.style.transform = `scale(${scale})`
                    card.style.zIndex = `${Math.round(zIndex)}`
                }
            }
        }

        container?.addEventListener('scroll', handleScroll)

        return () => {
            container?.removeEventListener('scroll', handleScroll)
        }
    }, [])

    // Choose which words to display (searched or fetched)
    const displayedWords = searchText && filteredWords ? filteredWords : fetchedWords || [] // Add a fallback for null

    return (
        <IonPage>
            <IonHeader>
                <IonButtons slot='start'>
                    <IonBackButton text='<' icon='' defaultHref='/' />
                </IonButtons>

                <IonToolbar className='toolbar'>
                    <img src={logo} alt='Phonify Logo' style={{ maxWidth: '70px', height: 'auto' }} />
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className='ion-padding' scrollY={false}>
                <IonTitle className='title'>{'Choose a word to learn!'}</IonTitle>
                <IonTitle className='small-title'>{'Or, search a word below:'}</IonTitle>

                <IonSearchbar value={searchText} onIonInput={(e: any) => setSearchText(e.target.value)} debounce={300} />

                <div className='word-of-the-day-card'>
                    <IonButton className='word-of-the-day word-button ' expand='block'>
                        {'Word of the Day: ' + wordOfTheDay}
                    </IonButton>
                </div>

                <div className='scrollable-vertical' ref={containerRef}>
                    {displayedWords.map((word, index) => (
                        <div key={index} className='word-card'>
                            <IonButton
                                className='word-button'
                                expand='block'
                                style={{ '--background': colorClasses[index % colorClasses.length] }}
                                routerLink={`/word-practice/${word.toLocaleLowerCase()}`}

                            >
                                {word}
                            </IonButton>
                        </div>
                    ))}
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Words
