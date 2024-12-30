
const playButton = document.querySelector(".button.play");
const lapButton = document.querySelector(".button.lap");
const resetButton = document.querySelector(".button.reset");
const minute = document.querySelector(".minute");
const second = document.querySelector(".sec");
const centiSecond = document.querySelector(".msec");
const laps = document.querySelector(".laps");
const clearButton = document.querySelector(".lap-clear-button");
const bg = document.querySelector(".outer-circle");

let isPlay = false;
let secCounter = 0;
let sec;
let centisec;
let centiCounter = 0;
let min;
let minCounter = 0;
let lapItem = 0;

const toggleButton = () => {
    lapButton.classList.remove("hidden");
    resetButton.classList.remove("hidden");
};

const play = () => {
    if (!isPlay) {
        playButton.innerHTML = 'Pause';
        bg.classList.add("animation");

        min = setInterval(() => {
            minute.innerHTML = `${minCounter} :`;
        }, 60 * 1000);

        sec = setInterval(() => {
            if (secCounter === 60) {
                secCounter = 0;
                minCounter++;
            }
            second.innerHTML = `&nbsp;${secCounter} :`;
            secCounter++;
        }, 1000);

        centisec = setInterval(() => {
            if (centiCounter === 100) {
                centiCounter = 0;
            }
            centiSecond.innerHTML = `&nbsp;${centiCounter}`;
            centiCounter++;
        }, 10);

        isPlay = true;
    } else {
        playButton.innerHTML = 'Play';
        clearInterval(min);
        clearInterval(sec);
        clearInterval(centisec);
        isPlay = false;
        bg.classList.remove("animation");
    }
    toggleButton();
};

const reset = () => {
    // Stop all intervals
    clearInterval(min);
    clearInterval(sec);
    clearInterval(centisec);

    // Reset all counters
    minCounter = 0;
    secCounter = 0;
    centiCounter = 0;

    // Update display to 0:0:0
    minute.innerHTML = '0 :';
    second.innerHTML = '&nbsp;0 :';
    centiSecond.innerHTML = '&nbsp;0';

    // Update button and state
    playButton.innerHTML = 'Play';
    isPlay = false;
    bg.classList.remove("animation"); // Remove animation if running
};

const lap = () => {
    const li = document.createElement("li");
    const number = document.createElement("span");
    const timestamp = document.createElement("span");

    li.setAttribute("class", "lap-item");
    number.setAttribute("class", "number");
    timestamp.setAttribute("class", "time-stamp");

    number.innerText = `#${++lapItem}`;
    timestamp.innerHTML = `${minCounter} : ${secCounter} : ${centiCounter}`;

    li.append(number, timestamp);
    laps.append(li);

    clearButton.classList.remove("hidden");
};

const clearAll = () => {
    laps.innerHTML = '';
    laps.append(clearButton);

    clearButton.classList.add("hidden");
    lapItem = 0;
};

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", lap);
clearButton.addEventListener("click", clearAll);
