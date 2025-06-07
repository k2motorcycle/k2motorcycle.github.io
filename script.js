// 1. 操作したいHTML要素を取得する
const hamburger = document.querySelector('.hamburger-icon');
const navMenu = document.querySelector('.navigation-menu');

// 2. ハンバーガーアイコンがクリックされたときの処理を設定する
hamburger.addEventListener('click', () => {
  // navMenuに 'active' というクラスを付けたり外したりする
  navMenu.classList.toggle('active');
});