const infoTitle = document.querySelector('#info-title');
let HCtitle = "Informação_inicial";

infoTitle.textContent = HCtitle;

// Função para carregar o conteúdo do arquivo JSON
async function loadMessage() {
    try {
        const response = await fetch('/assets/dicas.json');
        if (!response.ok) {
            throw new Error('Erro ao carregar o arquivo de mensagens');
        }
        const data = await response.json();
        const content = data[HCtitle];

        if (content) {
            const message = content.message || 'Mensagem não encontrada para este título.';
            const imageUrl = content.image || '';

            console.log('Image URL:', imageUrl);

            document.getElementById('info-text').innerText = message;

            if (imageUrl) {
                const imageSection = document.getElementById('image-section');
                // Cria um novo elemento img
                const imageElement = document.createElement('img');
                // Define os atributos src e alt
                imageElement.src = imageUrl;
                imageElement.alt = `Imagem relacionada à ${HCtitle}`;
                imageElement.classList.add('img-fluid'); // Adiciona a classe img-fluid
                // Adiciona a imagem à seção da imagem
                imageSection.appendChild(imageElement);
            }
        } else {
            document.getElementById('info-text').innerText = 'Mensagem não encontrada para este título.';
        }
    } catch (error) {
        document.getElementById('info-text').innerText = 'Erro ao carregar a mensagem.';
        console.error(error);
    }
}

loadMessage();
