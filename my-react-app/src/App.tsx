import { useState, useEffect, useCallback } from "react";
import words from './word-list.json'
import { HangmanDrawing } from "./components/HangmanDrawing";
import { Keyboard } from "./components/Keyboard";
import { HangmanWord } from "./components/HangmanWord";


function App() {

  function getWord() {
    return words[Math.floor(Math.random() * words.length)] //multiply 0 or 1 from random to my words length,then floor a random number that in the end will give us a word
  }
  const [wordToGuess, setWordToGuess] = useState(getWord)


  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  const incorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter)) //filters the incorrect letters that are not in the wordToGuess

  const addGuessedLetter = useCallback((letter: string) => {

    if (guessedLetters.includes(letter) || isLoser || isWinner) return
    setGuessedLetters(currentLetters => [...currentLetters, letter])
  }, [guessedLetters]) // helps us to rerender only when guessed letters are changed


  const isLoser = incorrectLetters.length >= 6
  const isWinner = wordToGuess.split('').every(letter => guessedLetters.includes(letter)) // split into elements and check if every letter is in the guessedLetters const 



  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key

      if (!key.match(/^[a-z]$/)) return //checks if we pressed a letter,if we did ...continue, if didnt then just ignore everything 

      e.preventDefault();
      addGuessedLetter(key)
    }

    document.addEventListener('keypress', handler) // take our document,add event listener and on the keypress we call the handle function
    return () => {
      document.removeEventListener('keypress', handler) //we make sure we remove whenever our use event is done working
    }
  }, [guessedLetters])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key

      if (key !== 'Enter') return // when we click enter it will refresh automatically


      e.preventDefault();
      setGuessedLetters([])
      setWordToGuess(getWord())

     

    }

    document.addEventListener('keypress', handler) // take our document,add event listener and on the keypress we call the handle function
    return () => {
      document.removeEventListener('keypress', handler) //we make sure we remove whenever our use event is done working
    }
  })







  return (
    <div style={{
      maxWidth: '800px',
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
      margin: '0 auto',
      alignItems: 'center'
    }}>

      <div style={{
        fontSize: '2rem', textAlign: 'center'
      }}>
        {isWinner && 'Winner!Refresh nigga to try again'}
        {isLoser && 'Skill issue'}
      </div>
      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWord reveal={isLoser} guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
      <div style={{ alignSelf: 'stretch' }}>

        <Keyboard
          disabled={isWinner || isLoser}

          activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>





    </div>
  )
}

export default App;
