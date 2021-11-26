let start = 0;
let pause = 0;
let stoptime = true;

const timer = document.getElementById('timer');
const pauseButton = document.getElementById("pause");

pauseButton.addEventListener("click", () => { stopTimer() });


function startTimer() {
    if (stoptime) {
        stoptime = false;
        start = Date.now();
        timerCycle();
    }
}

function stopTimer() {
    if (!stoptime) {
        pause = Date.now();
        stoptime = true;
        pauseButton.innerHTML = "Resume";
    } else {
        start += Date.now() - pause;
        stoptime = false;
        pauseButton.innerHTML = "Pause";
    }
}

function timerCycle() {
    setInterval(() => {
        if (!stoptime) {
            let diff = Date.now() - start;
            diff = Math.floor(diff / 1000);
            let min = Math.floor(diff / 60, 10);
            let sec = Math.floor(diff % 60, 10);
            timer.innerHTML = (min.toString().length < 2 ? "0"+ min : min) +":"+ (sec.toString().length < 2 ? "0"+ sec : sec);
        }
    }, 100);
    
    setTimeout(timerCycle, 1000);
}

function resetTimer() {
    timer.innerHTML = '00:00';
    stoptime = true;
}

export default startTimer;