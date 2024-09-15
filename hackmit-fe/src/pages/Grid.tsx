import React, { useRef, useState } from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonButton, IonGrid, IonRow, IonCol } from '@ionic/react'
import './Grid.css'
import './Home.css'
import Toolbar from '../components/Toolbar'
import { useQuery, useConvex } from 'convex/react'
import { api } from '../../convex/_generated/api'

const Grid: React.FC = () => {
    const syllables = useQuery(api.audio.ipaChars, {})
    const convex = useConvex() // Convex client for manual query calls
    const audioRef = useRef<HTMLAudioElement>(null)

    // Function to download, play and then delete the audio file using Blob URL
    const playAudio = async (syllable: string) => {
        try {
            // Fetch the audio URL from your getAudio endpoint
            const result = await convex.query(api.audio.getAudio, { ipaChar: syllable })

            if (result?.url) {
                // Fetch the audio file as a blob
                const response = await fetch(result.url)
                const blob = await response.blob()

                // Create a local Blob URL
                const blobUrl = URL.createObjectURL(blob)

                // Set the Blob URL as the audio source and play
                if (audioRef.current) {
                    audioRef.current.src = blobUrl
                    audioRef.current.play()

                    // Once playback ends, revoke the Blob URL to free up memory
                    audioRef.current.onended = () => {
                        URL.revokeObjectURL(blobUrl)
                    }
                }
            } else {
                console.error('No valid audio URL found.')
            }
        } catch (error) {
            console.error('Error fetching audio URL:', error)
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <Toolbar />
            </IonHeader>

            <IonContent fullscreen className='ion-padding'>
                <IonTitle className='page-title'>IPA Reference</IonTitle>
                <IonTitle className='page-subtitle'>Tap on a character to hear it.</IonTitle>

                <IonGrid>
                    <IonRow>
                        {syllables &&
                            syllables.map((syllable, index) => (
                                <IonCol size='3' key={index}>
                                    <IonButton
                                        className='syllable-button'
                                        expand='full'
                                        onClick={() => playAudio(syllable)} // Pass the syllable (IPA char) to playAudio
                                    >
                                        {syllable}
                                    </IonButton>
                                </IonCol>
                            ))}
                    </IonRow>
                </IonGrid>

                {/* Audio element to play the dynamically fetched and temporary Blob audio */}
                <audio ref={audioRef}>
                    <source src='' type='audio/wav' />
                    Your browser does not support the audio element.
                </audio>
            </IonContent>
        </IonPage>
    )
}

export default Grid
