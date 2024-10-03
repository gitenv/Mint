const apiKey = 'df4e0ab4923f4ee6b2baff3e7f3bfb7c';
const newsContainer = document.getElementById('news-container');

// Fetch finance news from NewsAPI based on category
async function fetchNews(category) {
    let query = '';
    
    // Determine search query based on category
    switch (category) {
        case 'stock':
            query = 'stock market';
            break;
        case 'crypto':
            query = 'cryptocurrency';
            break;
        case 'economy':
            query = 'economy';
            break;
        case 'personal-finance':
            query = 'personal finance';
            break;
        default:
            query = 'finance';
    }

    try {
        const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`);
        //https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=df4e0ab4923f4ee6b2baff3e7f3bfb7c
        
        const data = await response.json();
        displayNews(data.articles);
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}

// Display news articles in the container
function displayNews(articles) {
    newsContainer.innerHTML = ''; // Clear previous news
    articles.forEach(article => {
        // Check if article has a description and an image
        if (article.description && article.urlToImage) {
            const newsItem = document.createElement('div');
            newsItem.classList.add('news-item');

            const newsImage = document.createElement('img');
            newsImage.src = article.urlToImage;
            newsItem.appendChild(newsImage);

            const newsContent = document.createElement('div');
            newsContent.classList.add('news-content');

            const newsTitle = document.createElement('h2');
            newsTitle.classList.add('news-title');
            newsTitle.innerText = article.title;
            newsContent.appendChild(newsTitle);

            const newsDescription = document.createElement('p');
            newsDescription.classList.add('news-description');
            newsDescription.innerText = article.description;
            newsContent.appendChild(newsDescription);

            const newsLink = document.createElement('a');
            newsLink.classList.add('news-link');
            newsLink.href = article.url;
            newsLink.innerText = 'Read more';
            newsLink.target = '_self';  // Open link in the same tab
            newsContent.appendChild(newsLink);

            newsItem.appendChild(newsContent);
            newsContainer.appendChild(newsItem);
        }
    });
}

// Initialize the news feed with default category (e.g., 'finance')
fetchNews('stock');


// Fetch and display the current day and date
function updateDate() {
    const dateElement = document.getElementById('current-date');
    const dayElement = document.getElementById('current-day');
  
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
  
    dateElement.innerText = today.toLocaleDateString(undefined, options);
    dayElement.innerText = today.toLocaleDateString(undefined, { weekday: 'long' });
  }
  
  // Fetch the weather based on the user's location
  function fetchWeather(latitude, longitude) {
    const apiKey = '17d2fe2b8147bb89242363b0fa99681d';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const locationElement = document.getElementById('location');
        const weatherDetailsElement = document.getElementById('weather-details');
  
        const location = data.name;
        const temperature = data.main.temp;
        const weather = data.weather[0].description;
  
        locationElement.innerText = `Location: ${location}`;
        weatherDetailsElement.innerText = `Weather: ${temperature}°C, ${weather}`;
      })
      .catch(error => console.error('Error fetching weather data:', error));
  }
  
  // Get the user's location using the Geolocation API
  function getLocationAndWeather() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude);
      }, (error) => {
        console.error('Error fetching location:', error);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }
  
  // Update the date and weather on page load
  document.addEventListener('DOMContentLoaded', () => {
    updateDate();
    getLocationAndWeather();
  });
  