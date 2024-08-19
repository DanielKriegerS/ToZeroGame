document.addEventListener('DOMContentLoaded', () => {
    let seconds = 0;
    const secondHand = document.getElementById('second-hand');
    const numbersContainer = document.getElementById('clock-numbers');
    const secondsSpan = document.getElementById('time');
    const name = document.getElementById('name');

    let choicedName = localStorage.getItem('username');

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

    setName();

    
    function updateClock() {
        const degrees = (seconds / 60) * 360;
        secondHand.style.transform = `rotate(${degrees}deg)`;
        const tipRotation = degrees % 360;
        secondHand.style.setProperty('--tip-rotation', `${tipRotation}deg`);
        seconds = (seconds + 1) % 60;
        updateTimer();
    }

    function updateTimer() {
        if (timer < 0) {
            timer = parseInt(localStorage.getItem('max-timer')); 
            seconds = 0;
            return; 
        }
        secondsSpan.textContent = timer;
        timer -= 1;
    }

    function setName() {
        name.textContent = choicedName;
        console.log(choicedName)
    }

    setInterval(updateClock, 1000);
});
