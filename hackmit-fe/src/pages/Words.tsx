import { IonContent, IonHeader, IonPage, IonButton, IonTitle, IonSearchbar, IonCard } from '@ionic/react'
import React, { useRef, useEffect, useState } from 'react'
import './Words.css'
import '../theme/variables.css'
import { api } from '../../convex/_generated/api.js'
import { useQuery } from 'convex/react'
import Toolbar from '../components/Toolbar.js'
import { Word } from '../type/Word.js'

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

    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const container = containerRef.current

        const handleScroll = () => {
            const cards = container?.getElementsByClassName('search-word-card')
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
        setTimeout(() => document.querySelector('.scrollable-vertical')?.scrollTo(0, 1), 200)

        return () => {
            container?.removeEventListener('scroll', handleScroll)
        }
    }, [])

    // Choose which words to display (searched or fetched)
    let displayedWords = searchText && filteredWords ? filteredWords : fetchedWords || [] // Add a fallback for null

    displayedWords = uniquifyEntries(displayedWords)

    function uniquifyEntries(entries: string[]) {
        var seenHits: Record<string, boolean> = {}
        return entries.filter((entry) => {
            var k = entry
            return seenHits.hasOwnProperty(k) ? false : (seenHits[k] = true)
        })
    }

    return (
        <IonPage>
            <IonHeader>
                <Toolbar />
            </IonHeader>
            <IonContent fullscreen className='ion-padding' scrollY={false}>
                <IonTitle className='page-title'>Dictionary</IonTitle>
                <IonTitle className='page-subtitle'>Search or tap on a word.</IonTitle>

                <IonSearchbar
                    className='searchbar'
                    value={searchText}
                    onIonInput={(e: any) => setSearchText(e.target.value)}
                    debounce={300}
                    placeholder='Search...'
                />

                <div className='scrollable-vertical' ref={containerRef}>
                    {displayedWords.map((word: any, index: any) => (
                        <div key={index} className='search-word-card'>
                            <IonCard
                                className='word-button'
                                // style={{ '--background': colorClasses[index % colorClasses.length] }}
                                routerLink={`/word-practice/${word.toLocaleLowerCase()}`}
                            >
                                {word.toLocaleLowerCase()}
                            </IonCard>
                        </div>
                    ))}
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Words
