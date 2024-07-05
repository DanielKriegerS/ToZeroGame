document.addEventListener('DOMContentLoaded', () => {
    // Carga dos elementos do DOM   
    const checkbox = document.getElementById('tempo');
    const clock = document.getElementById('clock');

    const quantity = document.getElementById('quantity');
    const plus = document.getElementById('plus');
    const minus = document.getElementById('minus');

    localStorage.setItem('quantity', 3);

    // Adiciona evento de mudança ao checkbox
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
           clock.classList.add('active');
        } else {
           clock.classList.remove('active');
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
            console.log(actualQuantity);
        }
    }

});