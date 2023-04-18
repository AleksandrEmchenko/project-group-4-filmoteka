import Notiflix, { Notify } from 'notiflix';

export class RealtimeDataBaseAPI {
    constructor(userUID) {
        this.userUID = userUID
    }
    // FUNCTION ADD TO WATCHED
    async addToWatched(film) {
        try {
            await fetch(`https://filmoteka-group-6-766c8-default-rtdb.europe-west1.firebasedatabase.app/${this.userUID}/watched/${film.id}.json`, {
                method: 'POST',
                body: JSON.stringify(film),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            Notify.success('Successfully added to watched');
        } catch (error) {
            Notify.failure("Something went wrong");
        }
    }
    // FUNCTION ADD TO QUEUE
    async addToQueue(film) {
        try {
            const response = await fetch(`https://filmoteka-group-6-766c8-default-rtdb.europe-west1.firebasedatabase.app/${this.userUID}/queue/${film.id}.json`, {
                method: 'POST',
                body: JSON.stringify(film),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            console.log(response.json())
            Notify.success('Successfully added to queue');
        } catch (error) {
            Notify.failure("Something went wrong");
        }
        
    }
    // FUNCTION GET WATCHED FILMS
    async getWatchedFilms() {
        try {
            const response = await fetch(`https://filmoteka-group-6-766c8-default-rtdb.europe-west1.firebasedatabase.app/${this.userUID}/watched.json`)
            const responseJson = await response.json()
            return responseJson
        } catch (error) {
            console.log(error)
        }
    }
    // FUNCTION GET FILMS IN QUEUE
    async getQueueFilms() {
        try {
            const response = await fetch(`https://filmoteka-group-6-766c8-default-rtdb.europe-west1.firebasedatabase.app/${this.userUID}/queue.json`)
            const responseJson = await response.json()
            return responseJson
        } catch (error) {
            console.log(error)
        }
    }
    // FUNCTION DELETE WATCHED FILM
    async deleteFilmFromWatched(film) {
        try {
            await fetch(`https://filmoteka-group-6-766c8-default-rtdb.europe-west1.firebasedatabase.app/${this.userUID}/watched/${film.id}.json`, {
                method: 'DELETE',
            })
            Notify.success('Successfully deleted from watched');
        } catch (error) {
            Notify.failure("Something went wrong");
            console.log(error)
        }
    }
    // FUNCTION DELETE FILM FROM QUEUE
    async deleteFilmFromQueue(film) {
        try {
            await fetch(`https://filmoteka-group-6-766c8-default-rtdb.europe-west1.firebasedatabase.app/${this.userUID}/queue/${film.id}.json`, {
                method: 'DELETE',
            })
            Notify.success('Successfully deleted from queue');
        } catch (error) {
            Notify.failure("Something went wrong");
            console.log(error)
        }
    }

    async isIncludeInQueue(filmID) {
        const response = await fetch(`https://filmoteka-group-6-766c8-default-rtdb.europe-west1.firebasedatabase.app/${this.userUID}/queue/${filmID}.json`)
        const responseJson = await response.json()

        if (responseJson !== null) {
            return true
        }
        return false
    }

    async isIncludeInWathed(filmID) {
        const response = await fetch(`https://filmoteka-group-6-766c8-default-rtdb.europe-west1.firebasedatabase.app/${this.userUID}/watched/${filmID}.json`)
        const responseJson = await response.json()

        if (responseJson !== null) {
            return true
        }
        return false
    }
}


 
