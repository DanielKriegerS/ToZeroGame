document.addEventListener('DOMContentLoaded', () => {
    // Carga dos elementos do DOM   
    const links = document.querySelectorAll('.link-divs a');
    const spans = document.querySelectorAll('.link-spans');

    // Carga dos elementos do localStorage
    const activeLinkId = localStorage.getItem('activeLinkId');

    // Remoção das classes ACTIVE dos links e spans
    function removeActiveClasses() {
        links.forEach(link => {
            link.querySelector('.links').classList.remove('active');
            link.querySelector('.link-spans').classList.remove('active');
        });
    }

    // Adição da classe ACTIVE aos links e spans correspondentes
    function addActiveClass(link) {
        link.querySelector('.links').classList.add('active');
        link.querySelector('.link-spans').classList.add('active');
    }

    // Verificação de link ACTIVE
    if (activeLinkId) {
        const activeLink = document.querySelector(`.link-divs a[data-id="${activeLinkId}"]`);
        if (activeLink) {
            addActiveClass(activeLink);
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
