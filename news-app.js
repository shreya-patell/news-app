const API_KEY = '47e953a6e4be47e7b0f9a1aea1ecaffb';
const BASE_URL = 'https://newsapi.org/v2/everything';

const form = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const articlesDiv = document.getElementById('articles');

async function fetchNews(query) {
  try {
    const response = await fetch(`${BASE_URL}?q=${query}&apiKey=${API_KEY}`);
    const data = await response.json();

    if (data.articles && data.articles.length > 0) {
      displayArticles(data.articles);
    } else {
      articlesDiv.innerHTML = '<p>No articles found. Try a different search term.</p>';
    }
  } catch (error) {
    console.error('Error fetching news:', error);
    articlesDiv.innerHTML = '<p>Unable to fetch news. Please try again later.</p>';
  }
}

function displayArticles(articles) {
  articlesDiv.innerHTML = '';
  articles.forEach(article => {
    const articleDiv = document.createElement('div');
    articleDiv.className = 'article';

    articleDiv.innerHTML = `
      <img src="${article.urlToImage || 'https://via.placeholder.com/300'}" alt="Article Image">
      <h3>${article.title}</h3>
      <p>${article.description || 'No description available.'}</p>
      <a href="${article.url}" target="_blank">Read More</a>
    `;
    articlesDiv.appendChild(articleDiv);
  });
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const query = searchInput.value.trim();
  if (query) {
    fetchNews(query);
  }
});
