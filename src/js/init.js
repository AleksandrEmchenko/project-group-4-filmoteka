import filmApiService from "./requests";
import { createCards } from "./createCards";
const filmApi = new filmApiService

const gallery = document.querySelector('.gallery-list')
filmApi.getTrendingMovie()
.then(filmsData => {
    const galleryFilms = createCards(filmsData)
    gallery.innerHTML = galleryFilms
})
.catch(error => {
    console.log(error)
})