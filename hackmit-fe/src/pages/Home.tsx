import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import ExploreContainer from '../components/ExploreContainer'
import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import './Home.css'
import { Word } from '../type/Word'

const Home: React.FC = () => {
    const words = useQuery(api.tasks.getWord, { word: 'data' })
    console.log(words)

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Blank</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse='condense'>
                    <IonToolbar>
                        <IonTitle size='large'>Blank</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <ExploreContainer />
                {words?.map(({ _id, word, ipa }: Word) => (
                    <div key={_id}>
                        {word}: {ipa}
                    </div>
                ))}
            </IonContent>
        </IonPage>
    )
}

export default Home
