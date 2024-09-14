import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './WordPractice.css';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import { IonButton, IonIcon } from '@ionic/react';
import {mic, play} from 'ionicons/icons'
import { useState } from 'react';


const WordPractice: React.FC = () => {
  var correctWord = true;
  const [wordIsUsed, toggleWordIsUsed] = useState(false)

  const recordButtonPressed = () => {
    toggleWordIsUsed(!wordIsUsed);
    if (correctWord){
      console.log('play button clicked');
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Word Practice</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Word Practice</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
            <IonCard>
                <IonCardHeader>
                    <IonCardTitle>WORD</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  {wordIsUsed && (
                    <h2>/wɝd/</h2>
                  )}
                </IonCardContent>
            </IonCard>
            <IonButton onClick={recordButtonPressed} color="primary" shape="round">
              <IonIcon icon={mic} slot='start'>
                Play
              </IonIcon>
            </IonButton>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default WordPractice;
