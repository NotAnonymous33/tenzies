import {useEffect, useState} from 'react'
import Dice from './Dice.jsx'
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'


function App() {

    const [dice, setDice] = useState(newDice())
    const diceComponents = dice.map(die => <Dice id={die.id} dieClick={() => dieClick(die.id)} key={die.id}
                                                 value={die.value} held={die.isHeld}/>)
    const [tenzies, setTenzies] = useState(false)
    const [buttonText, setButtonText] = useState("Roll")
    const [bestScore, setBestScore] = useState(Infinity)
    const [score, setScore] = useState(0)

    useEffect(() => {
        const storedBestScore = JSON.parse(localStorage.getItem("bestScore"))
        if (storedBestScore) {
            setBestScore(storedBestScore)
        }
    }, []);

    useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const allEqual = dice.every(die => die.value === dice[0].value)

        if (allHeld && allEqual) {
            console.log("You have won")
            setTenzies(true)
            if (score < bestScore) {
                console.log("best score has changed")
                setBestScore(score)
            }
        }

    }, [dice])

    useEffect(() => {
        localStorage.setItem("bestScore", JSON.stringify(bestScore))
    }, [bestScore])

    useEffect(() => {
        if (tenzies) {
            setButtonText("New Game")
        } else {
            setButtonText("Roll")
        }
    }, [tenzies])

    function newDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push({
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid()
            })
        }
        return newDice
    }

    function dieClick(id) {
        setDice(prevDice => prevDice.map(dice => dice.id === id ? ({...dice, isHeld: !dice.isHeld}) : dice))
    }


    function rollDice() {
        if (tenzies) {
            setDice(newDice())
            setTenzies(false)

            console.log(score + " " + bestScore)

            setScore(0)

        } else {
            setDice(prevDice => prevDice.map(dice => dice.isHeld ? dice : ({
                    value: Math.ceil(Math.random() * 6),
                    isHeld: false,
                    id: nanoid()
                })
            ))
            setScore(prevScore => prevScore + 1)
        }
    }

    return (
        <main>
            {tenzies && <Confetti width={window.innerWidth * 0.98} height={window.innerHeight}/>}
            <h1 className="title">Tenzies</h1>
            <div className="scores">
                <h2 className="score">Score: {score}</h2>
                <h2 className="bestScore">Best Score: {bestScore !== Infinity ? bestScore : ""}</h2>
            </div>
            <h3 className="instructions">Roll until all dice are the same. Click each die to freeze it at its current
                value between rolls.</h3>
            <div className="dice-container">
                {diceComponents}
            </div>
            <button className="roll-button" onClick={rollDice}>{buttonText}</button>


        </main>
    )
}

export default App
