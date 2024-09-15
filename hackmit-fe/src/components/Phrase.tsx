import Char from './Char.js'
import './Phrase.css'

interface PhraseProps {
    phrase: string
    results?: string[]
}

const Phrase: React.FC<PhraseProps> = ({ phrase, results }) => {
    return (
        <>
            <span className='phrase-slash'>/</span>
            {[...phrase].map((char, i) => {
                return <Char key={i} char={char} result={results?.[i]} />
            })}
            <span className='phrase-slash'>/</span>
        </>
    )
}

export default Phrase
