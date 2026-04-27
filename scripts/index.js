console.log('script connected');

// Fetch JSON
const getData = async (path) => {
  const res = await fetch(path);

  if (!res.ok) {
    throw new Error(`Failed to fetch ${path}`);
  }

  return await res.json();
};

// Toggle menu

const hamburger = document.getElementById('hamburger');
const navbarMiddle = document.getElementById('navbar-middle');
const navbarEnd = document.getElementById('navbar-end');

hamburger.addEventListener('click', () => {
  navbarMiddle.classList.toggle('active');
  navbarEnd.classList.toggle('active');
});

const menuItems = document.querySelectorAll(
  '#navbar-middle .menu-btn, #navbar-end button'
);

menuItems.forEach(item => {
  item.addEventListener('click', () => {
    navbarEnd.classList.remove('active');
    navbarMiddle.classList.remove('active');
  });
});

// Demo Videos 
const renderVideos = async () => {
  const data = await getData("./data/demo-videos.json");

  const businessContainer = document.getElementById("videos-for-busyness");
  const personalContainer = document.getElementById("videos-for-personal-brands");

  const businessVideos = data[0]["for-business"];
  const personalVideos = data[0]["for-personal-brands"];

  businessContainer.innerHTML = businessVideos.map(item => `
        <div class="video-card">
            <img src="${item.video}" />
            <div class="play-btn"><i class="fa-solid fa-play"></i></div>
            <h4>${item.type}</h4>
        </div>
    `).join("");

  personalContainer.innerHTML = personalVideos.map(item => `
        <div class="video-card">
            <img src="${item.video}" />
            <div class="play-btn"><i class="fa-solid fa-play"></i></div>
            <h4>${item.type}</h4>
        </div>
    `).join("");
};

// Reviews
const renderReviews = async () => {
  const data = await getData("./data/reviews.json");

  const videoContainer = document.querySelector(".video-reviews");
  const writtenContainer = document.querySelector(".written-reviews");

  const videoReviews = data[0]["video-reviews"];
  const writtenReviews = data[0]["written-reviews"];

  videoContainer.innerHTML = videoReviews.slice(0, 5).map(item => `
        <div class="video-review-card">
            <img src="${item.link || './assets/review-placeholder.jpg'}" />
            <div class="play-btn"><i class="fa-solid fa-play"></i></div>
            <div class="client-info">
                <h5>${item["clients-name"]}</h5>
                <p>${item["clients-designation"]}</p>
            </div>
        </div>
    `).join("");

  writtenContainer.innerHTML = writtenReviews.map(item => `
        <div class="written-card">
            <div class="top">
                <div>
                    <h5>${item["clients-name"]}</h5>
                    <p>${item["clients-designation"]}</p>
                </div>
                <span>⭐ (${item.star}.0)</span>
            </div>
            <p class="review">${item.review}</p>
        </div>
    `).join("");
};

// FAQ
const renderFAQ = async () => {
  const data = await getData("./data/FAQ.json");

  const container = document.getElementById("qna-section");
  const faqList = data[0]["FAQ"];

  container.innerHTML += `
        <div class="faq-container">
            ${faqList.map(item => `
                <div class="faq-item">
                    <div class="faq-question">
                        <h4>${item.quastion}</h4>
                        <button class="faq-toggle">+</button>
                    </div>
                    <div class="faq-answer hidden">
                        <p>${item.answer}</p>
                    </div>
                </div>
            `).join("")}
        </div>
    `;

  document.querySelectorAll(".faq-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      const answer = btn.parentElement.nextElementSibling;

      answer.classList.toggle("hidden");
      btn.textContent = answer.classList.contains("hidden") ? "+" : "−";
    });
  });
};

// INIT
renderVideos();
renderReviews();
renderFAQ();