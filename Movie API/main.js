const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const resultsContainer = document.getElementById('results-container');
const paginationContainer = document.getElementById('pagination-container');
const loadingIndicator = document.getElementById('loading-indicator');
const errorMessage = document.getElementById('error-message');

let currentPage = 1;
const resultsPerPage = 6;
let totalResults = 0;

searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value.trim();
  if (searchTerm !== '') {
    searchMovies(searchTerm);
  }
});

searchInput.addEventListener('input', debounce(() => {
  const searchTerm = searchInput.value.trim();
  if (searchTerm !== '') {
    currentPage = 1; // Reset current page when search term changes
    searchMovies(searchTerm);
  } else {
    clearResults();
  }
}, 500));

async function searchMovies(searchTerm) {
  showLoadingIndicator();

  try {
    const movieData = {
      "Title": "Guardians of the Galaxy Vol. 2",
      "Year": "2017",
      "Rated": "PG-13",
      "Released": "05 May 2017",
      "Runtime": "136 min",
      "Genre": "Action, Adventure, Comedy",
      "Director": "James Gunn",
      "Writer": "James Gunn, Dan Abnett, Andy Lanning",
      "Actors": "Chris Pratt, Zoe Saldana, Dave Bautista",
      "Plot": "The Guardians struggle to keep together as a team while dealing with their personal family issues, notably Star-Lord's encounter with his father, the ambitious celestial being Ego.",
      "Language": "English",
      "Country": "United States",
      "Awards": "Nominated for 1 Oscar. 15 wins & 60 nominations total",
      "Poster": "https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg",
      "Ratings": [
        {
          "Source": "Internet Movie Database",
          "Value": "7.6/10"
        },
        {
          "Source": "Rotten Tomatoes",
          "Value": "85%"
        },
        {
          "Source": "Metacritic",
          "Value": "67/100"
        }
      ],
      "Metascore": "67",
      "imdbRating": "7.6",
      "imdbVotes": "719,971",
      "imdbID": "tt3896198",
      "Type": "movie",
      "DVD": "22 Aug 2017",
      "BoxOffice": "$389,813,101",
      "Production": "N/A",
      "Website": "N/A",
      "Response": "True"
    };

    totalResults = 1; // Hard-coded total results for the example movie data
    displayMovies([movieData]);
    displayPagination();
    clearErrorMessage();
  } catch (error) {
    displayErrorMessage('An error occurred while fetching movie data.');
  }

  hideLoadingIndicator();
}

function displayMovies(movies) {
  resultsContainer.innerHTML = '';

  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');
    movieCard.innerHTML = `
      <h2>${movie.Title}</h2>
      <p>${movie.Year}</p>
      <img src="${movie.Poster}" alt="${movie.Title} Poster">
      <p>${movie.Plot}</p>
    `;

    resultsContainer.appendChild(movieCard);
  });
}

function displayPagination() {
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  paginationContainer.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = i;
    pageButton.addEventListener('click', () => {
      currentPage = i;
      searchMovies(searchInput.value.trim());
    });
    paginationContainer.appendChild(pageButton);
  }
}

function clearResults() {
  resultsContainer.innerHTML = '';
  paginationContainer.innerHTML = '';
}

function showLoadingIndicator() {
  loadingIndicator.textContent = 'Loading...';
}

function hideLoadingIndicator() {
  loadingIndicator.textContent = '';
}

function displayErrorMessage(message) {
  errorMessage.textContent = message;
}

function clearErrorMessage() {
  errorMessage.textContent = '';
}

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
}
