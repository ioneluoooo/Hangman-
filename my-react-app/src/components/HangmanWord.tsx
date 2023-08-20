interface HangmanWordProps {
    guessedLetters: string[]
    wordToGuess: string
    reveal?: boolean
}


export function HangmanWord({ guessedLetters, wordToGuess, reveal = false }: HangmanWordProps) {

    return (<div style={{
        display: 'flex', gap: '.25em',
        fontSize: '6rem',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontFamily: 'monospace'
    }}>

        {wordToGuess.split('').map((letter, index) => ( // There we split the string into elements and give every element a border down him

            <span style={{ borderBottom: '.1em solid black' }} key={index}>

                <span style={{ visibility: guessedLetters.includes(letter) || reveal ? 'visible' : 'hidden', color: !guessedLetters.includes(letter) && reveal ? 'red' : 'black' }}>{letter}</span>

            </span> // checks if the guessedletter includes the guessed letter then show it or by default make it hidden(like cases)


        ))}

    </div>
    )
}
