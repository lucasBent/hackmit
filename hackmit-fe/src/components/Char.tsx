import './Char.css'

interface CharProps {
    char: string
    result?: string
}

const Char: React.FC<CharProps> = ({ char, result }) => {
    let classNames = 'char '
    if (result) classNames += result

    function handleChar() {
        alert(char)
    }

    return (
        <div className={classNames} onClick={handleChar}>
            {char}
        </div>
    )
}

export default Char
