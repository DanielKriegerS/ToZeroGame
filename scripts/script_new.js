//*                         ELEMENTOS GERAIS DO SISTEMA                         *//
//*                                                                             *//
// carga dos elementos do DOM                                                    //
const randomNumbers = document.querySelectorAll('.random-numbers');
const selectedNumbers = document.querySelectorAll('.selected-numbers');
const selectedOperation = document.querySelector('.selected-operation');
const operations = document.querySelectorAll('.op-button');
const resultSpan = document.getElementById('result');
document.getElementById('cancel-operation').addEventListener('click', clear);
document.getElementById('execute-operation').addEventListener('click', executeOperation);
document.getElementById('restart-game').addEventListener('click', restartGame);

// variáveis globais                                                            //
let selectedNumbersValues = [];
let randomNumbersValues = [];

// fábrica de números aleatórios entre 1 e 9                                    //
function randomNumber() {
    return Math.floor(Math.random() * 9) + 1;
}

//*                         ATUALIZAÇÃO DE INFORMAÇÕES                         *//
//*                                                                            *//
// Atualiza a exibição dos números selecionados                                 //
function updateSelectedNumbersDisplay() {
    selectedNumbers.forEach((span, index) => {
        span.textContent = selectedNumbersValues[index] || "";
    });
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

// atualiza resultado                                                           //
function updateResult() {
    const { valid, numbers, operation } = validateOperation();

    if (valid) {
        let result = 0;

        switch (operation) {
            case ' + ':
                result = numbers.reduce((acc, curr) => acc + curr);
                break;
            case ' - ':
                result = numbers.reduce((acc, curr) => acc - curr);
                break;
            case ' * ':
                result = numbers.reduce((acc, curr) => acc * curr);
                break;
            case ' / ':
                result = numbers.reduce((acc, curr) => acc / curr);
                break;
            case ' x ':
                result = numbers.reduce((acc, curr) => Math.pow(acc, curr));
                break;
            default:
                alert('Operação inválida.');
                return;
        }
    
        if (!Number.isInteger(result)) {
            alert('O resultado não é um número inteiro.');
            selectedOperation.textContent = '';
            resultSpan.textContent = '=';
            return;
        }

        resultSpan.textContent = '= ' + result;
    }
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


//*                             VALIDAÇÕES DO JOGO                             *//
//*                                                                            *//
// valida a operação                                                            //
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


//*                     EFETUA SELEÇÃO DE ELEMENTOS                            *//
//*                                                                            *//
// Adiciona número à seleção                                                    //
function addToSelection(value) {
    if (selectedNumbersValues.length < 2) {
        selectedNumbersValues.push(value);
        updateSelectedNumbersDisplay();
        cleanRandom();
        return;
    }
}

// Adiciona operação à seleção
function addOperation(operation) {
    selectedOperation.textContent = operation;
}


//*                             FUNÇÕES DA OPERAÇÃO                            *//
//*                                                                            *//   
// Executa operação
function executeOperation() {
    let result = getResultValue();
    if (result !== undefined) {
        let resultDigits = splitDigits(result);
        replaceSelectedNumbers(resultDigits);    
    }
    return;
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

//*                                 FIM DE JOGO                                *//
//*                                                                            *//      
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

// Reinicia o jogo
function restartGame() {
    let i = 0;
    randomNumbers.forEach(button => {
        button.textContent = randomNumbersValues[i];
        clearFields();
        i++;
    });
}

//*                             FUNÇÕES DE LIMPEZA                             *//
//*                                                                            *//   
// Limpeza de campos
function clearFields() {
    selectedNumbers.forEach(span => {
        span.textContent = '';
    });

    selectedOperation.textContent = '';
    resultSpan.textContent = '=';

    selectedNumbersValues = [];
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

// *                    ROTINA DE INICIALIZAÇÃO DO SISTEMA                      *//
// *                                                                            *//   
// gera números iniciais com base na quantia de números que devem haver na tela  //
function generateNumbers() {
    randomNumbersValues = []; 
    randomNumbers.forEach(element => {
        randomNumbersValues.push(randomNumber()); 
    });
    return randomNumbersValues;
}

// insere números gerados na tela                                               //
function displayInitialNumbers() {
    let i = 0;
    randomNumbers.forEach(randomNumber => {
        randomNumber.textContent = randomNumbersValues[i];
        i++;
    });
}

// inicializa os números                                                        //
function initializeNumbers(){
    randomNumbers.forEach(button => {
        button.addEventListener('click', function() {
            addToSelection(button.textContent);
            updateResult();
        });
    });    
}

// inicializa as operações                                                      //
function initializeOperations() {
    operations.forEach(button => {
        button.addEventListener('click', function(){
            addOperation(button.textContent);
            updateResult();
        });
    });
}

// inicializa os botões                                                         //
function initializeButtons() {
    initializeOperations();
    initializeNumbers();
}

// inicialização do sistema                                                     //
function initializeSystem() {
    generateNumbers();
    displayInitialNumbers();
    initializeButtons();
}

// IN                                                                           //
initializeSystem();
