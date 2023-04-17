import { createCards } from './createCards';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

import filmApiService from './requests';
const getFilm = new filmApiService();

import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const container = document.getElementById('tui-pagination-container');
const cont = document.querySelector('.gallery-list');

const searchFormEl = document.querySelector('.search-form');
const inputEl = document.getElementById('search');

searchFormEl.addEventListener('submit', renderCardsFromRequest);

renderTrendCardsFilm();

async function renderTrendCardsFilm() {
  try {
    await getFilm.getTrendingMovie().then(trendFilmData => {
      if (trendFilmData.total_pages > 1) {
        cont.innerHTML = '';
        const options = {
          totalItems: trendFilmData.total_results,
          itemsPerPage: 20,
          visiblePages: 9,
          page: 1,
          centerAlign: true,
          firstItemClassName: 'tui-first-child',
          lastItemClassName: 'tui-last-child',
          template: {
            page: '<a href="#" class="tui-page-btn">{{page}}</a>',
            currentPage: `<strong class="tui-page-btn tui-is-selected">{{page}}</strong>`,
            moveButton:
              '<a href="#" class="tui-page-btn tui-{{type}}">' +
              '<span class="tui-ico-{{type}}">{{type}}</span>' +
              '</a>',
            moreButton:
              '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
              '<span class="tui-ico-ellip">...</span>' +
              '</a>',
            disabledMoveButton:
              '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
              '<span class="tui-ico-{{type}}">{{type}}</span>' +
              '</span>',
          },
        };
        let windowWidth = document.documentElement.clientWidth;
        if (windowWidth < 768) {
          options.visiblePages = 5;
        }

        const pagination = new Pagination(container, options);
        pagination.on('afterMove', event => {
          let currentPage = event.page;
          getFilm.getTrendingMovie(currentPage).then(filmData => {
            cont.innerHTML = '';

            cont.insertAdjacentHTML('afterbegin', createCards(filmData));
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            });
            return;
          });
        });
      }
      Loading.remove();
      cont.insertAdjacentHTML('afterbegin', createCards(trendFilmData));
    });
  } catch {
    Notify.warning('Oops! something went wrong');
  }
}

/////////////////

async function renderCardsFromRequest(event) {
  event.preventDefault();
  const requestData = inputEl.value;
  let currentPage = 1;

  try {
    Loading.dots();
    await getFilm.getSearchKeyword(requestData, currentPage).then(filmData => {

      cont.innerHTML = '';

      if (filmData.total_results === 0) {
        Notify.warning('Enter a more specific query!');
        container.innerHTML = '';
        return;
      }
      cont.insertAdjacentHTML('beforeend', createCards(filmData));

      if (filmData.total_pages > 1) {
        const options = {
          totalItems: filmData.total_results,
          itemsPerPage: 20,
          visiblePages: 9,
          page: 1,
          centerAlign: true,
          firstItemClassName: 'tui-first-child',
          lastItemClassName: 'tui-last-child',
          template: {
            page: '<a href="#" class="tui-page-btn">{{page}}</a>',
            currentPage: `<strong class="tui-page-btn tui-is-selected">{{page}}</strong>`,
            moveButton:
              '<a href="#" class="tui-page-btn tui-{{type}}">' +
              '<span class="tui-ico-{{type}}">{{type}}</span>' +
              '</a>',
            disabledMoveButton:
              '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
              '<span class="tui-ico-{{type}}">{{type}}</span>' +
              '</span>',
            moreButton:
              '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
              '<span class="tui-ico-ellip">...</span>' +
              '</a>',
          },
        };
        let windowWidth = document.documentElement.clientWidth;

        if (windowWidth < 768) {
          options.visiblePages = 5;
        }
        const pagination = new Pagination(container, options, requestData);

        pagination.on('afterMove', event => {
          let currentPage = event.page;


          getFilm.getSearchKeyword(requestData, currentPage).then(filmData => {
            cont.innerHTML = '';


            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            });

            cont.insertAdjacentHTML('beforeend', createCards(filmData));
          });
        });
      }
    });
    Loading.remove();
  } catch {
    Notify.warning('Oops! something went wrong');
    Loading.remove();
  }
}
