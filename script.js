// ハンバーガーメニュー用のコード
const hamburger = document.querySelector('.hamburger-icon');
const navMenu = document.querySelector('.navigation-menu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// ヒーロースライダー用のコード
const swiper = new Swiper('.hero-slider', {
  direction: 'horizontal',
  loop: true,
  autoHeight: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.pagination-container .swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});