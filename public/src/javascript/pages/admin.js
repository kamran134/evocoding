import { $ } from "../custom.js";
// Confirm Modal
const confirmModal = document.querySelector('.confirm__modal');
const BUTTON = {
    close: confirmModal.querySelector('[data-role=closemodal]'),
    confirm: confirmModal.querySelector('[data-role=confirmmodal]'),
}
let currentCallback = null;
export const callConfirmModal = callback => {
    confirmModal.classList.add('confirm__moodal--open');
    currentCallback = callback;
}
BUTTON.confirm.addEventListener('click', () => {
    confirmModal.classList.remove('confirm__moodal--open');
    currentCallback && currentCallback();
})
BUTTON.close.addEventListener('click', () => {
    confirmModal.classList.remove('confirm__moodal--open');
    currentCallback = null;
})


const IMAGEFRAME = {
    frame: $('.imageframe'),
    image: $('.imageframe img'),
    button: $('.imageframe button'),
    container: $('.imageframe .image')
}

export const changeFrameDisplay = par => IMAGEFRAME.frame.style.display = par;
export const changeImageFrame = par => {
    IMAGEFRAME.frame.querySelector('img') && IMAGEFRAME.frame.querySelector('img').remove();
    IMAGEFRAME.container.innerHTML += `<img src = "${par}?${Math.random()}">`
}

{
    const toggleAdminMenu = () => document.querySelector('.admin__menu').classList.toggle('admin__menu--open');
    const closeAdminMenu = () => document.querySelector('.admin__menu').classList.remove('admin__menu--open');
    document.addEventListener('click', ({ target }) => {
        const itemTarget = target.dataset.target;
        switch (itemTarget) {
            case "pages":
                target.querySelector('.bi-caret-down-fill')
                    .classList.toggle('rotate180');
                document.querySelector(`[data-item = ${itemTarget}]`)
                    .classList.toggle('admin__menu__item__bottom--open');
                break;
            case "appeals":
                target.querySelector('.bi-caret-down-fill')
                .classList.toggle('rotate180');
                document.querySelector(`[data-item = ${itemTarget}]`)
                .classList.toggle('admin__menu__item__bottom--open');
                break;
            case "admin-menu":
                if (target.classList.contains('btn-dark')) {
                    target.classList.remove('btn-dark');
                    target.classList.add('btn-danger');
                } else {
                    target.classList.add('btn-dark');
                    target.classList.remove('btn-danger');
                }
                toggleAdminMenu();
                break;
        }
        if (target.dataset.role) {
            if (target.dataset.role == "close-imageframe") {
                changeFrameDisplay('none')
            }
        }
    })
    window.addEventListener('resize', closeAdminMenu);
}


const token  = localStorage.getItem("token");
// if(!token){
//     window.location.href = "http://localhost:3000/adminlogin";
// }
