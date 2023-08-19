import { $ } from "../custom.js";

//Menu
{
    const menu = document.querySelector('.education__list'),
        btn = document.querySelector('.education__hamburger');
    btn.addEventListener('click', () => {
        if (menu.classList.contains('d-block')) {
            menu.classList.remove('d-block');
            btn.innerHTML = 'Katogoriya seç <i class="fa-solid fa-caret-down"></i>';
            btn.setAttribute('style', "");
            btn.classList.remove('education__hamburger__close');
        } else {
            menu.classList.add('d-block');
            btn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            btn.classList.add('education__hamburger__close');
        }
    })

    window.addEventListener('resize', () => {
        menu.classList.remove('d-block');
        btn.innerHTML = 'Katogoriya seç <i class="fa-solid fa-caret-down"></i>';
        btn.setAttribute('style', "");
        btn.classList.remove('education__hamburger__close');
    })
}

const cards = document.querySelector('.education__cards');
let courses = [];
{
    let selectedCatagory = "";
    const checkKeyWords = (key, keywords) => {
        for (let i of keywords)
            if (i.includes(key))
                return true;
        return false;
    }
    const feducation = document.getElementById('feducation');
    const inputContainer = document.querySelector('.education__input__container');
    feducation.addEventListener('input', e => {
        cards.innerHTML = "";
        refrestCards(e.target.value);
    })
    function refrestCards(value) {
        cards.innerHTML = '';
        for (let i = 0; i < courses.length; ++i) {
            if (
                (courses[i].name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
                    ||
                    checkKeyWords(value.toLocaleLowerCase(), courses[i].keywords))
                &&
                (
                    (selectedCatagory !== "" ? courses[i].subcategory == (selectedCatagory) : true)
                    ||
                    (selectedCatagory !== "" ? courses[i].category == (selectedCatagory) : true)
                )
            ) {
                cards.innerHTML +=
                    `
                <div class="education__card">
                <h3 class="education__card__title">
                    ${courses[i].name}
                </h3>
                <p class="education__card__description">
                ${courses[i].description}
                </p>
                <div class="eduication__card__additional">
                    <div class="eduication__card__additional--left">
                        <span>
                            Fərdi
                        </span>
                        <span>
                            ${courses[i].totalhour} Saat
                        </span>
                        <span>
                            Həftədə 3 dəfə
                        </span>
                    </div>
                    <div class="eduication__card__additional--right">
                        <button class="">
                            <a>Ətraflı</a>
                        </button>
                    </div>
                </div>
                </div>
                `
            }
        }
    }
    document.addEventListener('click', ({ target }) => {
        if (target.getAttribute('data-button') === 'catagory__button') {
            if (document.querySelector('.selected__catagory'))
                document.querySelector('.selected__catagory').remove();
            selectedCatagory = target.getAttribute('data-catagory');
            inputContainer.innerHTML +=
                `
            <span class="selected__catagory">
                ${target.querySelector("span").innerText}
                <button class="selected__catagory__remove">
                    <i class="fa-solid fa-xmark" style="color: #000000;"></i>
                </button>
            </span>
            `
            refrestCards(feducation.value);
        } else if (target.classList.contains('selected__catagory__remove')) {
            document.querySelector('.selected__catagory').remove();
            selectedCatagory = "";
            refrestCards(feducation.value);
        }
    })
}

const educationList = $("#education-list");
fetch("http://localhost:3000/api/categories")
    .then(r => r.json())
    .then(data => {
        data.forEach((item, index) => {
            educationList.innerHTML +=
                `
            <li data-catagory="${item.keyword}" data-button="catagory__button" style="--color:var(--card-color${(index + 1) % 12})"
                class="catogory__element">
                <span>
                    ${item.name}
                </span>
                <i class="fa-solid fa-caret-right"></i>
                ${loadSubCategories(item.subcategories)}
            </li>
            `
        });
    });

function loadSubCategories(par) {
    if (par.length === 0) return "";
    let element = `<div class="rightmenu">`;
    for (let i in par) {
        console.log((i + 11) % 12);
        element +=
            `
        <div data-catagory=${par[i].keyword} data-button="catagory__button" style="--color:var(--card-color${Number(i) + 1}" class="rightmenu__element">
            <span>
            ${par[i].name}
            </span>
        </div>
        `
    }
    element += `</div>`
    return element;
}


fetch("http://localhost:3000/api/courses")
    .then(r => r.json())
    .then(data => {
        courses = data;
        for (let index = 0; index < data.length && index < 5; ++index) {
            cards.innerHTML +=
                `
            <div class="education__card">
            <h3 class="education__card__title">
                ${data[index].name}
            </h3>
            <p class="education__card__description">
            ${data[index].description}
            </p>
            <div class="eduication__card__additional">
                <div class="eduication__card__additional--left">
                    <span>
                        Fərdi
                    </span>
                    <span>
                        ${data[index].totalhour} Saat
                    </span>
                    <span>
                        Həftədə 3 dəfə
                    </span>
                </div>
                <div class="eduication__card__additional--right">
                    <button class="">
                        <a>Ətraflı</a>
                    </button>
                </div>
            </div>
            </div>
            `
        }
    })