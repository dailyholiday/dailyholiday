import {
  getFirestore,
  collection,
  getDocs,
  orderBy,
  query,
  limit,
  startAfter
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";
import { getApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";

const app = getApp();
const db = getFirestore(app);

const articlesList = document.getElementById("articles-list");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const noMoreMsg = document.getElementById("noMoreMsg");

const modal = document.getElementById("articleModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalContent = document.getElementById("modalContent");
const modalClose = document.getElementById("modalClose");

let lastVisible = null;
let loading = false;
let articlesEnded = false;

// === Fetch Articles from Firestore ===
async function fetchArticles(initial = false) {
  if (loading || articlesEnded) return;
  loading = true;

  let q;
  if (initial) {
    q = query(collection(db, "articles"), orderBy("date", "desc"), limit(6));
  } else {
    q = query(
      collection(db, "articles"),
      orderBy("date", "desc"),
      startAfter(lastVisible),
      limit(6)
    );
  }

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    articlesEnded = true;
    loadMoreBtn.style.display = "none";
    noMoreMsg.style.display = "block";
    loading = false;
    return;
  }

  lastVisible = snapshot.docs[snapshot.docs.length - 1];

  snapshot.forEach((doc) => {
    const article = doc.data();
    renderArticleCard(article);
  });

  loading = false;
}

// === Render Article Card ===
function renderArticleCard(article) {
  const card = document.createElement("div");
  card.classList.add("article-card");

  card.innerHTML = `
    <img src="${article.imageURL || "https://via.placeholder.com/300x200"}" alt="${article.title}">
    <div class="article-card-content">
      <h3>${article.title}</h3>
      <p>${truncateText(article.summary || stripHTML(article.content), 100)}</p>
    </div>
  `;

  card.addEventListener("click", () => openModal(article));
  articlesList.appendChild(card);
}

// === Open Modal ===
function openModal(article) {
  modalImage.src = article.imageURL || "https://via.placeholder.com/600x400";
  modalTitle.textContent = article.title;
  modalContent.innerHTML = article.content;

  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

// === Close Modal ===
modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

function closeModal() {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

// === Helper Functions ===
function truncateText(text, length) {
  return text.length > length ? text.substring(0, length) + "..." : text;
}

function stripHTML(html) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || "";
}

// === Load More Button ===
loadMoreBtn.addEventListener("click", () => fetchArticles(false));

// === Initial Load ===
fetchArticles(true);
