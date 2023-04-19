import { createCards } from './createCards';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

import filmApiService from './requests';
const getFilm = new filmApiService();

import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { reduce } from 'lodash';

const container = document.getElementById('tui-pagination-container');
const cont = document.querySelector('.gallery-list');

const searchFormEl = document.querySelector('.search-form');
const inputEl = document.getElementById('search');

if (searchFormEl !== null) {
  searchFormEl.addEventListener('submit', renderCardsFromRequest);
}
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
          options.visiblePages = 4;
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
            chengePaginationBtnStyle();

            return;
          });
        });
      }
      Loading.remove();

      chengePaginationBtnStyle();

      // if (cont !== null) {

      cont.insertAdjacentHTML('afterbegin', createCards(trendFilmData));
      // }
    });
  } catch {
    // Notify.warning('Oops! something went wrong');
    Loading.remove();
  }
}
/////////////////

async function renderCardsFromRequest(event) {
  event.preventDefault();
  const requestData = inputEl.value;
  
    if (requestData === '') {
    Notify.warning('Please enter your request');
    return;
  }
  
  let currentPage = 1;

  try {
    Loading.dots();
    await getFilm.getSearchKeyword(requestData, currentPage).then(filmData => {
       if (filmData.total_results === 0) {
        Notify.warning('Enter a more specific query!');
        cont.innerHTML = '';
        container.innerHTML = '';
        cont.insertAdjacentHTML('beforeend', renderErrorMsg());
        return;
      }
      
      cont.innerHTML = '';

      if (filmData.total_results === 0) {
        Notify.warning('Enter a more specific query!');
        cont.innerHTML = '';
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
          template: {
            page: '<a href="#" class="tui-page-btn">{{page}}</a>',
            currentPage: `<strong class="tui-page-btn tui-is-selected">{{page}}</strong>`,
            moveButton:
              '<a href="#" class="tui-page-btn tui-{{type}}">' +
              '<span class="tui-ico-{{type}}">{{type}}</span>' +
              '</a>',
            disabledMoveButton:
              '<span class="tui-page-btn  tui-is-disabled tui-{{type}}">' +
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
          options.visiblePages = 4;
        }
        const pagination = new Pagination(container, options, requestData);

        pagination.on('afterMove', event => {
          let currentPage = event.page;

          getFilm.getSearchKeyword(requestData, currentPage).then(filmData => {
            cont.innerHTML = '';

            chengePaginationBtnStyle();
            cont.insertAdjacentHTML('beforeend', createCards(filmData));

            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            });
          });
        });
      }
    });
    chengePaginationBtnStyle();
    Loading.remove();
  } catch {
    Notify.warning('Oops! something went wrong');
    Loading.remove();
  }
}

function chengePaginationBtnStyle() {
  const firstItem = document.querySelector('.tui-page-btn');
  // firstItem.classList.add('my-first-item-class');
  firstItem.style.cssText =
    'background-color: #F7F7F7; border-radius: 5px; font-weight:500;';

  const lastItem = document.querySelector('.tui-last');
  // lastItem.classList.add('my-first-item-class');
  lastItem.style.cssText = 'background-color: #F7F7F7; border-radius: 5px; ';

  const prevItem = document.querySelector('.tui-prev');
  const prevItemDis = document.querySelector('.tui-page-btn');
  // prevItem.classList.add('my-first-item-class');
  prevItem.style.cssText = 'background-color: #F7F7F7; border-radius: 5px; ';
  prevItemDis.style.cssText = 'background-color: #F7F7F7; border-radius: 5px;';

  const nextItem = document.querySelector('.tui-next');
  const nextItemDis = document.querySelector('.tui-page-btn');
  nextItem.style.cssText = 'background-color: #F7F7F7; border-radius: 5px;';
  nextItemDis.style.cssText = 'background-color: #F7F7F7; border-radius: 5px;';

  const nextTenLeft = document.querySelector('.tui-first-child');
  nextTenLeft.style.cssText = 'border-radius: 5px; ';

  const nextTenRight = document.querySelector('.tui-last-child');
  nextTenRight.style.cssText = 'border-radius: 5px;  ';

  const selectedItems = document.querySelector('.tui-is-selected');
  selectedItems.style.cssText =
    'border-radius: 5px; background: #B92F2C; border-color: #B92F2C;';

  const tuiThemMein = document.querySelector('.tui-pagination');
  tuiThemMein.style.cssText =
    'border-radius: 5px; border-width: 0px 0; font-weight:500;';
}
