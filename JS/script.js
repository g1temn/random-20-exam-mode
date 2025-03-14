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

const rightSFX = new Audio, wrongSFX = new Audio, selectionSFX = new Audio //SFX
wrongSFX.src = '../SFX/wrong.wav', rightSFX.src = '../SFX/correct.wav', selectionSFX.src = '../SFX/selection.wav'
rightSFX.volume = 0.3, wrongSFX.volume = 0.3, selectionSFX.volume = 0.08

//generate random number
let randomNumber = Math.floor(Math.random() * answers.length)

//pick random word based on the index calculated above
let pickedWord = answers[randomNumber].word

//handle each cell
function handleCell(cells) {
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            if(isSoundAllowed) {
                selectionSFX.currentTime = 0
                selectionSFX.play() //play short SFX
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
            rightSFX.currentTime = 0
            rightSFX.play()
        }
        showMessage(rigthMessage)
    } else {
        wrongAnswersCounter++
        document.querySelector('#wrong-counter').innerHTML = wrongAnswersCounter
        if(isSoundAllowed) {
            wrongSFX.currentTime = 0
            wrongSFX.play()
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
    soundBtn.classList.toggle('not-allowed')
    isSoundAllowed = !isSoundAllowed
})