const infoTitle = document.querySelector('#info-title');
const infoText = document.querySelector('#info-text');
const imageSection = document.getElementById('image-section');
const leftArrow = document.querySelector('.fa-arrow-left');
const rightArrow = document.querySelector('.fa-arrow-right');

let currentIndex = 0;
let contentArray = [];

// Função para carregar o conteúdo do arquivo JSON
async function loadMessages() {
    try {
        const response = await fetch('/assets/dicas.json');
        if (!response.ok) {
            throw new Error('Erro ao carregar o arquivo de mensagens');
        }
        contentArray = await response.json();
        displayContent(currentIndex);
    } catch (error) {
        infoText.innerText = 'Erro ao carregar a mensagem.';
        console.error(error);
    }
}

// Função para exibir o conteúdo baseado no índice
function displayContent(index) {
    const content = contentArray[index];
    if (content) {
        const title = content.title || 'Título não encontrado';
        const message = content.message || 'Mensagem não encontrada';
        const imageUrl = content.image || '';

        infoTitle.innerText = title;
        infoText.innerText = message;

        if (imageUrl) {
            imageSection.innerHTML = ''; // Limpa qualquer imagem existente
            const imageElement = document.createElement('img');
            imageElement.src = imageUrl;
            imageElement.alt = `Imagem relacionada à ${title}`;
            imageElement.classList.add('img-fluid'); // Adiciona a classe img-fluid
            imageSection.appendChild(imageElement);
        }
    } else {
        infoText.innerText = 'Conteúdo não encontrado para este índice.';
    }
}

// Event listeners para as setas
leftArrow.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        displayContent(currentIndex);
    }
});

rightArrow.addEventListener('click', () => {
    if (currentIndex < contentArray.length - 1) {
        currentIndex++;
        displayContent(currentIndex);
    }
});

// Carrega as mensagens quando a página é carregada
loadMessages();
