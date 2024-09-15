import { IonContent, IonHeader, IonPage, IonButton, IonTitle, IonSearchbar } from '@ionic/react'
import { TrashBinOutline } from 'react-ionicons'
import React, { useRef, useState } from 'react'
import './PlayGround.css'
import '../theme/variables.css'
import { api } from '../../convex/_generated/api.js'
import { useQuery } from 'convex/react'
import OpenAIApi from 'openai'
import { useHistory } from 'react-router-dom'
import Toolbar from '../components/Toolbar.js'

// Initialize OpenAI API
const openai = new OpenAIApi({
    apiKey: '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',
    dangerouslyAllowBrowser: true,
})

interface SelectedWord {
    id: number
    word: string
}

const PlayGround: React.FC = () => {
    const [searchText, setSearchText] = useState<string>('')
    const [selectedWords, setSelectedWords] = useState<SelectedWord[]>([])
    const [phrase, setPhrase] = useState<string>('')

    const history = useHistory() // Use useHistory for React Router v5

    const filteredWords = useQuery(api.tasks.searchWords, { query: searchText })

    const containerRef = useRef<HTMLDivElement>(null)

    const handleRemoveWord = (id: number) => {
        setSelectedWords((prevWords) => prevWords.filter((w) => w.id !== id))
    }

    const handleAddWord = (word: string) => {
        setSelectedWords((prevWords) => [...prevWords, { id: Date.now(), word }])
    }

    const generatePhrase = async () => {
        const words = selectedWords.map((w) => w.word).join(', ')
        const prompt = `Generate a very simple sentence using the following words at least once each: ${words}. Make sure it is a full sentence though.`

        console.log('Generating phrase with prompt:', prompt) // Debugging line

        try {
            const response = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 50,
                temperature: 0.7,
            })

            console.log('OpenAI response:', response) // Debugging line

            if (response.choices && response.choices.length > 0) {
                const generatedPhrase = response.choices[0]?.message?.content?.trim() // Use 'message.content' for chat completion response
                if (generatedPhrase) {
                    setPhrase(generatedPhrase)

                    const encodedPhrase = encodeURIComponent(generatedPhrase)
                    console.log('Navigating to:', `/word-practice/${encodedPhrase}`) // Debugging line

                    history.push(`/word-practice/${encodedPhrase}`) // Use history for React Router v5
                } else {
                    console.log('No content in response message') // Debugging line
                }
            } else {
                console.log('No choices returned from OpenAI') // Debugging line
            }
        } catch (error) {
            console.error('Error generating phrase:', error)
        }
    }

    const displayedWords = searchText && filteredWords ? filteredWords.slice(0, 3) : []

    return (
        <IonPage>
            <IonHeader>
                <Toolbar />
            </IonHeader>
            <IonContent fullscreen className='ion-padding' scrollY={false}>
                <IonTitle className='page-title'>Word Soup</IonTitle>
                <IonTitle className='page-subtitle' style={{ fontSize: '18px' }}>
                    Search for words to practice!
                </IonTitle>

                <IonSearchbar
                    className='searchbar'
                    value={searchText}
                    onIonInput={(e: any) => setSearchText(e.target.value)}
                    debounce={300}
                />

                {searchText && (
                    <div className='search-results-row' ref={containerRef}>
                        {displayedWords.map((word: any, index: any) => (
                            <div key={index} className='small-word-card' onClick={() => handleAddWord(word)}>
                                <span className={`word-text ${word.length > 10 ? 'long' : ''}`}>{word}</span>
                            </div>
                        ))}
                    </div>
                )}

                {selectedWords.length > 0 && (
                    <div className='practice-now-container'>
                        <IonButton className='practice-button big-practice' expand='full' onClick={generatePhrase}>
                            Practice Now
                        </IonButton>
                    </div>
                )}

                <div className='image-container'>
                    <img src='src/assets/soup.png' className='soup-image' />
                </div>

                {selectedWords.length > 0 && (
                    <div className='selected-words'>
                        <IonTitle className='selected-words-title'>Selected Words:</IonTitle>
                        <ul className='no-bullets'>
                            {selectedWords.map((item) => (
                                <li key={item.id}>
                                    <div className='selected-word-item'>
                                        <IonButton
                                            className='remove-button'
                                            fill='clear'
                                            onClick={() => handleRemoveWord(item.id)}
                                        >
                                            <TrashBinOutline color={'#00000'} />
                                        </IonButton>
                                        <span>{item.word}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {selectedWords.length === 0 && searchText.length === 0 && (
                    <div className='soup-hint'>Start typing to find inspo words for a new sentence ☝️</div>
                )}
            </IonContent>
        </IonPage>
    )
}

export default PlayGround
