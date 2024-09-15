import React from 'react'
import './Char.css'

interface CharProps {
    char: string
    result?: string
    audioUrl: string 
}

const Char: React.FC<CharProps> = ({ char, result, audioUrl }) => {
    let classNames = 'char '
    if (result) classNames += result

    function handleCharClick() {
       const audio = new Audio(audioUrl)
        audio.play().catch(error => console.error('Error playing audio:', error))
    }

    return (
        <div className={classNames} onClick={handleCharClick}>
            {char}
        </div>
    )
}

export default Char
