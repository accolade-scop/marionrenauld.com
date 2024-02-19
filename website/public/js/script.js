const burger = document.getElementById('burger');
const menu = document.getElementById('menu-smart');
const openedClass = 'open';

if(burger && menu) {
    // quand on clique sur un lien du smart menu, on le ferme
    Array.from(document.querySelectorAll('#menu-smart a')).forEach(a => {
        a.addEventListener('click', () => menu.classList.toggle(openedClass, false))
    })

    // quand on clique sur le burger on toggle le menu
    burger.addEventListener('click', () => menu.classList.toggle(openedClass));
} else {
    console.warn("can't get burger or menu ...");
}
