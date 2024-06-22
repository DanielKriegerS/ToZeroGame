//*                         ELEMENTOS GERAIS DO SISTEMA                         *//
//*                                                                             *//
document.addEventListener('DOMContentLoaded', () => {
    // carga dos elementos do DOM   
    const links = document.querySelectorAll('.links');
    
    // carga dos elementos do localstorage
    const activeLinkId = localStorage.getItem('activeLinkId');

    // remoção das classes ACTIVE
    function removeActiveClassesFromLinks() {
        links.forEach(link => link.classList.remove('active'));
    }

    // adição da classe ACTIVE
    function addActiveClass(link) {
        link.classList.add('active');
    }

    // verificação de link ACTIVE    
    if (activeLinkId) {
        const link = document.querySelector(`.links[data-id="${activeLinkId}"]`);
        if (link) {
            addActiveClass(link);
        }
    }

    // adição dos listeners aos links
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
