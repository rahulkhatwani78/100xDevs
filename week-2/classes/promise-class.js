const fs = require("fs");

/*
   A Promise class is also a JS built-in class.
   Promise class gives you a promise that it will return you something in the future.
*/

// Promisified version of setTimeout function

const setTimeoutPromisified = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const callback = () => {
  console.log("Logged after 3 secs");
};

setTimeoutPromisified(3000).then(callback);

// Callback based setTimeout function

setTimeout(callback, 3000);

// Promisifed version of fs.readFile function

const readFilePromisified = (fileName, encoding) => {
  return new Promise((resolve, reject) =>
    fs.readFile(fileName, encoding, (err, data) => {
      if (err) reject(err);
      resolve(data);
    })
  );
};

readFilePromisified("a.txt", "utf-8")
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
