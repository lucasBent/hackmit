import { IonContent, IonHeader, IonPage, IonToolbar, IonButton, IonTitle, IonSearchbar } from '@ionic/react';
import React, { useRef, useEffect, useState } from 'react';
import './Words.css';
import '../theme/variables.css';
import logo from '../assets/nobg.png';

const Words: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  
  const words = [
    "Hacking",
    "Coding",
    "Learn",
    "Massachusetts",
    "Institute",
    "Technology",
    "Hackathon",
    "Phonify",
    "Pronunciation",
    "Software",
    "Engineering",
    "Computer",
  ];

  const colorClasses = [
    "var(--ion-color-color1)", 
    "var(--ion-color-color4)", 
    "var(--ion-color-color8)", 
    "var(--ion-color-color9)", 
  ];

  const wordOfTheDay = "Technology";

  const filteredWords = words.filter(word => word.toLowerCase().includes(searchText.toLowerCase()));

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = () => {
      const cards = container?.getElementsByClassName('word-card');
      if (cards) {
        const containerHeight = container!.offsetHeight;
        const middle = containerHeight * 2 / 3;

        for (let i = 0; i < cards.length; i++) {
          const card = cards[i] as HTMLElement;
          const rect = card.getBoundingClientRect();
          const distanceToMiddle = Math.abs(rect.top + rect.height / 2 - middle);

          const scale = Math.max(0.85, 1 - distanceToMiddle / middle); 
          const zIndex = 10 - distanceToMiddle / middle; 

          card.style.transform = `scale(${scale})`; 
          card.style.zIndex = `${Math.round(zIndex)}`; 
        }
      }
    };

    container?.addEventListener('scroll', handleScroll);

    return () => {
      container?.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
      <IonContent fullscreen className="ion-padding" scrollY={false}>
        <IonTitle style={{ textAlign: 'center', fontSize: '20px', marginTop: '10px', marginBottom: '5px' }}>
          {"Choose a word to learn!"}
        </IonTitle>
        <IonTitle style={{ textAlign: 'center', fontSize: '16px', marginBottom: '10px' }}>
          {"Or, search a word below:"}
        </IonTitle>

      
        <IonSearchbar
          value={searchText}
          onIonInput={(e: any) => setSearchText(e.target.value)} 
          debounce={300} 
        />

        <div className="word-of-the-day-card">
          <IonButton className="word-of-the-day word-button " expand="block">
            {"Word of the Day: " + wordOfTheDay}
          </IonButton>
        </div>

        <div className="scrollable-vertical" ref={containerRef}>
          {filteredWords.map((word, index) => (
            <div key={index} className="word-card">
              <IonButton
                className="word-button"
                expand="block"
                style={{ '--background': colorClasses[index % colorClasses.length] }}
              >
                {word}
              </IonButton>
            </div>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Words;



