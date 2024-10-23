const global = {
  currentTarget: window.location.pathname,
  search: {
    page: 1,
    totalPages: 1,
    type: '',
    term: '',
    totalResults : 0
  },
  api: {
    apiKey: '?api_key=6ee137a3fdfeb912ad74471aa44fdb05',
    apiURL: 'https://api.themoviedb.org/3/',
    bearer: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZWUxMzdhM2ZkZmViOTEyYWQ3NDQ3MWFhNDRmZGIwNSIsIm5iZiI6MTcyNTE5NjkxOS4zMjU2OTYsInN1YiI6IjY1OGM1MzQ1NWNkMTZlNmUyNGQyN2ZlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TodcVQu9WvL2ijTtfneLMY-BLIIjcKK0hM-VnciNN2I'
  }
}

// popular movies
async function displayPopularMovies() {
  const {results} = await fetchAPIData('movie/popular')
  results.forEach(movie => {
    const div = document.createElement('div')
    div.classList.add('card')
    div.innerHTML = `
       <a href="movie-details.html?id=${movie.id}">
         ${movie.poster_path ? `
          <img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt=${movie.title}
            />    
      ` :
        ` <img
      src="images/no-image.jpg"
      class="card-img-top"
      alt="${movie.title}"
    />`
    
      }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>
    `;
    document.getElementById('popular-movies').appendChild(div)
  })
}

async function displayPopularShows() {
  
  const {results} = await fetchAPIData('tv/popular')
  
  results.forEach(show => {
    const div = document.createElement('div')
    div.classList.add('card')
    div.innerHTML = `
       <a href="tv-details.html?id=${show.id}">
         ${show.poster_path ? `
          <img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt=${show.name}
            />    
      ` :
        ` <img
      src="images/no-image.jpg"
      class="card-img-top"
      alt="${show.name}"
    />`
    
      }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">First Air: ${show.first_air_date}</small>
            </p>
          </div>
    `;
    document.getElementById('popular-shows').appendChild(div)
  })
}

// Diplay Movies Details

async function moviesDetails() {
  const movieID = window.location.search.split('=')[1]
 
  const movie = await fetchAPIData(`movie/${movieID}`)

  displayBackgroundImages('movie', movie.backdrop_path)

  const div = document.createElement('div')

  div.innerHTML = `
  <div class="details-top">
          <div>
           ${movie.backdrop_path ?
      `
             <img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.title}"
            />
            ` :
      `         <img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${movie.title}"
            />
            `
    }
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
             ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
             ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${numberWithCommas(movie.budget)} </li>
            <li><span class="text-secondary">Revenue:</span> $${numberWithCommas(movie.revenue)}</li>
            <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${movie.production_companies.map((company) => `<span>${company.name}</span>`)}</div>
        </div>
  `

 document.getElementById('movie-details').appendChild(div)
  
  
}
// Diplay TV Details

async function tvDetails() {
  const showID = window.location.search.split('=')[1]

  const show = await fetchAPIData(`tv/${showID}`)

  displayBackgroundImages('tv', show.backdrop_path)

  const div = document.createElement('div')

  div.innerHTML = `
      <div class="details-top">
          <div>
           ${show.backdrop_path ? 
    
             `
              <img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="Show Name"
            />
              ` :  
            `
            <img
      src="images/no-image.jpg"
      class="card-img-top"
      alt="${show.name}"
              `
           }
          </div>
          <div>
            <h2>${show.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${show.vote_average} / 10
            </p>
            <p class="text-muted">First Air Date: ${show.first_air_date}</p>
            <p>
             ${show.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${show.genres.map(genre => `<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="${show.hompage}" target="_blank" class="btn">Visit Show Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number Of Episodes:</span> ${show.number_of_episodes}</li>
            <li>
              <span class="text-secondary">Last Episode To Air:</span> ${show.last_episode_to_air.name}
            </li>
          
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${show.production_companies.map(company => `<span>${company.name}</span>`)}</div>
        </div>
  `
 document.getElementById('show-details').appendChild(div)
  
  
}

// Search request from the input 
async function search() {
  // Get queryString part of the URL
  const queryString = window.location.search
  // Get the URLparams the type and the input text
  const urlParams = new URLSearchParams(queryString)
  // Get the type and the input text by the get method
  // get the type which is movie or tv - put it in the global variable
  global.search.type = urlParams.get('type')
  global.search.term = urlParams.get('search-term')

  
  // Check if the value is not empty or equal to null with a custo alert
  if (global.search.term !== '' && global.search.term !== null) {
    const { results, total_pages, page, total_results } = await searchApiData()

    global.search.page = page
    global.search.totalResults = total_results
    global.search.totalPages = total_pages

    console.log(global.search.totalPages);
    
    
    
    if (results.length === 0) {
      return alert('No result fund')
    }
    displaySearchResults(results)
  } else {
    showAlert('Please enter a search item', 'error')
  }
  
}

function displaySearchResults(results) {
 document.getElementById('search-results').innerHTML = ''
 document.getElementById('search-results-heading').innerHTML = ''
 document.getElementById('pagination').innerHTML = ''
  
  results.forEach(result => {
    const div = document.createElement('div')
    div.classList.add('card')
    div.innerHTML = `
       <a href="movie-details.html?id=${result.id}">
         ${result.poster_path ? `
          <img
              src="https://image.tmdb.org/t/p/w500${result.poster_path}"
              class="card-img-top"
              alt=${global.search.type ? result.title : result.name}
            />    
      ` :
        ` <img
      src="images/no-image.jpg"
      class="card-img-top"
      alt="${global.search.type ? result.title : result.name}"
    />`
    
      }
          </a>
          <div class="card-body">
            <h5 class="card-title">${global.search.type ? result.title : result.name}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${global.search.type ? result.release_date : result.first_air_date}</small>
            </p>
          </div>
    `;

    document.getElementById('search-results-heading').innerHTML = `
      <h2>${results.length} of ${global.search.totalResults} of ${global.search.term}</h2>
    `
    document.getElementById('search-results').appendChild(div)
  })

  displayPaginantion()
    
  
}

// create and display imagination

function displayPaginantion() {
  const div = document.createElement('div')
  div.classList.add('pagination')
  div.innerHTML = `
    <button class="btn btn-primary" id="prev">Prev</button>
          <button class="btn btn-primary" id="next">Next</button>
          <div class="page-counter">Page ${global.search.page} of ${global.search.totalResults}</div>
  `
  document.getElementById('pagination').appendChild(div)

  // Disable preview button in page 1
  if (global.search.page === 1) {
    document.getElementById('prev').disabled = true
  }

   // Disable next button in total result
   if (global.search.page === global.search.totalPages) {
    document.getElementById('next').disabled = true
  }

  // add event listener to next so as to increase the page and also move into next search term

  document.getElementById('next').addEventListener('click', async () => {
    global.search.page++;
    const {results} = await searchApiData()
    displaySearchResults(results)
      
  })
  // add event listener to next so as to decrease the page and also move into prev search term

  document.getElementById('prev').addEventListener('click', async () => {
    global.search.page--;
    const {results} = await searchApiData()
    displaySearchResults(results)
      
  })

}
// Overlay background images

function displayBackgroundImages(type, backdropath) {
  const overlayDiv = document.createElement('div')
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${backdropath})`
  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.height = '100vh';
  overlayDiv.style.width = '100vw';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.zIndex = '-1';
  overlayDiv.style.opacity = '0.1';

  if (type === 'movie') {
    document.getElementById('movie-details').appendChild(overlayDiv)
  } else {
    document.getElementById('show-details').appendChild(overlayDiv)
  }
}
// Movie Now Playing

