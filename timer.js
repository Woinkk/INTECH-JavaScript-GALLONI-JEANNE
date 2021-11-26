//stopwatch js

const pauseButton = document.getElementById("pause");
const timer = document.getElementById('timer');

pauseButton.addEventListener("click", () => { stopTimer() });

var min = 0;
var sec = 0;
var stoptime = true;

function startTimer() {
    if (stoptime) {
        stoptime = false;
        timerCycle();
    }
}

function stopTimer() {
    if (!stoptime) {
        pauseButton.innerHTML = "Resume";
        stoptime = true;
    } else {
        pauseButton.innerHTML = "Pause";
        startTimer()
    }
}

function timerCycle() {
    if (stoptime == false) {
    sec = parseInt(sec);
    min = parseInt(min);

    sec = sec + 1;

    if (sec == 60) {
      min = min + 1;
      sec = 0;
    }
    if (min == 60) {
      hr = hr + 1;
      min = 0;
      sec = 0;
    }

    if (sec < 10 || sec == 0) {
      sec = '0' + sec;
    }
    if (min < 10 || min == 0) {
      min = '0' + min;
    }

    timer.innerHTML = min + ':' + sec;

    setTimeout("timerCycle()", 1000);
  }
}

function resetTimer() {
    timer.innerHTML = '00:00';
    stoptime = true;
    min = 0;
    sec = 0;
}

startTimer()