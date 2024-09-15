import React, { useState } from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonButton, IonGrid, IonRow, IonCol } from '@ionic/react'
import './Grid.css'
import './Home.css'
import Toolbar from '../components/Toolbar.js'

const syllables = [
    //make these the actual IPA symbols

    '/i:/',
    '/ɪ/',
    '/e/',
    '/æ/',
    '/ɑ:/',
    '/ɔ:/',
    '/ʊ/',
    '/u:/',
    '/p/',
    '/b/',
    '/t/',
    '/d/',
    '/k/',
    '/g/',
    '/f/',
    '/v/',
    '/θ/',
    '/ð/',
    '/s/',
    '/z/',
]

const Grid: React.FC = () => {
    const [state, setState] = useState(0)

    return (
        <IonPage>
            <IonHeader>
                <Toolbar />
            </IonHeader>

            <IonContent fullscreen className='ion-padding'>
                <IonTitle className='title'>{'IPA Alphabet'}</IonTitle>
                <IonTitle className='small-title'>{'Tap an IPA syllable to learn it:'}</IonTitle>

                <IonGrid>
                    <IonRow>
                        {syllables.map((syllable, index) => (
                            <IonCol size='4' key={index}>
                                <IonButton
                                    className='syllable-button'
                                    expand='full'
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
    )
}

export default Grid
