const API_KEY = '351363cde76d5d5ccd40418b50fed610';
const modal = document.querySelector('[data-modal]');
const modalContent = document.querySelector('.film_modal-content');
const testButton = document.querySelector('.test_button');
 const modalWrap = document.querySelector('.modal__wrap');

testButton.addEventListener('click', makeModal);

function makeModal(event) {
    event.preventDefault()
    fetchOneMovieInfo(550).then((data) => {
        openModal(data);
        modal.addEventListener('click', onBackDropClick);
        document.addEventListener('keydown', onEscKeyPress);
        const closeBtn = modal.querySelector('.film_modal__close-btn');
        closeBtn.addEventListener('click', onCloseModal);
    });
}

function fetchOneMovieInfo(movie_id) {
  const url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => ({
      ...data,
        popularity: data.popularity.toFixed(2),
      
    }));
}

function renderMovieCard(data) {
  
    const { title, vote_count, popularity, original_title, overview, poster_path, genres, vote_average } =
        data;
    const genresFormatted = genres.map((genre) => genre.name).join(', ');
    const movieCardMarkup = `
    <img class="film_modal-img" src="${`https://www.themoviedb.org/t/p/w500${poster_path}`}" alt="${title}">
    <div class="film_modal-about">
      <h1 class="film_modal-title">${title}</h1>
      <div class="film_modal-info">
        <div class="film_modal__info-header">
          <p class="info-header">Vote<span> / </span>Votes</p>
          <p class="info-header">Popularity</p>
          <p class="info-header">Original Title</p>
          <p class="info-header">Genre</p>
        </div>
        <div class="film_modal__info-value">
          <p class="info-value">
            <span class="info-value__text avarange_vote">${vote_average.toFixed(2)}</span>
            <span>/</span>
            <span class="info-value__text">${vote_count}</span>
          </p>
          <p class="info-value">${popularity}</p>
          <p class="info-value">${original_title}</p>
          <p class="info-value">${genresFormatted}</p>
        </div>
      </div>
      <h2 class="film_modal-desc">ABOUT</h2>
      <p class="film_modal__desc-text">${overview}</p>
      <ul class="film_btn-list">
        <li class="film__btn-item">
          <button class="film_btn add-to-watched" type="button">Add to Watched</button>
        </li>
        <li class="film__btn-item">
          <button class="film_btn add-to-queue" type="button">Add to queue</button>
        </li>
      </ul>
    </div>`;

    modalWrap.insertAdjacentHTML('beforeend', movieCardMarkup);
}

function openModal(data) {
    modal.classList.remove('is-hidden');
    renderMovieCard(data);
}

function onCloseModal() {
  modal.classList.add('is-hidden');
  modalWrap.innerHTML = '';
  modal.removeEventListener('click', onBackDropClick);
  document.removeEventListener('keydown', onEscKeyPress);
}
  
  function onBackDropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
  modal.removeEventListener('click', onBackDropClick);
  document.removeEventListener('keydown', onEscKeyPress);
}
  
   function onEscKeyPress(event) {
    if (event.code !== 'Escape') {
      return;
    }
    window.removeEventListener('keydown', onEscKeyPress);
    onCloseModal();
}