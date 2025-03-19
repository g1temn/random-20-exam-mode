import {answers} from './answers.js'

const cellContainer = document.querySelector('#cell-container')
export const button = document.querySelector('#button')
const description = document.querySelector('#description')

const rigthMessage = document.querySelector('#rigth-message')
const wrongMessage = document.querySelector('#wrong-message')

const soundBtn = document.querySelector('.sound-btn')

export let isSoundAllowed = false

let delayTime = 200

export let generalCounter = 1, rigthAnswersCounter = 0, wrongAnswersCounter = 0

//generate random number
let randomNumber = Math.floor(Math.random() * answers.length)

//pick random word based on the index calculated above
let pickedWord = answers[randomNumber].word

export function playSound(name, volume) {
    const sound = document.querySelector(`#${name}`)
    sound.currentTime = 0
    sound.volume = volume
    sound.play()
}

//handle each cell
function handleCell(cells) {
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            if(isSoundAllowed) {
                playSound('selection', 0.08)
            }
            cell.classList.toggle('selected')
            const anySelected = Array.from(cells).some(c => c.classList.contains('selected'))
            button.disabled = !anySelected
            if(button.disabled) {
                button.innerHTML = 'Поставте наголос'
            } else {
                button.innerHTML = 'Перевірити'
            }
        })
    })
}

//display word and description properly
function displayWord() {
    button.disabled = true
    button.innerHTML = 'Поставте наголос'
    cellContainer.innerHTML = ''
    description.innerHTML = answers[randomNumber].description
    for(let i = 0; i < pickedWord.length; i++) {
        setTimeout(() => {
            if(isSoundAllowed) {
                playSound('slide', 0.03)
            }
            let char = document.createElement('div')
            char.classList = 'cell'
            char.innerHTML = pickedWord[i].toLowerCase()
            cellContainer.appendChild(char)

            if (i === pickedWord.length - 1) {
                handleCell(document.querySelectorAll('.cell'))
            }
        }, delayTime * i)
    }
}

displayWord()

function showMessage(messageContainer) {
    messageContainer.style.display = 'flex'
    messageContainer.addEventListener('animationend', () => {
        messageContainer.style.display = 'none'
    })
}

function checkAnswer() {
    //find indexes of right answers
    let rightAnswerIndexes = []
    for(let i = 0; i < pickedWord.length; i++) {
        if(pickedWord[i] == pickedWord[i].toUpperCase() &&
           pickedWord[i] !== '-' && pickedWord[i] !== '’') {
            rightAnswerIndexes.push(i)
        }
    }

    //find indexes of guesses
    const cells = document.querySelectorAll('.cell')
    let guessesIndexes = []
    for(let x = 0; x < Array.from(cells).length; x++) {
        if(Array.from(cells)[x].classList.contains('selected')) {
            guessesIndexes.push(x)
        }
    }

    //compare answer and quess and show changes on the screen
    if(rightAnswerIndexes.sort().toString() === guessesIndexes.sort().toString()) {
        rigthAnswersCounter++
        document.querySelector('#right-counter').innerHTML = rigthAnswersCounter 
        if(isSoundAllowed) {
            playSound('correct', 0.3)
        }
        showMessage(rigthMessage)
    } else {
        wrongAnswersCounter++
        document.querySelector('#wrong-counter').innerHTML = wrongAnswersCounter
        if(isSoundAllowed) {
            playSound('wrong', 0.3)
        }
        showMessage(wrongMessage)
    }

    generalCounter++ //increment general counter and show changes on the screen
    document.querySelector('#general-counter').innerHTML = `Номер слова: ${generalCounter}`
}

button.addEventListener('click', () => {
    checkAnswer()

    let newRandomNumber //create new random index for the next word
    do {
        newRandomNumber = Math.floor(Math.random() * answers.length)
    } while (newRandomNumber === randomNumber)

    randomNumber = newRandomNumber
    pickedWord = answers[randomNumber].word

    displayWord()
})

soundBtn.addEventListener('click', () => {
    playSound('selection', 0.08)
    soundBtn.classList.toggle('not-allowed')
    isSoundAllowed = !isSoundAllowed
})