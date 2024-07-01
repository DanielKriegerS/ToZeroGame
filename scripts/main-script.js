document.addEventListener('DOMContentLoaded', () => {
    // Carga dos elementos do DOM   
    const links = document.querySelectorAll('.link-divs a');
    const spans = document.querySelectorAll('.link-spans');

    // Função para remover as classes ACTIVE dos links e spans
    function removeActiveClasses() {
        links.forEach(link => {
            link.querySelector('.links').classList.remove('active');
            link.querySelector('.link-spans').classList.remove('active');
        });
    }

    // Função para adicionar a classe ACTIVE aos links e spans correspondentes
    function addActiveClass(link) {
        link.querySelector('.links').classList.add('active');
        link.querySelector('.link-spans').classList.add('active');
    }

    // Verificação e atualização do link ativo com base na URL atual
    let activeLinkUpdated = false;
    links.forEach(link => {
        if (link.href === window.location.href) {
            localStorage.setItem('activeLinkId', link.getAttribute('data-id'));
            addActiveClass(link);
            activeLinkUpdated = true;
        }
    });

    // Caso não tenha encontrado um link correspondente à URL atual
    if (!activeLinkUpdated) {
        const activeLinkId = localStorage.getItem('activeLinkId');
        if (activeLinkId) {
            const activeLink = document.querySelector(`.link-divs a[data-id="${activeLinkId}"]`);
            if (activeLink) {
                addActiveClass(activeLink);
            }
        }
    }

    // Adição dos listeners aos links
    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            removeActiveClasses();
            addActiveClass(link);

            localStorage.setItem('activeLinkId', link.getAttribute('data-id'));

            setTimeout(() => {
                window.location.href = link.href;
            }, 100);
        });
    });
});
