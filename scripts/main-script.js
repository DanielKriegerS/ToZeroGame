document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.links');
    const op_buttons = document.querySelectorAll('.op-button');

    // Função para remover a classe 'active' de todos os links
    function removeActiveClassesFromLinks() {
        links.forEach(link => link.classList.remove('active'));
    }

    // Função para remover a classe 'active' de todos os botões de operação
    function removeActiveClassesFromButtons() {
        op_buttons.forEach(button => button.classList.remove('active'));
    }

    // Função para adicionar a classe 'active' ao link clicado
    function addActiveClass(element) {
        element.classList.add('active');
    }

    // Verificar se há um link ativo armazenado no localStorage
    const activeLinkId = localStorage.getItem('activeLinkId');
    if (activeLinkId) {
        const link = document.querySelector(`.links[data-id="${activeLinkId}"]`);
        if (link) {
            addActiveClass(link);
        }
    }

    // Verificar se há um botão ativo armazenado no localStorage
    const activeButtonId = localStorage.getItem('activeButtonId');
    if (activeButtonId) {
        const button = document.querySelector(`.op-button[data-id="${activeButtonId}"]`);
        if (button) {
            addActiveClass(button);
        }
    }

    links.forEach(link => {
        link.addEventListener('click', () => {
            removeActiveClassesFromLinks();
            addActiveClass(link);

            localStorage.setItem('activeLinkId', link.getAttribute('data-id'));

            setTimeout(() => {
                window.location.href = link.href;
            }, 100);
        });
    });

    op_buttons.forEach(button => {
        button.addEventListener('click', () => {
            removeActiveClassesFromButtons();
            addActiveClass(button);

            localStorage.setItem('activeButtonId', button.getAttribute('data-id'));
        });
    });
});
