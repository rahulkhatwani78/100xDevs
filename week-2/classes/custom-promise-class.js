class CustomPromise {
    constructor(func) {
        const afterDone = () => {
            this.resolve();
        }
        func(afterDone);
    }

    then(resolve) {
        this.resolve = resolve;
    }
}

const setTimeoutPromisified = () => {
    return new CustomPromise(resolve => setTimeout(resolve, 3000))
}

setTimeoutPromisified().then(() => {
    console.log("Timeout finished!");
})