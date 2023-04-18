import {RealtimeDataBaseAPI} from './firebaseDatabaseAPI';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getPosterPath } from './createCards';
import { getYear } from './createCards';
import app from './firebaseInit';
import { loaderSpinner } from './loaderSpinner';

const auth = getAuth(app);

const libraryRefs = {
    watchedButton: document.querySelector('.js__watched-button'),
    queueButton: document.querySelector('.js__queue-button'),
    moviesCollection: document.querySelector('.js__movies-collection'),
    loader: document.querySelector('.loading-spinner--hide'),
  picture: document.querySelector('.library-picture')
}



const paginationCont = document.querySelector('.tui-pagination')

const loader = new loaderSpinner(libraryRefs.loader, libraryRefs.moviesCollection)

onAuthStateChanged(auth, (user) => {
    if (user) {
        // IF USER SIGNED IN
        const uid = user.uid;

        const databaseAPI = new RealtimeDataBaseAPI(uid)

        onRenderWatchedFilms()


        if (libraryRefs.watchedButton !== null) {
            libraryRefs.watchedButton.addEventListener('click', onRenderWatchedFilms)
        }
        if (libraryRefs.queueButton !== null) {
            libraryRefs.queueButton.addEventListener('click', onRenderQueueFilms)
        }

        // RENDER MARKUP AND FETCH DATA FUNCTIONS
        async function onRenderWatchedFilms() {

            try {
                loader.show()
                const filmsList = await databaseAPI.getWatchedFilms()
                for (let film in filmsList) {
                    const filmData = getFilmData(filmsList[film])
                    console.log(filmData)
                    libraryRefs.moviesCollection.insertAdjacentHTML('beforeend', createCards(filmData))
                }


                loader.hide()
            } catch (error) {
                loader.hide()
                console.log(error)
            }
          if (libraryRefs.moviesCollection.children.length === 0) {
            libraryRefs.picture.classList.remove('visually-hidden')
          }
        }

        async function onRenderQueueFilms() {

            try {
                loader.show()
                const filmsList = await databaseAPI.getQueueFilms()
                for (let film in filmsList) {
                    const filmData = getFilmData(filmsList[film])
                    console.log(filmData)
                    libraryRefs.moviesCollection.insertAdjacentHTML('beforeend', createCards(filmData))
                }
                loader.hide()
            } catch (error) {
                console.log(error)
                loader.hide()
            }
          if (libraryRefs.moviesCollection.children.length === 0) {
            libraryRefs.picture.classList.remove('visually-hidden')
          }
        }

    } else {
        // IF USER SIGNED OUT
    }
})

function getFilmData(obj) {
    const firstKey = Object.keys(obj)[0];
    return obj[firstKey];
}

// ${getPosterPath(poster_path)}
// ${getGenres(genre_ids)}
// ${getYear(release_date)}

function createCards(data) {
    return `
    <li class='film__card' id='${data.id}'>
              <a class='film__card__link'>
              <div class='film__card__thumb'>
                <img src='${getPosterPath(data.poster_path)}' alt='${data.title}' loading='lazy' />
                <div class='film__card__text-wrapper'>
                <h2 class='film__card__title'>${data.original_title}</h2>
                <p class='film__card__text'>${getGenres(data.genres)} | ${getYear(data.release_date)}</p>
                <div class='overlay'>
                <p class='film__overlay__text'>${data.overview}</p>
                <button class='film__overlay__btn' type='button' id='${data.id}'>Read more</button>
                </div>
                </div>
                </div>
              </a>
          </li>
    `
}

function getGenres(genres) {
    let genresArray = []
    for (let genre in genres) {
        genresArray.push(genres[genre].name)
    }
    return genresArray.slice(0, 2)
}

// BUTTONS ACTIVE CHANGER

if (libraryRefs.watchedButton !== null) {
    libraryRefs.watchedButton.addEventListener('click', () => {
        libraryRefs.watchedButton.classList.add('active')
        libraryRefs.queueButton.classList.remove('active')
    })
}

if (libraryRefs.queueButton !== null) {
    libraryRefs.queueButton.addEventListener('click', () => {
        libraryRefs.watchedButton.classList.remove('active')
        libraryRefs.queueButton.classList.add('active')
    })
}

// LIBRARY PAG DISPLAY
if (libraryRefs.moviesCollection !== null) {
    if (libraryRefs.moviesCollection.children.length < 20) {
        paginationCont.style.display = 'none'
    }
}