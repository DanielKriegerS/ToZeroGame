document.addEventListener('DOMContentLoaded', () => {
    // Carga dos elementos do DOM   
    const checkbox = document.getElementById('tempo');
    const clock = document.getElementById('clock');
    const saveName_CB = document.getElementById('save');

    const quantity = document.getElementById('quantity');
    const plus = document.getElementById('plus');
    const minus = document.getElementById('minus');

    const username = document.getElementById('name');
    const begin_btn = document.getElementById('begin-game');

    actualizeNumbersQuantity();

    if (localStorage.getItem('remember-name') == 'false') {
        localStorage.setItem('username', '');
        console.log("aqui");
    }

    // Adição de listeners
    begin_btn.addEventListener('click', () => {
        if (validateName() && validateQuantity()) {
            routeToGame();
        } 
    });

    localStorage.setItem('clock', 'inative');

    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
           clock.classList.add('active');
           localStorage.setItem('clock', 'active');
        } else {
           clock.classList.remove('active');
           localStorage.setItem('clock', 'inative');
       }
    });

    plus.addEventListener('click', function() {
        plusOneNumber();
        verifyLimit();
    });  

    minus.addEventListener('click', function(){
        minusOneNumber();
        verifyLimit();
    });

    // Efetua operações de mais e menos
    function plusOneNumber () {
        let actualQuantity = parseInt(localStorage.getItem('quantity'), 10);

        if(actualQuantity < 5) {
            actualQuantity += 1;
            localStorage.setItem('quantity', actualQuantity);
            actualizeNumbersQuantity();
        } else {
            alertUser("numbers-plus");
        }
    }

    function minusOneNumber () {
        let actualQuantity = parseInt(localStorage.getItem('quantity'), 10);

        if(actualQuantity == 3) {
            alertUser("numbers-minus");
        } else {
            actualQuantity -= 1;
            localStorage.setItem('quantity', actualQuantity);
            actualizeNumbersQuantity();
        }
    }

    // Atualização de valores na tela
    function actualizeNumbersQuantity() {
        if (localStorage.getItem('quantity')) {
            quantity.textContent = parseInt(localStorage.getItem('quantity'));
        } else {
            quantity.textContent = 3;
        }
        verifyLimit();
    }

    // Validação de dados
    function validateName() {
        const nameValue = username.value;

        if (nameValue === "") {
            alertUser("name-blank");
            return false;
        }

        if (nameValue.length < 3) {
            alertUser("name-short");
            return false;
        }

        saveName(nameValue);
        return true;
    }

    function validateQuantity() {
        const actualQuantity = parseInt(localStorage.getItem('quantity'), 10);

        if (actualQuantity < 3) {
            window.alert('Como você alterou isso?');
            localStorage.setItem('quantity', 3);
            return false;
        }

        if (actualQuantity > 5) {
            localStorage.setItem('quantity', 3);
            window.alert('Como você alterou isso?');
            return false;
        }
        return true;
    }

    function verifyLimit() {
        const actualQuantity = parseInt(localStorage.getItem('quantity'), 10);

        if (actualQuantity >= 5) {
            plus.classList.add('limit');
        } else {
            plus.classList.remove('limit');
        }

        if (actualQuantity <= 3) {
            minus.classList.add('limit');
        } else {
            minus.classList.remove('limit');
        }
    }

    // Alertas e mensagens
    function alertUser(typeErr) {
        if (typeErr === "numbers-plus") {
           window.alert('máximo atingido');
        }

        if (typeErr === "numbers-minus") {
           window.alert('mínimo atingido');
        }

        if (typeErr === "name-blank") {
           window.alert('nome não informado');
        }

        if (typeErr === "name-short") {
           window.alert('nome deve conter no mínimo 3 caracteres');
        }
    
    }

    // funções de consistência
    function saveName(username) {
        localStorage.setItem('username', username);
        rememberName();
    }


    function rememberName() {
        if(saveName_CB.checked) {
            localStorage.setItem('remember-name', 'true');
        } else {
            localStorage.setItem('remember-name', 'false');
        }
    }

    // Roteamento para tela do jogo
    function routeToGame() {
        window.location.href = '../index.html';
    }
});
