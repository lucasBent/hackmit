import { IonButtons, IonBackButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonFooter } from '@ionic/react';
import { IonButton, IonIcon } from '@ionic/react';
import {mic, play, refreshCircleOutline, micOutline, stopCircleOutline} from 'ionicons/icons'
import React, { useState } from 'react';
import './Temp.css';
import { LiveAudioVisualizer } from 'react-audio-visualize';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import logo from '../assets/nobg.png';


const Temp: React.FC = () => {
  const [state, setState] = useState(0); 
  const [blob, setBlob] = useState<Blob>();
  const recorder = useAudioRecorder();

  var correctWord = true;
  const [wordIsUsed, toggleWordIsUsed] = useState(false);
  const [session, setSession] = useState("ready");
  const sessionStatus = () => {
    setSession((prevValue) => {
      if (prevValue === "ready") {
        recorder.startRecording();
        return "stop";
      }
      if (prevValue === "stop") {
        recorder.stopRecording();
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
     <IonButtons slot="start">
          <IonBackButton text="<" icon="" defaultHref="/" />
        </IonButtons>
        <IonToolbar className = "toolbar">
        <img
        src={logo}
        alt="Phonify Logo"
        style={{ maxWidth: '70px', height: 'auto' }}
      />
     </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        
        <IonTitle className = "title">
            {/*make this better*/}
          {"Tap a card to hear!"}
        </IonTitle>
        <IonTitle className="small-title">
          {"Or, record your voice for feedback:"}
        </IonTitle>

        <div className = "back-box">
          {state === 0 && (
            //PLEASE MAKE THIS LARGERRRRRR
            <div style={{ width: '300px' }}>
              <IonCard className = "ion-card">
                <IonCardHeader>
                  <IonTitle>Card 1</IonTitle>
                </IonCardHeader>
                <IonCardContent>
                  something card 1
                </IonCardContent>
              </IonCard>
            </div>
          )}

          {state === 1 && (
            //PLEASE MAKE THIS LARGERRRRRR

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '600px' }}>
              <IonCard className = "ion-card">
                <IonCardHeader>
                  <IonTitle>Card 1</IonTitle>
                </IonCardHeader>
                <IonCardContent>
                  something card 1
                </IonCardContent>
              </IonCard>

              <IonCard className = "ion-card">
                <IonCardHeader>
                  <IonTitle>Card 2</IonTitle>
                </IonCardHeader>
                <IonCardContent>
                  something card 2
                </IonCardContent>
              </IonCard>
            </div>
          )}
        </div>



        <IonToolbar>
          <IonCard className='statusBar'>
          {session === "ready" && (
    <IonTitle>Ready</IonTitle>
  )}
  {session === "stop" && recorder.mediaRecorder && (
    <LiveAudioVisualizer
      mediaRecorder={recorder.mediaRecorder}
      width={200}
      height={75}
    />
  )}
  {session === "restart" && (
    <IonTitle>Done</IonTitle>
  )}
          </IonCard>
          <IonButton slot="end" className="action-button" onClick={sessionStatus} shape="round">
            <IonIcon icon={getIconForSession()}>
              Play
            </IonIcon>
          </IonButton>
        </IonToolbar>
      </IonContent>
    </IonPage>
  );
};

export default Temp;