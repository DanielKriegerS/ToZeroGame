document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.links');

   
    // Função para remover a classe 'active' de todos os links
    function removeActiveClassesFromLinks() {
        links.forEach(link => link.classList.remove('active'));
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
});
