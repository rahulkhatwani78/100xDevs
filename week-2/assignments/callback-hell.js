/*
    Q: Write code that
        1. logs hi after 1 second
        2. logs hello 3 seconds after step 1
        3. logs hello there 5 seconds after step 2
*/

setTimeout(() => {
  console.log("hi");
  setTimeout(() => {
    console.log("hello");
    setTimeout(() => {
      console.log("hello there");
    }, 5000);
  }, 3000);
}, 1000);

/* 
   The above code in which the callbacks are nested performing the async tasks is called Callback Hell
   We can also eliminate the Callback Hell using the callbacks as per below example
*/

const printHelloThere = () => {
  console.log("hello there");
};

const printHello = () => {
  console.log("hello");
  setTimeout(printHelloThere, 5000);
};

const printHi = () => {
  console.log("hi");
  setTimeout(printHello, 3000);
};

setTimeout(printHi, 1000);

/*
   Below is the promisified version of above assignment, which has the Callback Hell
*/

const setTimeoutPromisified = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

setTimeoutPromisified(1000).then(() => {
  console.log("hi");
  setTimeoutPromisified(3000).then(() => {
    console.log("hello");
    setTimeoutPromisified(5000).then(() => {
      console.log("hello there");
    });
  });
});

/*
   Now the same promisified version, which eliminates the Callback Hell
*/

const setTimeoutPromisified2 = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

setTimeoutPromisified2(1000)
  .then(() => {
    console.log("hi");
    return setTimeoutPromisified2(3000);
  })
  .then(() => {
    console.log("hello");
    return setTimeoutPromisified2(5000);
  })
  .then(() => {
    console.log("hello there");
  });
