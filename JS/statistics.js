import { generalCounter, rigthAnswersCounter, wrongAnswersCounter, button, isSoundAllowed } from "./script.js"
import { currentTime } from "./stopwatch.js"

const rigthRect = document.querySelector('#right-rect') //rectangles for
const wrongRect = document.querySelector('#wrong-rect') //graph

const congratulation = document.querySelector('.congratulation')

function showStat() {
    if(isSoundAllowed) {
        const appearingSFX = new Audio //play appropriate sound
        appearingSFX.src = '../SFX/appearing.wav'
        appearingSFX.currentTime = 0
        appearingSFX.volume = 0.8
        appearingSFX.play()
    }
    const statisticsContainer = document.querySelector('.statistics-container')
    statisticsContainer.style.display = 'flex' //show statistics container

    //show how how many right and wrong answers user did
    document.querySelector('#right-number').innerHTML = `Правильно: ${rigthAnswersCounter}`
    document.querySelector('#wrong-number').innerHTML = `Неравильно: ${wrongAnswersCounter}`

    //calculate width of rectangles in percents
    const rigthRectPercent = Math.round((rigthAnswersCounter / (generalCounter - 1)) * 100)
    const wrongRectPercent = 100 -  rigthRectPercent

    //set width of each rect
    rigthRect.style.width = `${rigthRectPercent}%`
    if(rigthRectPercent == 100) {
        rigthRect.style.borderRadius = '0.6rem 0.6rem 0.6rem 0.6rem'
    }
    wrongRect.style.width = `${wrongRectPercent}%`
    if(wrongRectPercent == 100) {
        wrongRect.style.borderRadius = '0.6rem 0.6rem 0.6rem 0.6rem'
    }

    rigthRect.innerHTML = `${rigthRectPercent}%` //inner percentage of right answers

    if(rigthRectPercent >= 0 && rigthRectPercent <= 35) { //show expression depending on result
        congratulation.innerHTML = 'Бро, тєбє нада трєніраватса'
    } else if(rigthRectPercent > 35 && rigthRectPercent <= 70) {
        congratulation.innerHTML = 'Вітаю! Гарний результат!'
    } else {
        congratulation.innerHTML = 'ЛЄВ! ТИГР!'
    }

    document.querySelector('.spended-time').innerHTML = `Витрачено часу: ${currentTime}` //show spended time 
}

button.addEventListener('click', () => {
    if(generalCounter > 20) {
        showStat()
    }
})

document.querySelector('#again-btn').addEventListener('click', () => {location.reload()}) //handle stat buttons
document.querySelector('#quit-btn').addEventListener('click', () => {open('https://g1temn.github.io/stresses/', '_self')})