import {
  fetchOneMovieInfo,
  openModal,
  onBackDropClick,
  onEscKeyPress,
  onCloseModal,
  // updateQeueuButtonText,
  // updateWatchedButtonText,

} from './renderFilmModal';


export function createCards(data) {
  return data.results
    .map(
      ({ id, poster_path, title, original_title, release_date, genre_ids, overview }) => {
        return `<li class='film__card' id='${id}'>
  <a class='film__card__link'>
    <div class='film__card__thumb'>
      <img src='${getPosterPath(poster_path)}' alt='${title}' loading='lazy' />
      <div class='overlay'>
       
        <div class='overlay__content'>
          <p class='film__overlay__text'>${overview}</p>
          <button class='film__overlay__btn' type='button' id='${id}'>Read more</button>
        </div> 
        
      </div>
     
    </div> 
    <div class='film__card__text-wrapper'>
          <h2 class='film__card__title'>${original_title}</h2>
          <p class='film__card__text'>${getGenres(genre_ids)} | ${getYear(release_date)}</p>
        </div>
  </a>
</li>
      `;
      },
    )
    .join('');
}
document.addEventListener('click', function (event) {
  const filmCard = event.target.closest('.film__overlay__btn');
  if (filmCard) {
    const movieId = filmCard.getAttribute('id');
    fetchOneMovieInfo(movieId).then((data) => {
      openModal(data);
      const modal = document.querySelector('[data-modal]');
      modal.addEventListener('click', onBackDropClick);
      document.addEventListener('keydown', onEscKeyPress);
      const closeBtn = modal.querySelector('.film_modal__close-btn');
      closeBtn.addEventListener('click', onCloseModal);
      // updateQeueuButtonText(movieId);
      // updateWatchedButtonText(movieId);
    });
  }
});

export function getYear(release_date) {
  return release_date ? release_date.split('-')[0] : new Date().getFullYear();
}

export function getPosterPath(poster_path) {
  return `https://www.themoviedb.org/t/p/w500${poster_path}`;
}

export function getGenres(genre_ids) {
  let genres = [];
  if (genre_ids.length > 0) {
    for (let i = 0; i < genre_ids.length; i++) {
      switch (genre_ids[i]) {
        case 28:
          genres.push('Action');
          break;
        case 12:
          genres.push('Adventure');
          break;
        case 16:
          genres.push('Animation');
          break;
        case 35:
          genres.push('Comedy');
          break;
        case 80:
          genres.push('Crime');
          break;
        case 99:
          genres.push('Documentary');
          break;
        case 18:
          genres.push('Drama');
          break;
        case 10751:
          genres.push('Family');
          break;
        case 14:
          genres.push('Fantasy');
          break;
        case 36:
          genres.push('History');
          break;
        case 27:
          genres.push('Horror');
          break;
        case 10402:
          genres.push('Music');
          break;
        case 9648:
          genres.push('Mystery');
          break;
        case 10749:
          genres.push('Romance');
          break;
        case 878:
          genres.push('Science Fiction');
          break;
        case 10770:
          genres.push('TV Movie');
          break;
        case 53:
          genres.push('Thriller');
          break;
        case 10752:
          genres.push('War');
          break;
        case 37:
          genres.push('Western');
          break;
        default:
          break;
      }
    }
  }
  if (genres.length > 2) {
    genres = genres.slice(0, 2);
    genres.push('Other');
  }
  return genres.join(', ');
}



