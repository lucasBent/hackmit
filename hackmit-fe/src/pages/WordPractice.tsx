import { IonContent, IonFab, IonFabButton, IonHeader, IonPage, IonSpinner, IonTitle, IonToolbar } from '@ionic/react'
import './WordPractice.css'
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react'
import { IonButton, IonIcon } from '@ionic/react'
import { add, mic, play, stopOutline } from 'ionicons/icons'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api.js'
import { Word } from '../type/Word.js'
import { VoiceRecorder } from 'capacitor-voice-recorder'
import backend from '../util/Backend.js'
import Phrase from '../components/Phrase.js'

interface WordPracticeParams {
    word: string
}

const WordPractice: React.FC = () => {
    const { word } = useParams<WordPracticeParams>()
    const wordData = useQuery(api.tasks.getWord, { word: word })

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
        transcription = transcription.replaceAll(' ', '').replaceAll('ˈ', '').replaceAll('ː', '').replaceAll('ˌ', '')
        return transcription
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

    async function recordButtonPressed() {
        if (!recording) {
            setRecording(true)
            const tryRecording = await VoiceRecorder.startRecording()
        } else {
            setHasRecorded(true)
            setRecording(false)
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
            if (c1 === c2 || theyAre('ɝ', 'ɚ') || theyAre('ɹ', 'r') || theyAre('ɪ', 'ə')) return true
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
                <IonToolbar>
                    <IonTitle>Word Practice</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse='condense'>
                    <IonToolbar>
                        <IonTitle size='large'>Word Practice</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>{word.toLocaleUpperCase()}</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            {wordData ? (
                                <h2 className='transcription'>
                                    {sanitizedData.map(({ _id, ipa }: Word) => (
                                        <div key={_id}>
                                            {' '}
                                            <Phrase phrase={ipa} />
                                        </div>
                                    ))}
                                    {attemptTranscription ? (
                                        <div key='attempt'>
                                            {/* {attemptTranscription} */}
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
                    <IonFab slot='fixed' vertical='bottom' horizontal='end'>
                        <IonFabButton onClick={recordButtonPressed} disabled={!canRecord}>
                            <IonIcon icon={recording ? stopOutline : mic}></IonIcon>
                        </IonFabButton>
                    </IonFab>
                </IonContent>
            </IonContent>
        </IonPage>
    )
}

export default WordPractice