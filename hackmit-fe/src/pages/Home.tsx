import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonButtons } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import '../theme/variables.css';
import logo from '../assets/nobg.png';

const Home: React.FC = () => {

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return 'Good morning!';
    } else {
      return 'Good afternoon!';
    }
  };

  const getRandomMessage = (): string => {
    const messages = [
      "Let's learn something new today.",
      "Let's polish up our pronunciation.",
      "Get ready to learn.",
      "Enjoy exploring Phonify!"
    ];
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  };
  
  return (
    <IonPage>
      <IonHeader >
        <IonToolbar>
        <div style={{ textAlign: 'center' }}>
          <img
            src= {logo}
            alt = "Phonify Logo"
            style={{ maxWidth: '70px', height: 'auto'}} 
          />
        </div>
        </IonToolbar>
      </IonHeader >
      <IonContent fullscreen className="ion-padding">
        <IonTitle style = {{textAlign: 'center', fontSize: '20px', marginTop: '10px', marginBottom: '5px'}}>{getGreeting()}</IonTitle>
        <IonTitle style = {{textAlign: 'center', fontSize: '16px', marginBottom: '30px'}}>{getRandomMessage()}</IonTitle>
        <div className="button-container">
          <IonButton expand="block" className="small-button" style = {{height: '125px', marginBottom: '20px'}} routerLink='/words'>Learn</IonButton>
          <IonButton expand="block" className="small-button" style = {{height: '250px', marginBottom: '20px'}}>Word of the Day</IonButton>
          <IonButton expand="block" className="small-button" style = {{height: '125px', marginBottom: '20px'}}>Pronounce</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;