import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardContent } from '@ionic/react';
import './Home.css';
import './Temp.css';
import logo from '../assets/nobg.png';

const Temp: React.FC = () => {
  const [state, setState] = useState(0); 

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div style={{ textAlign: 'center' }}>
            <img
              src={logo}
              alt="Phonify Logo"
              style={{ maxWidth: '70px', height: 'auto' }}
            />
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        
        <IonTitle className = "title" style={{ textAlign: 'center', fontSize: '20px', marginTop: '10px', marginBottom: '5px' }}>
            {/*make this better*/}
          {"Tap a card to hear!"}
        </IonTitle>
        <IonTitle style={{ textAlign: 'center', fontSize: '16px', marginBottom: '30px' }}>
          {"Or, record your voice for feedback:"}
        </IonTitle>

        <div className = "back-box">
          {state === 0 && (
            //PLEASE MAKE THIS LARGERRRRRR
            <div style={{ width: '300px' }}>
              <IonCard>
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
              <IonCard>
                <IonCardHeader>
                  <IonTitle>Card 1</IonTitle>
                </IonCardHeader>
                <IonCardContent>
                  something card 1
                </IonCardContent>
              </IonCard>

              <IonCard>
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
      </IonContent>
    </IonPage>
  );
};

export default Temp;
