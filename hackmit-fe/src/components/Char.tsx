import { useRef, useState } from 'react'
import './Char.css'
import { api } from '../../convex/_generated/api.js'
import { useConvex } from 'convex/react'

interface CharProps {
    char: string
    result?: string
}

const Char: React.FC<CharProps> = ({ char, result }) => {
    const [isLoading, setIsLoading] = useState(false)
    const audioRef = useRef<HTMLAudioElement>(null)
    const convex = useConvex() // Convex client for manual query calls

    let classNames = 'char '
    if (result) classNames += result

    // Function to download, play and then delete the audio file using Blob URL
    const playAudio = async (syllable: string) => {
        setIsLoading(true)
        console.log('hey')
        try {
            // Fetch the audio URL from your getAudio endpoint
            const result = await convex.query(api.audio.getAudio, { ipaChar: syllable })

            if (result?.url) {
                // Fetch the audio file as a blob
                const response = await fetch(result.url)
                const blob = await response.blob()

                // Create a local Blob URL
                const blobUrl = URL.createObjectURL(blob)

                // Set the Blob URL as the audio source and play
                if (audioRef.current) {
                    audioRef.current.src = blobUrl
                    audioRef.current.play()

                    // Once playback ends, revoke the Blob URL to free up memory
                    audioRef.current.onended = () => {
                        URL.revokeObjectURL(blobUrl)
                    }
                }
            } else {
                console.error('No valid audio URL found.')
            }
        } catch (error) {
            console.error('Error fetching audio URL:', error)
        }
        setIsLoading(false)
    }

    return (
        <>
            <div className={classNames} onClick={() => playAudio(char)}>
                {char}
            </div>
            <audio ref={audioRef}>
                <source src='' type='audio/wav' />
                Your browser does not support the audio element.
            </audio>
        </>
    )
}

export default Char
