// ハンバーガーメニュー用のコード
const hamburger = document.querySelector(".hamburger-icon");
const main = document.querySelector("main");
const navMenu = document.querySelector(".navigation-menu");

if (main && navMenu) {
  main.addEventListener("click", () => {
    if (navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
    }
  });
}

if (hamburger) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
}

// ヒーロースライダー用のコード（安全策を追加）
// クラス名 ".hero-slider" が存在する時だけ実行する
const heroSliderElement = document.querySelector(".hero-slider");
if (heroSliderElement) {
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
}

// ニュースデータを読み込んで表示する関数
async function loadNews() {
  try {
    const response = await fetch('./news.json');
    if (!response.ok) throw new Error('Network response was not ok');
    
    const newsData = await response.json();

    // 1. トップページ用の表示 (id="top-news-container")
    const topContainer = document.getElementById('top-news-container');
    if (topContainer) {
      const topNews = newsData.slice(0, 4);
      topContainer.innerHTML = topNews.map(item => `
        <article class="news-card">
          <a href="${item.url}">
            <img src="${item.image}" alt="${item.title}">
            <div class="news-card-always-visible">
              <time>${item.date}</time>
              <h3 class="news-title">${item.title}</h3>
            </div>
            <div class="news-card-content">
              <p>${item.summary}</p>
            </div>
          </a>
        </article>
      `).join('');
    }

    // 2. ニュース一覧ページ用の表示 (id="all-news-container")
    const allContainer = document.getElementById('all-news-container');
    if (allContainer) {
      allContainer.innerHTML = newsData.map(item => `
        <article class="news-grid-item">
          <a href="${item.url}">
            <div class="news-image-container">
              <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="news-grid-content">
              <time class="news-date">${item.date}</time>
              <h3 class="news-title-small">${item.title}</h3>
            </div>
          </a>
        </article>
      `).join('');
    }
  } catch (error) {
    console.error('ニュースの読み込みに失敗しました:', error);
  }
}

// ページ読み込み時に実行
document.addEventListener('DOMContentLoaded', loadNews);