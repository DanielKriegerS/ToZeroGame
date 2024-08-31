document.addEventListener('DOMContentLoaded', () => {
    let seconds = 0;
    const secondHand = document.getElementById('second-hand');
    const numbersContainer = document.getElementById('clock-numbers');
    const secondsSpan = document.getElementById('time');
    const name = document.getElementById('name');
    const time = document.getElementById('time');
    const timerDiv = document.getElementById('timer');
    const clock = document.getElementById('clock');

    let username = '';
    let isToRememberName;
    let isClockActive;

    let timer = 60;
    localStorage.setItem('max-timer', timer);

    const numbers = ['3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '1', '2'];

    numbers.forEach((number, index) => {
        const numberElement = document.createElement('div');
        numberElement.classList.add('clock-number');
        const angle = index * 30;
        numberElement.style.transform = `rotate(${angle}deg) translate(4em) rotate(-${angle}deg)`;
        numberElement.textContent = number;
        numbersContainer.appendChild(numberElement);
    });
    
    function updateClock() {
        const degrees = (seconds / 60) * 360;
        secondHand.style.transform = `rotate(${degrees}deg)`;
        const tipRotation = degrees % 360;
        secondHand.style.setProperty('--tip-rotation', `${tipRotation}deg`);
        seconds = (seconds + 1) % 60;
        updateTimer();
    }

    function updateTimer() {
        let endedGame = localStorage.getItem('ended-game');
        let isEnded = endedGame == 'true' ? true:false;
        if (timer < 0 || isEnded) {
            timer = parseInt(localStorage.getItem('max-timer'));
            localStorage.setItem('ended-game', 'false');
            seconds = 0;
            return; 
        }

        if (timer <= 10) {
            nearEndTime(true);
        } else {
            nearEndTime(false);
        }

        secondsSpan.textContent = timer;
        timer -= 1;
    }

    function setName() {
        if (isToSetName && !isToRememberName) {
            name.textContent = username;
            localStorage.setItem('username', 'not-remember');
        } 

        if (isToRememberName && username !== '') {
            name.textContent = username;
        }

        if (!isToSetName && !isToRememberName) {
            name.textContent = 'NoNamed';
            name.classList.add('not-active')
            localStorage.setItem('username', '');
        }

        localStorage.setItem('name-seted', 'false');
        return;
    }

    function updateEndGame() {
        if (localStorage.getItem('ended-game') === 'true') {
            endedGame = true;
            updateTimer();
        } 

        endedGame = false;
    }

    function nearEndTime(ending) {
        ending ? time.classList.add('ending-time') : time.classList.remove('ending-time');
    }

    function initializeClock() {
        setInterval(() => {
            updateClock();
            updateEndGame();
        }, 1000);
    }

    function verifyActivesArgs() {
        // clock
        let clockStatus = localStorage.getItem('clock');
        isClockActive = clockStatus == 'active' ? true:false;
        
        // name
        let choicedName = localStorage.getItem('username');
        let isNameSeted = localStorage.getItem('name-seted');
        let rememberName = localStorage.getItem('remember-name');
        isToRememberName = rememberName == 'true' ? true:false;
        isToSetName = isNameSeted == 'true' ? true:false;
        username = choicedName == '' ? '':choicedName;
    
    }

    function setActivation() {
        isClockActive ? initializeClock() : desativateClock();
    }

    function desativateClock() {
        timerDiv.classList.add('not-active');
        clock.classList.add('not-active');
    }
    
    function initializeSystem() {
        verifyActivesArgs();
        setActivation();
        setName();
    }

    initializeSystem();

});
