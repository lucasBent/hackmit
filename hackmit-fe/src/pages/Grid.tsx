import React, { useState } from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonButton, IonGrid, IonRow, IonCol } from '@ionic/react'
import './Grid.css'
import './Home.css'
import Toolbar from '../components/Toolbar'
import syllables from './full_vocab_ipa'

const Grid: React.FC = () => {
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
                        {syllables.map((syllable, index) => (
                            <IonCol size='3' key={index}>
                                <IonButton className='syllable-button' expand='full' routerLink='/word-practice/sorry'>
                                    {syllable}
                                </IonButton>
                            </IonCol>
                        ))}
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default Grid
