document.addEventListener('DOMContentLoaded', () => {
    // Carga dos elementos do DOM   
    const checkbox = document.getElementById('tempo');
    const clock = document.getElementById('clock');

    const quantity = document.getElementById('quantity');
    const plus = document.getElementById('plus');
    const minus = document.getElementById('minus');

    const name = document.getElementById('name');
    const begin_btn = document.getElementById('begin-game');

    // Adição de listeners
    begin_btn.addEventListener('click', () => {
        validateName();
    })

    localStorage.setItem('clock', 'inative');

    actualizeNumbersQuantity();

    // Adiciona evento de mudança ao checkbox
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
           clock.classList.add('active');
           localStorage.setItem('clock', 'active');

        } else {
           clock.classList.remove('active');
           localStorage.setItem('clock', 'inative');
       }
    });

    // Adição de listenners
    plus.addEventListener('click', function() {
        plusOneNumber();
    });  

    minus.addEventListener('click', function(){
        minusOneNumber();
    })

    // Efetua operações de mais e menos
    function plusOneNumber () {
        let actualQuantity = parseInt(localStorage.getItem('quantity'), 10);

        if(actualQuantity < 4) {
            actualQuantity += 1;
            localStorage.setItem('quantity', actualQuantity);
            console.log(actualQuantity);
            actualizeNumbersQuantity();
        } else {
            console.log('maximo atingido');
        }
    }

    function minusOneNumber () {
        let actualQuantity = parseInt(localStorage.getItem('quantity'), 10);

        if(actualQuantity == 3) {
            console.log('minimo atingido');
        } else {
            actualQuantity -= 1;
            localStorage.setItem('quantity', actualQuantity);
            actualizeNumbersQuantity();
            console.log(actualQuantity);
        }
    }

    // Atualização de valores na tela
    function actualizeNumbersQuantity() {
        if (localStorage.getItem('quantity')) {
            quantity.textContent = parseInt(localStorage.getItem('quantity'));
        } else {
            quantity.textContent = 3;
        }
    }

    // Validação de dados
    function validateName() {
        nameValue = name.value;

        if (nameValue === "") {
            window.alert('Nome não informado!');
        }

        if (nameValue.lentgh < 3) {
            window.alert('Nome muito curto!');
        }
    }
});