/*
    Write to a file
    Using the fs library again, try to write to the contents of a file. 
    You can use the fs library to as a black box, the goal is to understand async tasks.
*/

const fs = require("fs");

const data = "This is a content of the file";

fs.writeFile("test.txt", data, (err) => {
  if (err) {
    console.log("Error while writing the file:", err);
    return;
  }
  console.log("Success writing the file!");
});

const expensiveOperation = () => {
  let sum = 0;
  for (let i = 0; i < 1e8; i++) {
    sum += i;
  }
  console.log("Result of expensive operation:", sum);
};

expensiveOperation();
