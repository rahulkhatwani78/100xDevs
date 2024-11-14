/**
 * Async Await is basically know as syntactic sugar of promise, as the code looks synchronous but behaves asynchronously
 */

const setTimeoutPromisified = (t) => {
    return new Promise(resolve => setTimeout(resolve, t))
}

const solve = async () => {
    await setTimeoutPromisified(1000);
    console.log('hi');
    await setTimeoutPromisified(3000);
    console.log('hello');
    await setTimeoutPromisified(5000);
    console.log('hello there');
}

solve();

console.log('After solve function');