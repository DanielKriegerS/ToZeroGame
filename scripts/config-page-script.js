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
        validateQuantity();
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
            actualizeNumbersQuantity();
        } else {
            alertUser("numbers-plus");
        }
    }

    function minusOneNumber () {
        let actualQuantity = parseInt(localStorage.getItem('quantity'), 10);

        if(actualQuantity == 3) {
            alertUser("numbers-minus")
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
    }

    // Validação de dados
    function validateName() {
        nameValue = name.value;

        if (nameValue === "") {
            alertUser("name-blank")
        }

        if (nameValue.length < 3) {
            alertUser("name-short");
        }
    }

    function validateQuantity() {
        if (parseInt(localStorage.getItem('quantity')) < 3) {
            window.alert('Como você alterou isso?');
            localStorage.setItem('quantity', 3);
        }

        if (parseInt(localStorage.getItem('quantity')) > 4) {
            localStorage.setItem('quantity', 3);
            window.alert('Como você alterou isso?');
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
});