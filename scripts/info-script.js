//*                         ELEMENTOS GERAIS DO SISTEMA                         *//
//*                                                                             *//
document.addEventListener('DOMContentLoaded', () => {
    // carga dos elementos do DOM                                                    //
    const infoTitle = document.querySelector('#info-title');
    const infoText = document.querySelector('#info-text');
    const imageSection = document.getElementById('image-section');
    const leftArrow = document.querySelector('.fa-arrow-left');
    const rightArrow = document.querySelector('.fa-arrow-right');

    // variáveis globais                                                            //
    let currentIndex = 0;
    let contentArray = [];

    //*                        CARGAS DE ELEMENTOS EXTERNOS                         *//
    //*                                                                             *//
    // Função para carregar o conteúdo do arquivo JSON
    async function loadMessages() {
        try {
            const response = await fetch('../assets/dicas.json');
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

    //*                       FUNÇÕES DE EXIBIÇÃO DOS DADOS                         *//
    //*                                                                             *//
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
                if (window.innerWidth >= 1024) {
                    // Carrega imagens grandes
                    if (imageUrls.large && imageUrls.large.length > 0) {
                        imageUrls.large.forEach(url => {
                            const imgElement = document.createElement('img');
                            imgElement.src = url;
                            imgElement.alt = `Imagem relacionada à ${title}`;
                            imgElement.classList.add('img-fluid');
                            pictureElement.appendChild(imgElement);
                        });
                    }
                } else if (window.innerWidth >= 768) {
                    // Carrega imagens médias
                    if (imageUrls.medium && imageUrls.medium.length > 0) {
                        imageUrls.medium.forEach(url => {
                            const imgElement = document.createElement('img');
                            imgElement.src = url;
                            imgElement.alt = `Imagem relacionada à ${title}`;
                            imgElement.classList.add('img-fluid');
                            pictureElement.appendChild(imgElement);
                        });
                    }
                } else {
                    // Carrega imagens pequenas
                    if (imageUrls.small && imageUrls.small.length > 0) {
                        imageUrls.small.forEach(url => {
                            const imgElement = document.createElement('img');
                            imgElement.src = url;
                            imgElement.alt = `Imagem relacionada à ${title}`;
                            imgElement.classList.add('img-fluid');
                            pictureElement.appendChild(imgElement);
                        });
                    }
                }

                imageSection.appendChild(pictureElement);
            }
        } else {
            infoText.innerText = 'Conteúdo não encontrado para este índice.';
        }
    }

    //*                               EVENT LISTENERS                               *//
    //*                                                                             *//
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


    // IN
    loadMessages()
});
