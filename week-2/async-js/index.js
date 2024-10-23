// Example of Async function callback
console.log('Hi there!');
function timeout() {
    console.log('Reached here!');
}
setTimeout(timeout, 5000);
console.log('Welcome to the 100xDevs Class');

let c = 0;
for(let i=0; i<100000; i++) {
    c = c+1;
}
console.log('Expensive operation done!');