import {useEffect, useState} from 'react'
import Dice from './Dice.jsx'
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'


function App() {

    const [dice, setDice] = useState(newDice())
    const diceComponents = dice.map(die => <Dice id={die.id}  dieClick={() => dieClick(die.id)} key={die.id} value={die.value} held={die.isHeld}/>)
    const [tenzies, setTenzies] = useState(false)
    const [buttonText, setButtonText] = useState("Roll")


    useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const allEqual = dice.every(die => die.value === dice[0].value)

        if (allHeld && allEqual) {
            console.log("You have won")
            setTenzies(true)
        }

    }, [dice])

    useEffect(() => {
        if (tenzies) {
            setButtonText("New Game")
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

    function dieClick(id){
        setDice(prevDice => prevDice.map(dice => dice.id === id ? ({...dice, isHeld: !dice.isHeld}) : dice))

    }


    function rollDice() {
        if (tenzies) {
            setDice(newDice())
            setTenzies(false)

        } else {
            setDice(prevDice => prevDice.map(dice => dice.isHeld ? dice : ({
                    value: Math.ceil(Math.random() * 6),
                    isHeld: false,
                    id: nanoid()
                })
            ))
        }
    }

    return (
        <main>
            {tenzies && <Confetti width={window.innerWidth} height={window.innerHeight}/>}
            <h1 className="title">Tenzies</h1>
            <h3 className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h3>
            <div className="dice-container">
                {diceComponents}
            </div>
            <button className="roll-button" onClick={rollDice}>{buttonText}</button>


        </main>
    )
}

export default App
