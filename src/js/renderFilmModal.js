import { setToLocalStorage } from './localStorage';
import { RealtimeDataBaseAPI } from './firebaseDatabaseAPI';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from './firebaseInit';

const auth = getAuth(app);

const API_KEY = '351363cde76d5d5ccd40418b50fed610';
const modal = document.querySelector('[data-modal]');
const modalWrap = document.querySelector('.modal__wrap');

export async function fetchOneMovieInfo(movie_id) {
  const url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  return {
    ...data,
    popularity: data.popularity.toFixed(2)
  };
}

export function renderMovieCard(data) {
  const { title, vote_count, popularity, original_title, overview, poster_path, genres, vote_average } =
    data;
  const genresFormatted = genres.map((genre) => genre.name).join(', ');
  const movieCardMarkup = `
  
    <img class="film_modal-img" src="${`https://www.themoviedb.org/t/p/w500${poster_path}`}" alt="${title}">
    <div class="film_modal-about">
      <h1 class="film_modal-title">${title}</h1>
      <div class="film_modal-info">
        <div class="film_modal__info-header">
          <p class="info-header">Vote<span>/</span>Votes</p>
          <p class="info-header">Popularity</p>
          <p class="info-header ">Original Title</p>
          <p class="info-header">Genre</p>
        </div>
        <div class="film_modal__info-value">
          <p class="info-value">
            <span class="info-value__text avarange_vote">${vote_average.toFixed(2)}</span>
            <span>/</span>
            <span class="info-value__text">${vote_count}</span>
          </p>
          <p class="info-value">${popularity}</p>
          <p class="info-value original-title">${original_title}</p>
          <p class="info-value">${genresFormatted}</p>
        </div>
      </div>
      <h2 class="film_modal-desc">ABOUT</h2>
      <p class="film_modal__desc-text">${overview}</p>
      <ul class="film_btn-list">
            <li class="film__btn-item">
                <button class="film_btn added add-to-watched" type="button">Add to Watched</button>
            </li>
            <li class="film__btn-item">
                <button class="film_btn add-to-queue" type="button">Add to queue</button>
            </li>
        </ul>
      
    </div>`;

  modalWrap.insertAdjacentHTML('beforeend', movieCardMarkup);

  const avarangeVote = document.querySelector('.avarange_vote');
  if (vote_average >= 5) {
    avarangeVote.classList.add('good-rated')
  } else {
    avarangeVote.classList.add('bad-rated')
  }

  const addToWatchedBtn = document.querySelector('.add-to-watched');
  const addToQueueBtn = document.querySelector('.add-to-queue');
  addToWatchedBtn.addEventListener('click', (event) => setToLocalStorage(event, data));
  addToQueueBtn.addEventListener('click', (event) => setToLocalStorage(event, data));
  addToQueueBtn.addEventListener('click', function() {
      updateQeueuButtonText(data.id);
    });
  addToWatchedBtn.addEventListener('click', function () {
    updateWatchedButtonText(data.id)
})
}

export function openModal(data) {
    modal.classList.remove('is-hidden');
    renderMovieCard(data);
}

export function onCloseModal() {
  modal.classList.add('is-hidden');
  
  modal.removeEventListener('click', onBackDropClick);
  document.removeEventListener('keydown', onEscKeyPress);
  modalWrap.innerHTML = '';
}

export function onBackDropClick(event) {
  if (event.currentTarget === event.target) {
  modal.classList.add('is-hidden');
  
  modal.removeEventListener('click', onBackDropClick);
    document.removeEventListener('keydown', onEscKeyPress);
    modalWrap.innerHTML = '';
  }
  return;
}

export function onEscKeyPress(event) {
  if (event.code !== 'Escape') {
    return;
  }
  
  modal.classList.add('is-hidden');
  modal.removeEventListener('click', onBackDropClick);
  document.removeEventListener('keydown', onEscKeyPress);
  modalWrap.innerHTML = '';  
}


export function updateQeueuButtonText(id) {
  const addToQueueBtn = document.querySelector('.add-to-queue');
  const localstorage = localStorage.getItem('QUEUE');
  if (localstorage === null) {
    addToQueueBtn.textContent = 'Add to queue';
    return;
  }
  if (JSON.parse(localstorage.includes(id))) {
    addToQueueBtn.textContent = 'Remove from queue';
  } else {
    addToQueueBtn.textContent = 'Add to queue';
  }
}

export function updateWatchedButtonText(id) {
  const addToWatchedBtn = document.querySelector('.add-to-watched');
  const localstorageWatched = localStorage.getItem('WATCHED');

  if (localstorageWatched === null) {
    addToWatchedBtn.textContent = 'Add to watched';
    return;
  }
  if (JSON.parse(localstorageWatched.includes(id))) {
    addToWatchedBtn.textContent = 'Remove from watched';
  } else {
    addToWatchedBtn.textContent = 'Add to watched';
  }
}


onAuthStateChanged(auth, (user) => {
  if (user) {
      // IF USER SIGNED IN
      const uid = user.uid;
      const databaseAPI = new RealtimeDataBaseAPI(uid)
      console.log(databaseAPI)

      // ADD LISTENERS TO BUTTONS "ADD TO WATCHED", "ADD TO QUEUE" WITH ACTIONS "databaseAPI.addToWatched(film)" and "databaseAPI.addToQueue(film)"
      

  } else {
      // IF USER SIGNED OUT
  }
})