async function displaySlider() {
  const {results} = await fetchAPIData(`movie/now_playing`)
  
  results.forEach(movie => {
    const div = document.createElement('div')
    div.classList.add('swiper-slide')
    div.innerHTML = `
      <a href="movie-details.html?id=${movie.id}">
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="Movie Title" />
            </a>
            <h4 class="swiper-rating">
              <i class="fas fa-star text-secondary"></i> ${movie.vote_count.toFixed(1)} / 10
            </h4>
          </div>
    `
    document.querySelector('.swiper-wrapper').appendChild(div)
    initSwiper()
    
  })
  
}
function initSwiper() {
  const swiper = new Swiper('.swiper', { 
   loop:true,
    spaceBetween: 30,
    slidesPerView: 1,
    freeMode: true,
    autoplay: {
      delay:4000,
      disableOnInteraction:false
    },
    breakpoints: {
      500: {
        slidesPerView: 2
      },
      700: {
        slidesPerView:3
      },
      1200: {
        slidesPerView: 4
      }
    }

  })
}
// serach API DATA
async function searchApiData() {
  const API_URL = global.api.apiURL
  const API_KEY = global.api.apiKey
  const API_AUTHO = global.api.bearer
  

  try {
   showSpinner()
   const res = await fetch(`${API_URL}search/${global.search.type}?query=${global.search.term}&page=${global.search.page}`, {
    method: 'GET',
    headers: {
      'Authorization': `${API_AUTHO}`,  
      'accept': 'application/json'
    }
  });
    



   if (!res.ok) {
     throw new Error(`Request Failed with status: ${res.status}`)
   }
    const data = await res.json()
    hideSpinner()
   return data
 } catch (error) {
  console.log('Error:', error);
 }
}
// Fetch API DATA FROM MOVIES DATA

async function fetchAPIData(endpoint) {
  const API_URL = global.api.apiURL
  const API_KEY= global.api.apiKey
  

  try {
   showSpinner()
   const res = await fetch(`${API_URL}${endpoint}${API_KEY}`)
   if (!res.ok) {
     throw new Error(`Request Failed with status: ${res.status}`)
   }
    const data = await res.json()
    hideSpinner()
   return data
 } catch (error) {
  console.log('Error:', error);
 }
}
// Create a Custom ALert

function showAlert(message, className) {
  const showEl = document.createElement('div')
  showEl.classList.add('alert', className)
  showEl.appendChild(document.createTextNode(message))

  const alert = document.getElementById('alert')
  alert.appendChild(showEl)

  setTimeout(() => alert.remove(), 3000)
}

function numberWithCommas(number) {
  number = number.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(number))
      number = number.replace(pattern, "$1,$2");
  return number;
} 
// SHow & hide spinner
function showSpinner() {
  document.querySelector('.spinner').classList.add('show')
}
function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show')
}

function highlightLinks() {
  const links = document.querySelectorAll('.nav-link')
  links.forEach(link => {
    if (link.getAttribute('href') === global.currentTarget) {
      link.classList.add('active')
    }
  })
}

function initApp() {
  switch (global.currentTarget) {
    case '/':
    case '/index.html':
      displayPopularMovies()
      displaySlider()
      break;
    case '/shows.html':
    displayPopularShows();
    break
    case '/tv-details.html':
      tvDetails()
      break
    case '/movie-details.html':
      moviesDetails()
      break
    case '/search.html':
      search();
      break
  }
       
  highlightLinks()
}



document.addEventListener('DOMContentLoaded', initApp)