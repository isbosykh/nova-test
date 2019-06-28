import Swiper from 'swiper';

let swiper = new Swiper('.swiper-container', {
    slidesPerView: 'auto',
    spaceBetween: 30,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

document.addEventListener('DOMContentLoaded', function () {
    swiper.update();

    let menu = document.getElementsByClassName('menu')[0];
    let menuBtn = document.getElementsByClassName('menu-btn')[0];

    menuBtn.addEventListener('click', function () {
        menu.classList.toggle('opened')
    });
});