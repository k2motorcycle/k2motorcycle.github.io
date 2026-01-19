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
    
    // データを取得
    let newsData = await response.json();

    // ▼【ここを追加】IDの小さい順（1, 2...）＝古い順に並び替える
    newsData.sort((a, b) => a.id - b.id);

    // 1. トップページ用の表示 (id="top-news-container")
    const topContainer = document.getElementById('top-news-container');
    if (topContainer) {
      // 並び替えた後のデータから先頭4つを表示
      const topNews = newsData.slice(0, 4);
      topContainer.innerHTML = topNews.map(item => `
        <article class="news-card">
          <a href="${item.url}">
            <div class="news-card-image-wrapper">
              <img src="${item.image}" alt="${item.title}">
            </div>
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

// フッターのアコーディオン開閉制御
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const item = header.parentElement;
    // 他の項目を閉じたい場合はここに追加処理が必要ですが、
    // 参考サイトのように複数開ける形式にしています
    item.classList.toggle('active');
  });
});
// 共通ヘッダー・フッターの読み込み関数
function loadCommonParts() {
  // ヘッダーを読み込む
  fetch('header-common.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header-placeholder').innerHTML = data;
      // 読み込み後にハンバーガーメニューのイベントを再設定
      initHamburger(); 
    });

  // フッターを読み込む
  fetch('footer-common.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer-placeholder').innerHTML = data;
      // 読み込み後にアコーディオンのイベントを再設定
      initFooterAccordion();
    });
}

// 既存のイベント設定を関数化して、読み込み後にも実行できるようにする
function initHamburger() {
  const hamburger = document.querySelector(".hamburger-icon");
  const navMenu = document.querySelector(".navigation-menu");
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }
}

function initFooterAccordion() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      header.parentElement.classList.toggle('active');
    });
  });
}

// ページ読み込み時に実行
document.addEventListener('DOMContentLoaded', loadCommonParts);