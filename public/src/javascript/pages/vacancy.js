import { $ } from '../custom.js';

document.addEventListener('click', ({ target }) => {
    if (target.classList.contains('vacancy__list__element')) {
        const index = target.getAttribute('data-element');
        const element = document.querySelector(`[data-more="${index}"]`);
        element.classList.toggle('list__element__more--open');
    }
})

{
    const vacancyList = $("#vacancy-list");
    const response = await fetch("http://localhost:3000/api/vacancies");
    const data = await response.json();
    console.log(data);
    for (let i of data) {
        vacancyList.innerHTML +=
            `
            <option value = ${i.name}>
             ${i.name}
            </option >
        `
    }
}