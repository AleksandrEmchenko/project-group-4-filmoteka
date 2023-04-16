const refs = {
    modalWindow: document.querySelector('.js__modal-window'),
    openModalBtn: document.querySelector('.js__auth-modal-open'),
    closeModalBtn: document.querySelector('.js__auth-modal-close'),

    modalsList: document.querySelector('.js__auth__modals'),
    authAlternativeMsg: document.querySelector('.js__auth-message'),
    authAlternativeBtn: document.querySelector('.js__auth-alternative-btn'),

    signInForm: document.querySelector('.js__form-sign-in'),
    signUpForm: document.querySelector('.js__form-sign-up'),
}

// Modal Open
refs.openModalBtn.addEventListener('click', () => {
    refs.modalWindow.classList.replace('auth__backdrop--hidden', 'auth__backdrop')
    refs.signInForm.reset()
    refs.signUpForm.reset()
})

// Modal Close
refs.closeModalBtn.addEventListener('click', () => {
    refs.modalWindow.classList.replace('auth__backdrop', 'auth__backdrop--hidden')
    refs.signInForm.reset()
    refs.signUpForm.reset()
})

const formWidth = refs.modalsList.clientWidth
let isSingIn = true

refs.authAlternativeBtn.addEventListener('click', onSwitchForm)

function onSwitchForm() {

    refs.signInForm.reset()
    refs.signUpForm.reset()

    if(isSingIn === true) {
        refs.modalsList.style.transform = `translateX(-${formWidth}px)`;
        isSingIn = false
        refs.authAlternativeMsg.textContent = 'ALREADY HAVE AN ACCOUNT?';
        refs.authAlternativeBtn.textContent = 'Sign in'
        return
    }

    refs.modalsList.style.transform = `translateX(${0}px)`;
    refs.authAlternativeMsg.textContent = 'NOT REGISTERED?';
    refs.authAlternativeBtn.textContent = 'Sign up'
    isSingIn = true
}