function main() {
    const min = document.getElementById("min");
    const sec = document.getElementById("sec");
    const startBtn = document.getElementById("btn-start");
    const stopBtn = document.getElementById("btn-stop");
    const resetToFiftyBtn = document.getElementById("btn-reset-50");
    const resetToThirtyBtn = document.getElementById("btn-reset-30");
    const resetToTwentyFiveBtn = document.getElementById("btn-reset-25");
    const resetToTenBtn = document.getElementById("btn-reset-10");
    const resetToFiveBtn = document.getElementById("btn-reset-5");
    const buzzer = document.getElementById("buzzer");


    let currentMin = 0;
    let currentSec = 0;

    let timeTickerSubscription = null;

    function updateTime(newMin, newSec) {
        currentMin = newMin;
        currentSec = newSec;  
        
        min.innerText = getTwodigitStr(currentMin);
        sec.innerText = getTwodigitStr(currentSec);
    }

    function clearTimeTicker () {
        clearInterval(timeTickerSubscription);
        timeTickerSubscription = null;
    }

    window.addEventListener("load", (_) => {
        updateTime(30, 0);
    });

    startBtn.addEventListener("click", (_) => {
        if (timeTickerSubscription) {
            return;
        }
        timeTickerSubscription = setInterval(() => {
            const { newMin, newSec } = decrementOneSec(currentMin, currentSec);
            updateTime(newMin, newSec);

            if (newMin === 0 && newSec === 0) {
                clearTimeTicker();
                buzzer.play();
            }
        }, 1000);
    });

    stopBtn.addEventListener("click", (_) => {
        clearTimeTicker();
    });

    resetToFiftyBtn.addEventListener("click", (_) => {
        clearTimeTicker();
        updateTime(50,0);
    });

    resetToThirtyBtn.addEventListener("click", (_) => {
        clearTimeTicker();
        updateTime(30,0);
    });

    resetToTwentyFiveBtn.addEventListener("click", (_) => {
        clearTimeTicker();
        updateTime(25,0);
    });

    resetToTenBtn.addEventListener("click", (_) => { 
        clearTimeTicker();
        updateTime(10,0);
    });

    resetToFiveBtn.addEventListener("click", (_) => {
        clearTimeTicker();
        updateTime(5,0);
    });
}

function getTwodigitStr(number) {
    let str;
    if(number < 10) {
        str = `0${number}`;
    } else {
        str = `${number}`;
    }
    return str
}

function decrementOneSec(prevMin, prevSec) {
    let newMin;
    let newSec;
    if (prevMin === 0 && prevSec ===0) {
        newMin = 0;
        newSec = 0;   
    } else if (prevSec === 0){
        newMin = prevMin - 1;
        newSec = 59;
    } else {
        newMin = prevMin;
        newSec = prevSec - 1;
    } return {
        newMin: newMin,
        newSec: newSec
    };

    }

main();