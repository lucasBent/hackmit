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

interface WordPracticeParams {
    word: string
}

const WordPractice: React.FC = () => {
    const { word } = useParams<WordPracticeParams>()
    const wordData = useQuery(api.tasks.getWord, { word: word })

    function sanitizeData(wordData: Word[]) {
        return uniquifyTranscriptions(wordData).map((entry) => {
            entry.ipa = entry.ipa.replaceAll(' ', '')
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
    let sanitizedData: Word[] = []
    if (wordData) sanitizedData = sanitizeData(wordData)

    var correctWord = true
    const [wordIsUsed, toggleWordIsUsed] = useState(false)
    const [canRecord, setCanRecord] = useState(false)
    const [recording, setRecording] = useState(false)

    async function recordButtonPressed() {
        if (!recording) {
            setRecording(true)
            const tryRecording = await VoiceRecorder.startRecording()
        } else {
            setRecording(false)
            const getRecording = await VoiceRecorder.stopRecording()
            console.log(getRecording.value.mimeType)
            const response = await backend.doPost('transcribe', {
                recording: getRecording.value.recordDataBase64,
            })
            console.log(response)
        }
    }

    useEffect(() => {
        checkIfCanRecord()
    }, [])

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
                                        <div key={_id}>/{ipa}/</div>
                                    ))}
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
