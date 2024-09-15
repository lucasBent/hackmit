import { IonContent, IonHeader, IonPage, IonTitle, IonButton } from '@ionic/react';
import '../theme/variables.css';
import './Home.css';
import Toolbar from '../components/Toolbar.js';

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
      <IonHeader>
        <Toolbar backButton={false}/>
      </IonHeader >
      <IonContent fullscreen className="ion-padding">
        <IonTitle className = "title">{getGreeting()}</IonTitle>
        <IonTitle className = "small-title">{getRandomMessage()}</IonTitle>
        <div className="button-container">
          <IonButton expand="block" className="small-button" style = {{height: '125px', marginBottom: '20px'}} routerLink='/words'>Learn</IonButton>
          <IonButton expand="block" className="small-button" style = {{height: '250px', marginBottom: '20px'}}>Word of the Day</IonButton>
          <IonButton expand="block" className="small-button" style = {{height: '125px', marginBottom: '20px'}}routerLink='/grid' >Pronounce</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;


