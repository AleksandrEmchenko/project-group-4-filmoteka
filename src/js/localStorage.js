const WATCHED = 'WATCHED';
const QUEUE = 'QUEUE';

export function setToLocalStorage(event, data) {
  const localStorageKey = chooseStorage(event);
  let localStorageData = localStorage.getItem(localStorageKey);
  if (!localStorageData || localStorageData === '[]') {
    localStorage.setItem(localStorageKey, JSON.stringify([data]));
  } else {
    let updatedStorage = JSON.parse(localStorage.getItem(localStorageKey));
    updateStorageData(updatedStorage, data);
    localStorage.setItem(localStorageKey, JSON.stringify(updatedStorage));
  }
}

function chooseStorage(event) {
  if (event.target.innerText.includes(WATCHED)) {
    return WATCHED;
  }
  if (event.target.innerText.includes(QUEUE)) {
    return QUEUE;
  }
}

function updateStorageData(updatedStorage, data) {
  if (updatedStorage.includes(data)) {
    updatedStorage.push(data);
  } else {
    updatedStorage.splice(updatedStorage.indexOf(data), 1);
  }
}
