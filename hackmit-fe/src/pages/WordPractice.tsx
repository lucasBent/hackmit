import {
    IonButton,
    IonContent,
    IonFab,
    IonFabButton,
    IonHeader,
    IonPage,
    IonSpinner,
    IonTitle,
    IonToolbar,
    IonSearchbar,
} from '@ionic/react'
import './WordPractice.css'
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react'
import { IonIcon } from '@ionic/react'
import { headset, mic, refreshCircleOutline, stopCircleOutline, stopOutline } from 'ionicons/icons'
import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router'
import { useQuery, useConvex } from 'convex/react'
import { api } from '../../convex/_generated/api.js'
import { Word } from '../type/Word.js'
import { VoiceRecorder } from 'capacitor-voice-recorder'
import backend from '../util/Backend.js'
import Phrase from '../components/Phrase.js'
import Toolbar from '../components/Toolbar.js'
import { useAudioRecorder } from 'react-audio-voice-recorder'
import { LiveAudioVisualizer } from 'react-audio-visualize'

interface WordPracticeParams {
    word: string
}

const WordPractice: React.FC = () => {
    const { word } = useParams<WordPracticeParams>()
    const wordData = useQuery(api.tasks.getWord, { word: word })

    const convex = useConvex() // Convex client for manual query calls
    const [isLoading, setIsLoading] = useState(false)
    const audioRef = useRef<HTMLAudioElement>(null)

    // Function to download, play and then delete the audio file using Blob URL
    const playAudio = async (word: string) => {
        setIsLoading(true)
        try {
            // Fetch the audio URL from your getAudio endpoint
            const result = await convex.query(api.audio.getWordAudio, { word: word })

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
        setIsLoading(false)
    }

    function sanitizeData(wordData: Word[]) {
        return uniquifyTranscriptions(wordData).map((entry) => {
            entry.ipa = cleanTranscription(entry.ipa)
            return entry
        })

        function uniquifyTranscriptions(entries: Word[]) {
            var seenHits: Record<string, boolean> = {}
            return entries.filter((entry) => {
                var k = entry.ipa
                return seenHits.hasOwnProperty(k) ? false : (seenHits[k] = true)
            })
        }
    }

    function cleanTranscription(transcription: string) {
        transcription = transcription
            .replaceAll(' ', '')
            .replaceAll('ˈ', '')
            .replaceAll('ː', '')
            .replaceAll('ˌ', '')
            .replaceAll('*', '')
            .replaceAll('͡', '')
            .replaceAll('̩', '')
        ifThisFollowsThisThenReplaceWithThis('ə', 'ɹ', 'ɚ')
        ifThisFollowsThisThenReplaceWithThis('ə', 'r', 'ɚ')
        ifThisFollowsThisThenReplaceWithThis('ə', 'ɝ', 'ɚ')
        ifThisFollowsThisThenReplaceWithThis('ə', 'ɚ', 'ɚ')
        ifThisFollowsThisThenReplaceWithThis('ɚ', 'ɹ', 'ɚ')
        ifThisFollowsThisThenReplaceWithThis('ɝ', 'ɹ', 'ɚ')
        ifThisFollowsThisThenReplaceWithThis('ɚ', 'r', 'ɚ')
        ifThisFollowsThisThenReplaceWithThis('ɝ', 'r', 'ɚ')

        return transcription

        function ifThisFollowsThisThenReplaceWithThis(i1: string, i2: string, replacement: string) {
            const i1Index = transcription.indexOf(i1)
            if (i1Index > -1 && transcription.length - 1 > i1Index && transcription.indexOf(i2) === i1Index + 1)
                transcription =
                    transcription.substring(0, i1Index) +
                    replacement +
                    transcription.substring(i1Index + 2, transcription.length)
        }
    }

    let sanitizedData: Word[] = []
    if (wordData) sanitizedData = sanitizeData(wordData)

    var correctWord = true
    const [wordIsUsed, toggleWordIsUsed] = useState(false)
    const [canRecord, setCanRecord] = useState(false)
    const [recording, setRecording] = useState(false)
    const [attemptTranscription, setAttemptTranscription] = useState('')
    const [hasRecorded, setHasRecorded] = useState(false)
    const [attemptResults, setAttemptResults] = useState<string[]>([])
    const recorder = useAudioRecorder()

    async function recordButtonPressed() {
        if (!recording) {
            setRecording(true)
            recorder.startRecording()
            const tryRecording = await VoiceRecorder.startRecording()
        } else {
            setHasRecorded(true)
            setRecording(false)
            recorder.stopRecording()
            setAttemptTranscription('')
            const getRecording = await VoiceRecorder.stopRecording()
            const response = await backend.doPost('transcribe', {
                recording: getRecording.value.recordDataBase64,
            })
            const transcriptionFromUser = JSON.parse(response?.data?.message.replaceAll(`'`, `"`))?.text
            setAttemptTranscription(cleanTranscription(transcriptionFromUser))
        }
    }

    useEffect(() => {
        checkIfCanRecord()
    }, [])

    useEffect(() => {
        setAttemptResults(getResultsForAttempt(sanitizedData, attemptTranscription))
    }, [attemptTranscription])

    function getResultsForAttempt(entries: Word[], attemptTranscription: string) {
        for (const entry of entries) {
            entry.comparison = compareTranscription(entry.ipa, attemptTranscription)
            if (!entry.comparison.length) {
                const successfulResult = []
                for (let i = 0; i < attemptTranscription.length; i++) successfulResult.push('definitely-correct')
                return successfulResult
            }
        }

        const comps: number[][] = []
        for (const entry of sanitizedData) if (entry.comparison) comps.push(entry.comparison)

        const attemptResults = []
        for (let i = 0; i < attemptTranscription.length; i++) {
            let errors = 0
            for (const comp of comps) if (comp.includes(i)) errors++
            if (errors === comps.length) attemptResults.push('not-correct')
            else if (errors > 0) attemptResults.push('maybe-correct')
            else attemptResults.push('definitely-correct')
        }
        return attemptResults

        function compareTranscription(entry: string, attempt: string) {
            const wrongIndices: number[] = []
            for (let i = 0; i < Math.max(entry.length, attempt.length); i++) {
                if (i > entry.length || i > attempt.length || !isMatch(entry[i], attempt[i])) wrongIndices.push(i)
            }
            return wrongIndices
        }

        function isMatch(c1: string, c2: string) {
            const chars = [c1, c2]
            if (
                c1 === c2 ||
                theyAre('ɝ', 'ɚ') ||
                theyAre('ɹ', 'r') ||
                theyAre('ɪ', 'ə') ||
                theyAre('ɒ', 'ɔ') ||
                theyAre('ɑ', 'ɔ') ||
                theyAre('ɡ', 'ɡ') ||
                theyAre('ɚ', 'r') ||
                theyAre('ɚ', 'ɹ')
            )
                return true
            return false

            function theyAre(similar1: string, similar2: string) {
                return chars.includes(similar1) && chars.includes(similar2)
            }
        }
    }

    async function checkIfCanRecord() {
        const canRecord = await VoiceRecorder.canDeviceVoiceRecord()
        if (canRecord.value === true) {
            let hasPermission = await VoiceRecorder.hasAudioRecordingPermission()
            if (hasPermission.value === false) hasPermission = await VoiceRecorder.requestAudioRecordingPermission()
            if (hasPermission.value === true) return setCanRecord(true)
        }
        setCanRecord(false)
    }
    return (
        <IonPage>
            <IonHeader>
                <Toolbar />
            </IonHeader>
            <IonContent fullscreen className='ion-padding' scrollY={false}>
                <IonTitle className='page-title' style={{ marginBottom: '2rem' }}>
                    IPA Practice
                </IonTitle>
                <div className='pal-contact-section' style={{ marginBottom: '2rem' }}>
                    <img src='src/assets/bunny-ipal.png' style={{ width: 'auto', height: '4rem' }} />
                    <div className='homepage-text-wrap' style={{ width: '60%' }}>
                        <div className='homepage-subtitle' style={{ marginBottom: '0' }}>
                            Tap the card to hear the pronunciation or record your voice to compare!
                        </div>
                    </div>
                </div>
                <IonCard className='word-card'>
                    <IonCardHeader onClick={() => playAudio(word)} style={{ cursor: 'pointer' }}>
                        <IonCardTitle>{word.toLocaleUpperCase()}</IonCardTitle>
                        <audio ref={audioRef} />
                    </IonCardHeader>
                    <IonCardContent>
                        {wordData ? (
                            <h2 className='transcription'>
                                {sanitizedData.map(({ _id, ipa }: Word) => (
                                    <div key={_id} className='transcription-wrap'>
                                        <Phrase phrase={ipa} />
                                    </div>
                                ))}
                                {attemptTranscription ? (
                                    <div key='attempt' className='transcription-wrap'>
                                        <Phrase phrase={attemptTranscription} results={attemptResults} />
                                    </div>
                                ) : (
                                    hasRecorded && <IonSpinner />
                                )}
                            </h2>
                        ) : (
                            <IonSpinner />
                        )}
                    </IonCardContent>
                </IonCard>
                <IonToolbar id='bottom-bar'>
                    <div id='bottom-bar-inner-wrap'>
                        <IonCard className='statusBar'>
                            {recording && recorder?.mediaRecorder ? (
                                <LiveAudioVisualizer mediaRecorder={recorder.mediaRecorder} width={200} height={75} />
                            ) : (
                                'Ready to record'
                            )}
                        </IonCard>
                        <IonButton
                            id='record-button'
                            shape='round'
                            size='large'
                            onClick={recordButtonPressed}
                            disabled={!canRecord}
                        >
                            <IonIcon icon={recording ? stopOutline : mic}></IonIcon>
                        </IonButton>
                    </div>
                </IonToolbar>
            </IonContent>
        </IonPage>
    )
}

export default WordPractice
