// carga dos elementos do DOM
const randomNumbers = document.querySelectorAll('.random-numbers');
const selectedNumbers = document.querySelectorAll('.selected-numbers');
const selectedOperation = document.querySelector('.selected-operation');
const operations = document.querySelectorAll('.op-button');
const resultSpan = document.getElementById('result');
document.getElementById('cancel-operation').addEventListener('click', clear);
document.getElementById('execute-operation').addEventListener('click', executeOperation);
document.getElementById('restart-game').addEventListener('click', restartGame);

// variáveis globais
let selectedNumbersValues = [];
let randomNumbersValues = [];


// geração de números randomicos
function randomNumber() {
    return Math.floor(Math.random() * 9) + 1;
}

// insere números gerados na tela
function initializeNumbers() {
    randomNumbers.forEach(button => {
        button.textContent = randomNumber();
        randomNumbersValues.push(button.textContent);
        localStorage.setItem('random-numbers', JSON.stringify(randomNumbersValues));
        button.addEventListener('click', function() {
            addToSelection(button.textContent);
            updateResult();
        });
    })
}

// inicializa as operações
function initializeOperations() {
    operations.forEach(button => {
        button.addEventListener('click', function(){
            addOperation(button.textContent);
            updateResult();
        })
    })
}

// seleciona número
function addToSelection(number) {
    for (let i = 0; i < selectedNumbers.length; i++) {
        if (selectedNumbers[i].textContent === '') {
            selectedNumbers[i].textContent = number;
            selectedNumbersValues.push(number);
            cleanRandom();
            return;
        }
    }
}

// seleciona operação
function addOperation(operation) {
    selectedOperation.textContent = operation.trim();
    return;
}

// valida a operação
function validateOperation() {
    let numbers = [];
    let operation = selectedOperation.textContent;

    selectedNumbers.forEach(span => {
        if (span.textContent !== '') {
            numbers.push(parseInt(span.textContent));
        }
    });

    if (numbers.length < 2 || operation === '') {
        resultSpan.textContent = '=';
        return { valid: false };
    }

    return { valid: true, numbers, operation };
}

// atualiza resultado
function updateResult() {
    const { valid, numbers, operation } = validateOperation();

    if (valid) {
        let result = 0;

        switch (operation) {
            case '+':
                result = numbers.reduce((acc, curr) => acc + curr);
                break;
            case '-':
                result = numbers.reduce((acc, curr) => acc - curr);
                break;
            case '*':
                result = numbers.reduce((acc, curr) => acc * curr);
                break;
            case '/':
                result = numbers.reduce((acc, curr) => acc / curr);
                break;
            case 'x':
                result = numbers.reduce((acc, curr) => Math.pow(acc, curr));
                break;
            default:
                alert('Operação inválida.');
                return;
        }
    
        if (!Number.isInteger(result)) {
            alert('O resultado não é um número inteiro.');
            selectedOperation.textContent = '';
            return;
        }
    
        resultSpan.textContent = '= ' + result;
    }
}

// Executa operação
function executeOperation() {
   let result = getResultValue();
   let resultDigits = splitDigits(result);
   replaceSelectedNumbers(resultDigits);
}

// Substitui os números selecionados pelos dígitos do resultado
function replaceSelectedNumbers(digits) {
    let replaces = 0;
    for(let i = 0; i < randomNumbers.length; i++) {
        if (randomNumbers[i].textContent === '') {
            randomNumbers[i].textContent = digits[replaces];
            replaces++;
        }
    }

    clearFields();
    checkEndGame();
}

// Divide o número em dígitos individuais e retorna como uma matriz
function splitDigits(number) {
    const digits = number
                    .toString()
                    .split('')
                    .map(Number)
                    .filter(digit => digit !== 0);
    return digits;
}


// Pega o valor do resultado
function getResultValue() {
    const resultText = resultSpan.textContent;
    const match = resultText.match(/\d+/);
    if (match) {
        return parseInt(match[0]); 
    } else {
        return alert("Insira valores válidos."); 
    }
}

// Reinicia o jogo
function restartGame() {
    let i = 0;
    randomNumbers.forEach(button => {
        button.textContent = randomNumbersValues[i];
        clearFields();
        i++;
    });
}

// Limpeza do valor selecionado
function cleanRandom() {
    let occurs = 0;
    randomNumbers.forEach(span => {
        if (selectedNumbersValues.includes(span.textContent) && occurs < 1) {
            span.textContent = '';
            occurs++;
            return;
        }
    });
}


// Limpeza de campos pelo botão de limpar
function clear() {
    returnSelecteds();
    clearFields();
}

// Limpeza de campos
function clearFields() {
    selectedNumbers.forEach(span => {
        span.textContent = '';
    });

    selectedOperation.textContent = '';
    resultSpan.textContent = '=';

    selectedNumbersValues = [];
}

// Retorna valores selecionados
function returnSelecteds() {
    let j = 0
    for (let i = 0; i < randomNumbers.length; i++){
        if (randomNumbers[i].textContent === ''){
            randomNumbers[i].textContent = selectedNumbersValues[j];
            j++;
        } 
    }
}

// Verifica e finaliza o jogo
function checkEndGame() {
    let status;
    let numbers = 0;

    randomNumbers.forEach(button => {
    if (button.textContent !== '') {
            numbers++;
        }
    })

    if (numbers == 0) {status = 1;}
    if (numbers == 1) {status = 2;}

    switch(status) {
        case 1:
            window.alert("Parabéns, você venceu!");
            initializeSystem();
            break;
        case 2:
            window.alert("Que pena, foi por pouco!");
            initializeSystem();
            break;
        default:
            return;
    }
}

// chama inicializações do sistema
function initializeSystem() {
    initializeOperations();
    initializeNumbers();    
}

initializeSystem();