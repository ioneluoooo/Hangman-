import styles from './Keyboard.module.css'

interface KeyboardProps {
    activeLetters: string[];
    disabled?: boolean;

    inactiveLetters: string[];
    addGuessedLetter: (letter: string) => void
}


const KEYS = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
]


export function Keyboard({ activeLetters, inactiveLetters, addGuessedLetter, disabled = false }: KeyboardProps) {
    return <div style={{ display: 'grid', gridTemplateColumns: "repeat(auto-fit,minmax(75px,1fr))", gap: '.5rem' }}>



        {KEYS.map(key => {
            const isActive = activeLetters.includes(key)
            const isInactive = inactiveLetters.includes(key)
            return <button onClick={() => addGuessedLetter(key)} className={`${styles.btn} ${isActive ? styles.active : ""} 
            ${isInactive ? styles.inactive : 's'} `}
                disabled={isInactive || isActive || disabled} // to disable the letters that i used before



                key={key}>{key}</button>

        })}


    </div>


}