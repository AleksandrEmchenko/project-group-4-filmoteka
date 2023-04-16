import { Notify } from 'notiflix/build/notiflix-notify-aio';

import app from './firebaseInit'

// FIREBASE AUTH INIT
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, deleteUser, signOut, signOut } from "firebase/auth";
const auth = getAuth(app);

// Refs for FIREBASE auth
const refs = {
    signInForm: document.querySelector('.js__form-sign-in'),
    signUpForm: document.querySelector('.js__form-sign-up'),
    singInButton: document.querySelector('[data-sign-in]'),
    signUpButton: document.querySelector('[data-sign-up]'),

    modalWindow: document.querySelector('.js__modal-window'),
    
}

const pageRefs = {
    libraryButton: document.querySelector('.js__library-button'),
    openAuthModalButton: document.querySelector('.js__auth-modal-open'),
}

const authRefs = {
    authSettingsList: document.querySelector('.js__auth-settings'),
    deleteUserButton: document.querySelector('.js__delete-user'),
    signOutButton: document.querySelector('.js__sign-out'),
}

// SIGN UP USER WITH FORM DATA
refs.signUpForm.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(refs.signUpForm)

    const userName = formData.get('userName')
    const userEmail = formData.get('userEmail')
    const userPassword = formData.get('userPassword')

    createUserWithEmailAndPassword(auth, userEmail, userPassword).then((userCredential) => {
        const user = userCredential.user;
        Notify.success('New user successfully created');
        refs.modalWindow.classList.replace('auth__backdrop', 'auth__backdrop--hidden')
        location.reload(true)
    }).catch((error) => {
        Notify.warning("Fill out the form with correct data");
    })

    refs.signInForm.reset()
    refs.signUpForm.reset()
})

// SIGN IN USER WITH FORM DATA
refs.signInForm.addEventListener('submit', e => {
    e.preventDefault()
    const formData = new FormData(refs.signInForm)

    const userEmail = formData.get('userEmail')
    const userPassword = formData.get('userPassword')

    signInWithEmailAndPassword(auth, userEmail, userPassword).then((userCredential) => {
        const user = userCredential.user;
        Notify.success('User successfully sign in');
        location.reload(true)
    }).catch((error) => {
        Notify.failure("User isn't exist");
    })

    refs.signInForm.reset()
    refs.signUpForm.reset()
})

//USER AUTH LISTENER
onAuthStateChanged(auth, (user) => {
    if (user) {
        // IF USER SIGNED IN
        const uid = user.uid;
        
        pageRefs.openAuthModalButton.style.display = 'none'

        // DISPLAY FOR SETTINGS LIST
        authRefs.authSettingsList.style.display = 'block'
        // --------------------------

        console.log(uid)
        // USER DELETE
        authRefs.deleteUserButton.addEventListener('click', (e) => {
            deleteUser(user).then(() => {
                Notify.success('User successfully deleted');
                location.reload(true)
            }).catch((error) => {
                Notify.failure("Error");
                console.log(error)
            })
        })

        authRefs.signOutButton.addEventListener('click', () => {
            signOut(auth).then(() => {
                Notify.success('Successfully sign uut');
                pageRefs.openAuthModalButton.style.display = 'none'
                pageRefs.openAuthModalButton.style.display = 'block'
                location.reload(true)
            }).catch((error) => {
                Notify.failure("Error");
            })
        })
    } else {
        // IF USER SIGNED OUT
        pageRefs.libraryButton.style.display = 'none'
    }
})






