import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonGrid, IonRow, IonCol } from '@ionic/react';
import './Grid.css';
import './Home.css';
import logo from '../assets/nobg.png';

const syllables = [
  //make these the actual IPA symbols
  "/ˈsɪl.ə.bəl/", "/ˈɪ.pə/", "/ˈðæt/", "/ˈwɒt/", 
  "/ˈsɪl.ə.bəl/", "/ˈɪ.pə/", "/ˈðæt/", "/ˈwɒt/", 
  "/ˈtæb/", "/ˈkæd/", "/ˈtʃɪk/", "/ˈʃɪp/", 
  "/ˈæp/", "/ˈɪk/", "/ˈlæb/", "/ˈpæp/",
  "/ˈsɪl.ə.bəl/", "/ˈɪ.pə/", "/ˈðæt/", "/ˈwɒt/", 
  "/ˈsɪl.ə.bəl/", "/ˈɪ.pə/", "/ˈðæt/", "/ˈwɒt/", 
  "/ˈtæb/", "/ˈkæd/", "/ˈtʃɪk/", "/ˈʃɪp/", 
  "/ˈæp/", "/ˈɪk/", "/ˈlæb/", "/ˈpæp/"
];

const Grid: React.FC = () => {
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
        <IonTitle style={{ textAlign: 'center', fontSize: '20px', marginTop: '10px', marginBottom: '5px' }}>
          {"IPA Alphabet"}
        </IonTitle>
        <IonTitle style={{ textAlign: 'center', fontSize: '16px', marginBottom: '30px' }}>
          {"Tap an IPA syllable to learn it:"}
        </IonTitle>

        <IonGrid >
          <IonRow>
            {syllables.map((syllable, index) => (
              <IonCol size="4" key={index}>
                <IonButton
                  className="syllable-button"
                  expand="full"
                  onClick={() => setState(index)} 
                  routerLink='/temp' 
                >
                  {syllable}
                </IonButton>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Grid;
