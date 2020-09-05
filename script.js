
const APIURL = 'https://api.themoviedb.org/3/discover/movie?api_key=096a8f27ba37517c7440bf4f99d983d2&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1'

const IMGPATH = 'https://image.tmdb.org/t/p/w1280';

const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?api_key=096a8f27ba37517c7440bf4f99d983d2&language=en-US&query='

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');


getMovies(APIURL);

async function getMovies(url) {
  const resp = await fetch(url);
  const respData = await resp.json();
  // console.log(respData);
  
  // respData.results.forEach(movie => {
  //   const { poster_path, title, vote_average} = movie;

  //   const movieEl = document.createElement('div');
  //   movieEl.classList.add('movie');

  //   movieEl.innerHTML =`  
  //       <img 
  //       src="${IMGPATH + poster_path}"
  //       alt="${title}"
  //       />
  //       <div class="movie-info">
  //           <h3>${title}</h3>
  //           <span class="${getClassByRate(vote_average)}">${vote_average}</span>

  //       </div>`;
        
  //     main.appendChild(movieEl);
      
  // });

    showMovies(respData.results);
  
  return respData;
}

function showMovies(movies) {

  main.innerHTML = "";

  movies.forEach(movie => {
    const { poster_path, title, vote_average, overview} = movie;

    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');

    movieEl.innerHTML =`  
        <img 
        src="${IMGPATH + poster_path}"
        alt="${title}"
        />
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>

        </div>
        <div class="overview">
            <h4>Overview :</h4>
          ${overview}
        </div>`;
        
      main.appendChild(movieEl);
  });

}

function getClassByRate(vote) {
  if(vote >= 8) {
    return 'green'
  } else if (vote >=5){
      return 'orange';
  } else {
    return 'red';
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if(searchTerm) {
    getMovies(SEARCHAPI + searchTerm)

    search.value = "";
  }

});


