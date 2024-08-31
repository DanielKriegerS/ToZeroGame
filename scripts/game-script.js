document.addEventListener('DOMContentLoaded', () => {
//*                         ELEMENTOS GERAIS DO SISTEMA                         *//
//*                                                                             *//
// carga dos elementos do DOM                                                    //
const randomNumbers = document.querySelectorAll('.random-numbers');
const selectedNumbers = document.querySelectorAll('.selected-numbers');
const selectedOperation = document.querySelector('.selected-operation');
const resultSpan = document.getElementById('result');
const numbersHeader = document.getElementById('numbers-header');
const op_buttons = document.querySelectorAll('.op-button');
document.getElementById('cancel-operation').addEventListener('click', clear, removeActiveClassesFromButtons);
document.getElementById('execute-operation').addEventListener('click', executeOperation, removeActiveClassesFromButtons);
document.getElementById('restart-game').addEventListener('click', restartGame, removeActiveClassesFromButtons);
const time = document.getElementById('time');

// variáveis globais                                                            //
let selectedNumbersValues = [];
let randomNumbersValues = [];
let firstNumbers = [];
let headerOp = 1;
let endedGame = false;

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
            randomNumbersValues[i] = randomNumbers[i].textContent;
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
            case ' ^ ':
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

        if (result < 0) {
            alert('O resultado não é um número positivo.');
            selectedOperation.textContent = '';
            resultSpan.textContent = '=';
            return;
        }

        if (result > 99) {
            alert('O resultado possui mais de dois dígitos.');
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
            randomNumbersValues[i] = randomNumbers[i].textContent;
            replaces++;
        }
    }
    changeHeader(2);
    clearFields();
    checkEndGame();
}

// Altera o valor do header
function changeHeader(operation) {
    headerOp = operation;
    initializeHeader();
    return;
}

 // Adicionar a classe active à operação
 function addActiveClass(operation) {
    removeActiveClassesFromButtons();
    operation.classList.add('active');
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

function activateOpButtons() {
    op_buttons.forEach(operation => {
        operation.addEventListener('click', () => {
            addActiveClass(operation);
        });
    });

}

function verifyConfig() {
    let configured = localStorage.getItem('configured');
    let isConfigured = configured == 'true' ? true:false;
    let username = localStorage.getItem('username');

    if (isConfigured && username === '') {
        localStorage.setItem('configured', 'false');
    }
    
    if (!isConfigured) {
        let goToConfig = confirm("Configurações não encontradas. Deseja configurar?");

        if (goToConfig) {
            window.location.href = "./pages/config-page.html";
        } else {
            localStorage.setItem('configured', 'false');
        }
    }

}

//*                     EFETUA SELEÇÃO DE ELEMENTOS                            *//
//*                                                                            *//
// Adiciona número à seleção                                                    //
function addToSelection(value, index) {
    if (selectedNumbersValues.length < 2 && randomNumbersValues[index] !== 0
                                         && randomNumbersValues[index] !== "") {
        selectedNumbersValues.push(value);
        updateSelectedNumbersDisplay();
        cleanRandom(index);
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
    removeActiveClassesFromButtons();
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

    if (endedGame == true) {status = 3;}

    switch(status) {
        case 1:
            finishGame(1);
            break;
        case 2:
            finishGame(2);
            break;
        case 3:
            finishGame(3);
            break;
        default:
            localStorage.setItem('ended-game', 'false');
            return;
    }
}

// finalização do sistema por tempo                                             //
function verifyEndTimer() {
    let actualTime = parseInt(time.textContent);

    if (actualTime <= 0) {
        endedGame = true;
        checkEndGame();
        time.textContent = parseInt(localStorage.getItem('max-timer'));
        return;
    }
    
}

setInterval(verifyTimer, 1000);

function verifyTimer() {
    if (!endedGame) {
        verifyEndTimer();
    } 
}

// Reinicia o jogo
function restartGame() {
    removeActiveClassesFromButtons();

    let i = 0;
    randomNumbers.forEach(button => {
        button.textContent = firstNumbers[i];
        randomNumbersValues[i] = firstNumbers[i];
        changeHeader(1);
        clearFields();
        i++;
    });
}

// Finaliza o jogo
function finishGame(context) {
    if (context == 1) {
        window.alert("Parabéns, você venceu!");
    }

    if (context == 2) {
        window.alert("Que pena, foi por pouco!");
    }

    if (context == 3) {
        window.alert("Que pena, o tempo acabou!");
    }

    resetSelecteds();
    localStorage.setItem('ended-game', 'true');
    initializeSystem();
    changeHeader(1);
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
function cleanRandom(index) {
    for(let i = 0; i < randomNumbers.length; i++) {
        if(randomNumbersValues[i] !== 0 && i === index){
            randomNumbers[i].textContent = '';
            randomNumbersValues[i] = 0;
            return;
        }
    }

}

// Reinicia os campos selecionados pelo fim de jogo
function resetSelecteds() {
    removeActiveClassesFromButtons();
    clearFields();
}

// Reseta os números aleatórios sempre antes de adicionar novos
function resetNumbers() {
    for (let i = 0; i < randomNumbersValues.length; i++){
        randomNumbersValues[i] = 0;
    }
}
// Limpeza de campos pelo botão de limpar
function clear() {
    removeActiveClassesFromButtons();
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

// Remoção das classes active
function removeActiveClassesFromButtons() {
    op_buttons.forEach(button => button.classList.remove('active'));
}

// *                    ROTINA DE INICIALIZAÇÃO DO SISTEMA                      *//
// *                                                                            *//   
// gera números iniciais com base na quantia de números que devem haver na tela  //
function generateNumbers() {
    resetNumbers();
    for (let i = 0; i < randomNumbers.length; i++) {
        if (randomNumbersValues[i] === 0) {
            randomNumbersValues[i] = randomNumber();
            firstNumbers[i] = randomNumbersValues[i];
        } else {
            randomNumbersValues.push(randomNumber()); 
            firstNumbers.push(randomNumbersValues[i]);
        }
    }
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

// inicializa os números
function initializeNumbers(){
    for (let i = 0; i < randomNumbers.length; i++) {
        let button = randomNumbers[i];
        button.addEventListener('click', function() {
            addToSelection(button.textContent, i);
            updateResult();
        });
    }
}


// Inicializa as operações
function initializeOperations() {
    const operationsValues = [' + ', ' - ', ' * ', ' / ', ' ^ '];
    const buttons = document.querySelectorAll('.op-button');

    buttons.forEach((button, index) => {
      button.addEventListener('click', () => {
        addOperation(operationsValues[index]);
        updateResult(); 
    });
  });
}


// inicializa o cabeçalho dos números
function initializeHeader() {
    let header = "";
    numbersHeader.style.opacity = 0;

    if (headerOp === 1) {
        header = "Números gerados: ";
        setTimeout(() => {
            numbersHeader.textContent = header;
            numbersHeader.style.opacity = 1;
        }, 700);
    } else {
        header = "Números restantes: ";
        setTimeout(() => {
            numbersHeader.textContent = header;
            numbersHeader.style.opacity = 1;
        }, 700);
    }
}

// inicializa os botões                                                         //
function initializeButtons() {
    initializeOperations();
    initializeNumbers();
}

// inicialização do sistema                                                     //
function initializeSystem() {
    endedGame = false;

    verifyConfig();
    generateNumbers();
    displayInitialNumbers();
    initializeButtons();
    initializeHeader();
    activateOpButtons();
}


// IN                                                                           //
initializeSystem();
})

