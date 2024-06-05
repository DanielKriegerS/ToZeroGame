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
        const imageUrls = content.image || {};

        infoTitle.innerText = title;
        infoText.innerText = message;

        imageSection.innerHTML = ''; // Limpa qualquer imagem existente

        if (imageUrls) {
            const pictureElement = document.createElement('picture');

            // Adiciona fontes para diferentes tamanhos de tela
            if (imageUrls.large) {
                const sourceLarge = document.createElement('source');
                sourceLarge.srcset = imageUrls.large;
                sourceLarge.media = '(min-width: 1024px)';
                pictureElement.appendChild(sourceLarge);
            }

            if (imageUrls.medium) {
                const sourceMedium = document.createElement('source');
                sourceMedium.srcset = imageUrls.medium;
                sourceMedium.media = '(min-width: 768px)';
                pictureElement.appendChild(sourceMedium);
            }

            if (imageUrls.small) {
                const sourceSmall = document.createElement('source');
                sourceSmall.srcset = imageUrls.small;
                sourceSmall.media = '(max-width: 767px)';
                pictureElement.appendChild(sourceSmall);
            }

            const imgElement = document.createElement('img');
            imgElement.src = imageUrls.large || imageUrls.medium || imageUrls.small;
            imgElement.alt = `Imagem relacionada à ${title}`;
            imgElement.classList.add('img-fluid'); // Adiciona a classe img-fluid

            pictureElement.appendChild(imgElement);
            imageSection.appendChild(pictureElement);
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
    } else {
        currentIndex = contentArray.length - 1;
        displayContent(currentIndex);
    }
});

rightArrow.addEventListener('click', () => {
    if (currentIndex < contentArray.length - 1) {
        currentIndex++;
        displayContent(currentIndex);
    } else {
        currentIndex = 0;
        displayContent(currentIndex);
    }
});

// Carrega as mensagens quando a página é carregada
loadMessages();
