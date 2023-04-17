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
    loader: document.querySelector('.loading-spinner--hide')
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
                for (film in filmsList) {
                    const filmData = getFilmData(filmsList[film])
                    console.log(filmData)
                    libraryRefs.moviesCollection.insertAdjacentHTML('beforeend', createCards(filmData)) 
                }
                
                
                loader.hide()
            } catch (error) {
                loader.hide()
                console.log(error)
            }
        }
        
        async function onRenderQueueFilms() {
            try {
                loader.show()
                const filmsList = await databaseAPI.getQueueFilms()
                for (film in filmsList) {
                    const filmData = getFilmData(filmsList[film])
                    console.log(filmData)
                    libraryRefs.moviesCollection.insertAdjacentHTML('beforeend', createCards(filmData))
                }
                loader.hide()
            } catch (error) {
                console.log(error)
                loader.hide()
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
    <li class="film__card" id="${data.id}">
        <a class="film__card__link">
            <img src="${getPosterPath(data.poster_path)}" alt="${data.title}" loading="lazy" />
            <h2>${data.original_title}</h2>
            <p>${getGenres(data.genres)} | ${getYear(data.release_date)}</p>
        </a>
    </li> 
    `
}

function getGenres(genres) {
    let genresArray = []
    for (genre in genres) {
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