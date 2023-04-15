const refs = {
    openModalButton: document.querySelector('.js__modal-members-open'),
    closeModalButton: document.querySelector('.js__modal-members-close'),
    nextButton: document.querySelector('.js__next-button'),
    modalWindowBackdrop: document.querySelector('.js__members__backdrop'),
    modalWindow: document.querySelector('.js__modal-members'),
    modalWindowSlider: document.querySelector('.js__modal-slider'),
}

let pageNumber = 0;
const modalWidth = refs.modalWindow.clientWidth

refs.openModalButton.addEventListener('click', () => {
    refs.modalWindowBackdrop.classList.replace('members__backdrop--hidden', 'members__backdrop')
})

refs.closeModalButton.addEventListener('click', () => {
    refs.modalWindowBackdrop.classList.replace('members__backdrop', 'members__backdrop--hidden')
    setTimeout(() => {
        refs.modalWindowSlider.style.transform = `translateX(${0}px)`;
        refs.nextButton.textContent = 'NEXT'
    }, 500)
    pageNumber = 0
})

refs.nextButton.addEventListener('click', onSwitchModal)

function onSwitchModal() {
    pageNumber += 1
    if (pageNumber >= refs.modalWindowSlider.children.length) {
        refs.modalWindowBackdrop.classList.replace('members__backdrop', 'members__backdrop--hidden')
        setTimeout(() => {
            refs.modalWindowSlider.style.transform = `translateX(${0}px)`;
            refs.nextButton.textContent = 'NEXT';
        }, 500)
        pageNumber = 0
        return
    }

    if (pageNumber >= refs.modalWindowSlider.children.length - 1) {
        refs.nextButton.textContent = 'CLOSE'
    }
    refs.modalWindowSlider.style.transform = `translateX(-${modalWidth * pageNumber}px)`;
}