import { IonContent, IonHeader, IonPage, IonTitle, IonButton, IonLabel, IonCard } from '@ionic/react'
import '../theme/variables.css'
import './Home.css'
import Toolbar from '../components/Toolbar.js'

const Home: React.FC = () => {
    const getGreeting = () => {
        const hour = new Date().getHours()
        if (hour < 12) {
            return 'Good morning!'
        } else {
            return 'Good afternoon!'
        }
    }

    const getRandomMessage = (): string => {
        const messages = [
            "Let's learn something new today.",
            "Let's polish up our pronunciation.",
            'Get ready to learn.',
            'Enjoy exploring I:PAL!',
        ]
        const randomIndex = Math.floor(Math.random() * messages.length)
        return messages[randomIndex]
    }

    return (
        <IonPage className='home'>
            <IonHeader>
                <Toolbar backButton={false} />
            </IonHeader>
            <IonContent fullscreen className='ion-padding'>
                <div className='pal-contact-section'>
                    <img src='src/assets/bunny-ipal.png' style={{ width: 'auto', height: '4rem' }} />
                    <div className='homepage-text-wrap'>
                        <IonTitle className='homepage-title'>{getGreeting()}</IonTitle>
                        <div className='homepage-subtitle'>{getRandomMessage()}</div>
                    </div>
                </div>

                <div className='button-container'>
                    <div className='home-button'>
                        <IonCard className='small-button' routerLink='/word-practice/technology'>
                            <IonTitle>Word of the day</IonTitle>
                            <div className='home-card-desc'>Technology</div>
                        </IonCard>
                    </div>
                    <div className='home-button'>
                        <IonCard className='small-button' routerLink='/words'>
                            <IonTitle>Practice any word</IonTitle>
                            <div className='home-card-desc'>Dictionary</div>
                        </IonCard>
                    </div>
                    <div className='home-button'>
                        <IonCard className='small-button' routerLink='/grid'>
                            <IonTitle>What is this character?</IonTitle>
                            <div className='home-card-desc'>IPA Reference</div>
                        </IonCard>
                    </div>
                    <div className='home-button'>
                        <IonCard className='small-button' routerLink='/grid'>
                            <IonTitle>Generate practice sentences!</IonTitle>
                            <div className='home-card-desc'>AI Playground</div>
                        </IonCard>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Home
