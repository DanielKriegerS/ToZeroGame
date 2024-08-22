document.addEventListener('DOMContentLoaded', () => {
    
    // carga de elementos do DOM
    const numbersContainer = document.getElementById('numbers');

    // variáveis globais
    let defaultQuantity = 3;

    // carga de informações  salvas
    const quantityOfNumbers = localStorage.getItem('quantity');
    const username = localStorage.getItem('username');
    
    // fábrica de números aleatórios entre 1 e 9                                    //
    function randomNumber() {
        return Math.floor(Math.random() * 9) + 1;
    }

    // criação dinamica de elementos
    function createButtons(quantity) {
        for (let i = 0; i < quantity; i++) {
            const button = document.createElement('button');
            button.className = 'random-numbers';
            button.textContent = randomNumber(); 
            numbersContainer.appendChild(button);
        }
    }

    // inicialização
    function initialize() {
        let configured = localStorage.getItem('configured');
        let isConfigured = configured == 'true' ? true:false;

        if (quantityOfNumbers && isConfigured) {
            createButtons(parseInt(quantityOfNumbers));
        } else {
            localStorage.setItem('quantity', 3);
            createButtons(3);
        }
    
    }

    // in
    initialize();
})