import { IonToolbar, IonButtons, IonBackButton, IonImg } from '@ionic/react'
import logo from '../assets/nobg.png'

interface ToolbarProps {
    backButton?: boolean
}

const Toolbar: React.FC<ToolbarProps> = ({ backButton = true }) => {
    return (
        <IonToolbar className='toolbar'>
            <div id='top-title-wrap'>
                <IonButtons slot='start'>{backButton && <IonBackButton />}</IonButtons>
                {/* <IonImg id='toolbar-logo' src={logo} alt='Phonify Logo' style={{ maxWidth: '70px', height: 'auto' }} /> */}
            </div>
        </IonToolbar>
    )
}

export default Toolbar
