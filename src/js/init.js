import filmApiService from "./requests";
import { createCards } from "./createCards";
import { Notify } from "notiflix";

const filmApi = new filmApiService

const gallery = document.querySelector('.gallery-list')
filmApi.getTrendingMovie()
.then(filmsData => {
    const galleryFilms = createCards(filmsData)
    gallery.innerHTML = galleryFilms
})
.catch(error => {

    Notify.failure('No list of movies found')

})