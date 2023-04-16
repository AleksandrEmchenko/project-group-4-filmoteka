import {RealtimeDataBaseAPI} from './firebaseDatabaseAPI';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from './firebaseInit';

console.log("WORK")

const filmOne = {
    id: '1', 
    poster_path: '', 
    title: 'filmOne', 
    original_title: 'filmOne', 
    release_date: '', 
    genre_ids: '',
}

const filmSecond = {
    id: '2', 
    poster_path: '', 
    title: 'filmSecond', 
    original_title: 'filmSecond', 
    release_date: '', 
    genre_ids: '',
}

const filmThird = {
    id: '3', 
    poster_path: '', 
    title: 'filmThird', 
    original_title: 'filmThird', 
    release_date: '', 
    genre_ids: '',
}


const auth = getAuth(app);

const libraryRefs = {
    watchedButton: document.querySelector('.js__watched-button'),
    queueButton: document.querySelector('.js__queue-button'),
    moviesCollection: document.querySelector('.js__movies-collection'),
}


onAuthStateChanged(auth, (user) => {
    if (user) {
        // IF USER SIGNED IN
        const uid = user.uid;
        const databaseAPI = new RealtimeDataBaseAPI(uid)

        if (libraryRefs.watchedButton !== null) {
            libraryRefs.watchedButton.addEventListener('click', onRenderWatchedFilms)
        }
        if (libraryRefs.queueButton !== null) {
            libraryRefs.queueButton.addEventListener('click', onRenderQueueFilms)
        }

        // RENDER MARKUP AND FETCH DATA FUNCTIONS
        async function onRenderWatchedFilms() {
            try {
                const filmsList = await databaseAPI.getWatchedFilms()
                for(key in filmsList) {
                    console.log(key)
                }
            } catch (error) {
                console.log(error)
            }
        }
        
        async function onRenderQueueFilms() {
            try {
                const filmsList = await databaseAPI.getQueueFilms()
                for(key in filmsList) {
                    console.log(key)
                }
            } catch (error) {
                console.log(error)
            }
        }

    } else {
        // IF USER SIGNED OUT
    }
})

function getFilmData(filmObj) {
    const keys = Object.keys(filmObj)
    return filmObj[keys[0]]
}

function createCards(data) {
    return data.results
        .map(
        ({ id, poster_path, title, original_title, release_date, genre_ids }) => {
            return `<li class="film__card" id="${id}">
                <a class="film__card__link">
                    <img src="${getPosterPath(
                    poster_path
                    )}" alt="${title}" loading="lazy" />
                    <h2>${original_title}</h2>
                    <p>${getGenres(genre_ids)} | ${getYear(release_date)}</p>
                </a>
            </li>
            `;
            }
        )
    .join("");
}



