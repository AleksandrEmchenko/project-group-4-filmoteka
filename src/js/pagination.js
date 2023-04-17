import { createCards } from './createCards';

import filmApiService from './requests';
const getFilm = new filmApiService();

import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
const container = document.getElementById('tui-pagination-container');

const cont = document.querySelector('.gallery-list');

const searchFormEl = document.querySelector('.search-form');
const inputEl = document.getElementById('search');

if (searchFormEl !== null) {
  searchFormEl.addEventListener('submit', renderCardsFromRequest);
}



function renderTrendCardsFilm() {
  getFilm.getTrendingMovie().then(trendFilmData => {
    createCards(trendFilmData);

    if (trendFilmData.total_pages > 1) {
      const options = {
        totalItems: trendFilmData.total_results,
        itemsPerPage: 20,
        visiblePages: 10,
        page: 1,
        centerAlign: false,
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

      const pagination = new Pagination(container, options);

      pagination.on('afterMove', event => {
        let currentPage = event.page;

        getFilm.getTrendingMovie(currentPage).then(filmData => {
          cont.innerHTML = '';

          cont.insertAdjacentHTML('afterbegin', createCards(filmData));
          return;
        });
      });
    }
    if (cont !== null) {
      cont.insertAdjacentHTML('afterbegin', createCards(trendFilmData));
    }

  });
}
renderTrendCardsFilm();

function renderCardsFromRequest(event) {
  event.preventDefault();
  const requestData = inputEl.value;
  let currentPage = 1;

  getFilm
    // .getSearchKeyword((eng = 'en-US'), requestData, currentPage)
    .getSearchKeyword(requestData, currentPage)
    .then(filmData => {
      cont.innerHTML = '';

      cont.insertAdjacentHTML('afterbegin', createCards(filmData));

      if (filmData.total_pages > 1) {
        const options = {
          totalItems: filmData.total_results,
          itemsPerPage: 20,
          visiblePages: 10,
          page: 1,
          centerAlign: false,
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
        const pagination = new Pagination(container, options, requestData);

        pagination.on('afterMove', event => {
          let currentPage = event.page;

          getFilm
            // .getSearchKeyword((eng = 'en-US'), requestData, currentPage)
            .getSearchKeyword(requestData, currentPage)
            .then(filmData => {
              cont.innerHTML = '';

              cont.insertAdjacentHTML('afterbegin', createCards(filmData));
            });
        });
      }
    });
}
