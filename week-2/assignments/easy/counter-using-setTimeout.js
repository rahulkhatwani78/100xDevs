/*
    Counter without setInterval
    Without using setInterval, try to code a counter in Javascript. There is a hint at the bottom of the file if you get stuck.
    (Hint: setTimeout)
*/

let counter = 0;

const increaseAndPrint = () => {
  console.log(counter);
  counter++;
  setTimeout(increaseAndPrint, 1000);
};

setTimeout(increaseAndPrint, 1000);
