const spendedTime = document.querySelector('.spended-time')
let seconds = 0, minutes = 0, hours = 0
export let currentTime

function runClock() {
    seconds++
    if(seconds == 60) {
        minutes++
        seconds = 0
    }
    if(minutes == 60) {
        hours++
        minutes = 0
        seconds = 0
    }
    currentTime = `${hours.toString().padStart(2, 0)}:${minutes.toString().padStart(2, 0)}:${seconds.toString().padStart(2, 0)}`
}

setInterval(runClock, 1000)