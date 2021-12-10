const translate = document.querySelectorAll(".translate");
const bigTitle = document.querySelector(".bigTitle");
const downBtn = document.querySelector(".downBtn");
const header = document.querySelector("header");
const shadow = document.querySelector(".shadow");
const content = document.querySelector(".content");
const section = document.querySelector("section");
const imgContainer = document.querySelector(".imgContainer");
const opacity = document.querySelectorAll(".opacity");
// const border = document.querySelectorAll(".border");
const border = document.querySelector(".border");

const pageTitle = document.querySelector(".pageTitle");

let headerHeight = header.offsetHeight;
let sectionHeight = section.offsetHeight;

window.addEventListener('scroll', () => {
    let scroll = window.pageYOffset;
    let sectionY = section.getBoundingClientRect();

    translate.forEach(element => {
        let speed = element.dataset.speed;
        element.style.transform = `translateY(${scroll * speed}px)`;
    });

    opacity.forEach(element => {
        element.style.opacity = scroll / (sectionY.top + sectionHeight);
    })

    bigTitle.style.opacity = - scroll / (headerHeight / 2) + 1;
    downBtn.style.opacity = - scroll / (headerHeight / 2) + 1;
    shadow.style.height = `${scroll * 0.5 + 300}px`;

    content.style.transform = `translateY(${scroll / (sectionHeight + sectionY.top) * 50 - 50}px)`;
    imgContainer.style.transform = `translateY(${scroll / (sectionHeight + sectionY.top) * -50 + 50}px)`;

    // console.log(border.style.width);
    if (scroll / (sectionY.top + sectionHeight) * 30 <= 530){
        border.style.width = `${scroll / (sectionY.top + sectionHeight) * 30}%`;
    }

    if (border.style.width.replace('%', '') >= 100){
        border.style.width = `0%`;
        // border.style.width = `${scroll / (sectionY.top + sectionHeight) * 30 - 100}%`;
    }
})