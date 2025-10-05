const API_KEY = "e3bf3db7bef744668fe32ea806582217";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("India"));

function reload(){
    window.location.reload();
}
async function fetchNews(query) {
 try {
 const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
 const data = await res.json();
 bindData(data.articles);
 } catch (error) {
 console.error("Error fetching news:", error);
 }
}

function bindData(articles) {
 const cardsContainer = document.getElementById('cards-container');
 const newsCardTemplate = document.getElementById('template-news-card');

 // Clear previous cards
 cardsContainer.innerHTML = "";

 articles.forEach((article) => {
 // Check for a valid image URL and other required data
 if (!article.urlToImage ) return;

 const cardClone = newsCardTemplate.content.cloneNode(true);
 fillDataInCard(cardClone, article);
 cardsContainer.appendChild(cardClone);
 });
}

function fillDataInCard(cardClone, article) {
 const newsImg = cardClone.querySelector('.news-img');
 const newsTitle = cardClone.querySelector('#news-title');
 const newsSource = cardClone.querySelector('#news-source');
 const newsDesc = cardClone.querySelector('#news-desc');

 newsImg.src = article.urlToImage;
 newsTitle.innerHTML = article.title;
 newsDesc.innerHTML = article.description;

 const date = new Date(article.publishedAt).toLocaleString("en-US", {
 timeZone: "Asia/Jakarta"
 });

 newsSource.innerHTML = `${article.source.name} · ${date}`;

 // Add an event listener to open the article link
 cardClone.firstElementChild.addEventListener('click', () => {
 window.open(article.url, "_blank");
 });
}
let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

const searchButton =document.getElementById('search-button');
const searchText = document.getElementById('search-text');
searchButton.addEventListener("click",() =>{
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;
});