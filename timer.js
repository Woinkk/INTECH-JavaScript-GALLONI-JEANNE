let timerActive = false;
let pauseButton = document.getElementById("pause");

function Timer() {
    let interval = setInterval(() => {
        console.log("interval")
    }, 1000);
    pauseButton.removeAttribute("disabled");
    pauseButton.addEventListener("click", Pause(interval));
}

function Pause(interval) {
    console.log("pause");
    clearInterval(interval);
}

Timer()