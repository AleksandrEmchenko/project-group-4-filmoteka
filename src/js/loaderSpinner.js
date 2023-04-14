class loaderSpinner {
    
    constructor(spinner, list) {
        this.spinnerRef = spinner
        this.list = list
    }

    hide() {
        this.spinnerRef.classList.replace('loading-spinner', 'loading-spinner--hide')
    }
    
    show() {
        this.list.innerHTML = ''
        this.spinnerRef.classList.replace('loading-spinner--hide', 'loading-spinner')
    }
}