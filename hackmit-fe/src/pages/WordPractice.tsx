import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './WordPractice.css';
import { IonCard, IonFooter, IonButton, IonIcon } from '@ionic/react';
import { mic, refreshCircleOutline, stopCircleOutline } from 'ionicons/icons';
import React, { useState, useRef } from 'react';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';

const WordPractice: React.FC = () => {
  const [session, setSession] = useState("ready");
  const [isNoiseSuppressionEnabled, setNoiseSuppressionEnabled] = useState(true);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [dBLevel, setDBLevel] = useState(0);
  const recorder = useAudioRecorder();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const frameCountRef = useRef(0); // To debounce the updates

  // Function to initialize the audio stream and analyser for real-time dB measurement
  const startAudioStream = async () => {
    try {
      const userStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          noiseSuppression: isNoiseSuppressionEnabled,
        },
      });
      setStream(userStream);

      if (audioRef.current) {
        audioRef.current.srcObject = userStream;
      }

      // Create an audio context and analyser node to measure dB levels
      audioContextRef.current = new AudioContext();
      const analyser = audioContextRef.current.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const source = audioContextRef.current.createMediaStreamSource(userStream);
      source.connect(analyser);

      measureVolume();
    } catch (err) {
      console.error("Error accessing media devices.", err);
    }
  };

  // Function to measure audio volume and calculate decibel levels
  const measureVolume = () => {
    if (!analyserRef.current) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const getVolume = () => {
      analyserRef.current!.getByteFrequencyData(dataArray);

      // Calculate average dB level
      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        sum += dataArray[i];
      }
      const average = sum / bufferLength;
      const dB = Math.max(0, 20 * Math.log10(average / 255));

      frameCountRef.current++;

      // Only update state every 10 frames (debounce)
      if (frameCountRef.current % 10 === 0) {
        setDBLevel(dB); // Update dB level
      }

      console.log(`Current dB Level: ${dB.toFixed(2)} dB`); // Debug logging for troubleshooting

      requestAnimationFrame(getVolume); // Continuously measure volume
    };

    getVolume(); // Start the volume measurement loop
  };

  // Toggle noise suppression on button press
  const toggleNoiseSuppression = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      const constraints = audioTrack.getConstraints();
      audioTrack.applyConstraints({
        ...constraints,
        noiseSuppression: !isNoiseSuppressionEnabled,
      }).then(() => {
        setNoiseSuppressionEnabled(!isNoiseSuppressionEnabled);
      }).catch((error) => console.error('Error applying constraints:', error));
    }
  };

  const sessionStatus = () => {
    setSession((prevValue) => {
      if (prevValue === "ready") {
        recorder.startRecording();
        startAudioStream(); // Start capturing audio with WebRTC
        return "stop";
      }
      if (prevValue === "stop") {
        recorder.stopRecording();
        if (stream) {
          stream.getTracks().forEach(track => track.stop()); // Stop audio stream
        }
        return "restart";
      }
      return "ready";
    });
  };

  const getIconForSession = () => {
    if (session === "ready") {
      return mic;
    } else if (session === "stop") {
      return stopCircleOutline;
    } else if (session === "restart") {
      return refreshCircleOutline;
    }
    return mic;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Word Practice</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonFooter>
          <IonToolbar>
            <IonCard className='statusBar'>
              {session === "ready" && <IonTitle>Ready</IonTitle>}
              {session === "stop" && recorder.mediaRecorder && (
                <div>
                  <p>Current dB Level: {dBLevel.toFixed(2)} dB</p>
                </div>
              )}
              {session === "restart" && <IonTitle>Done</IonTitle>}
            </IonCard>

            <IonButton slot="end" className="action-button" onClick={sessionStatus} shape="round">
              <IonIcon icon={getIconForSession()} />
            </IonButton>

            {/* Toggle Noise Suppression */}
            <IonButton onClick={toggleNoiseSuppression} shape="round">
              {isNoiseSuppressionEnabled ? "Disable Noise Suppression" : "Enable Noise Suppression"}
            </IonButton>

            {/* Audio element to play the captured stream */}
            <audio ref={audioRef} autoPlay muted></audio>

          </IonToolbar>
        </IonFooter>
      </IonContent>
    </IonPage>
  );
};

export default WordPractice;