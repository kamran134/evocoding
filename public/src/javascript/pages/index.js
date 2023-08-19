// #region Input
{
    const numberInput = document.querySelector('#fnumber');
    const numberInputParent = numberInput.parentNode;
    numberInput.addEventListener('focus', () => {
        numberInputParent.classList.add('form__focus');
    })
    numberInput.addEventListener('blur', () => {
        numberInputParent.classList.remove('form__focus');
    })
}
// #endregion

// #region Index Import
import createCircleAnimation from "../features/circle.js";
import createBatmanAnimation from "../features/batman.js";
import createCarouselAnimation from "../features/carousel.js";
import startDynamicText from '../features/dynamictext.js';
import Course from "../features/educationform.js";
import { $ } from "../custom.js";

Course();
createCircleAnimation();
createBatmanAnimation();
createCarouselAnimation();
startDynamicText({
    className: ".home__text",
    texts: [
        "Time Is Passing", "The Future is Here", "hohohohoho"
    ]
})
//#endregion

{
    const mouse = document.querySelector('.mouse__down');
    let timeout = setTimeout(() => mouse.style.opacity = 1, 3000);
    document.addEventListener('scroll', () => {
        mouse.style.opacity = 0;
        clearTimeout(timeout);
        if (window.scrollY <= 300) {
            timeout = setTimeout(
                () => {
                    mouse.style.opacity = 1;
                }, 3000)
        }
    })
}
// Appeal

// About Text And Image
{
    const ABOUT = {
        text: $("#about-text"),
        image: $("#about-image"),
    }

    const response = await fetch("http://localhost:3000/api/home")
    const data = await response.json();
    ABOUT.text.innerText = data.text;
    ABOUT.image.src = data.img;
}

