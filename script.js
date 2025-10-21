// ハンバーガーメニュー用のコード
const hamburger = document.querySelector(".hamburger-icon");
const main = document.querySelector("main");
const navMenu = document.querySelector(".navigation-menu");

main.addEventListener("click", () => {
  if (navMenu.classList.contains("active")) {
    // 'active'クラスを削除する（＝メニューを閉じる）
    navMenu.classList.remove("active");
  }
});
hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// ヒーロースライダー用のコード
const swiper = new Swiper(".hero-slider", {
  direction: "horizontal",
  loop: true,
  autoHeight: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".pagination-container .swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
