/**
    File cleaner
    Read a file, remove all the extra spaces and write it back to the same file.

    For example, if the file input was
    hello     world    my    name   is       raman
    
    After the program runs, the output should be
    hello world my name is raman
 */

const fs = require("fs");

const promisifiedReadFile = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

const promisifiedWriteFile = (fileName, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, data, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};

const cleanFile = (data) => {
  return data?.replace(/\s\s+/g, " ");
};

const sanitizeFile = (fileName) => {
  promisifiedReadFile(fileName)
    .then((data) => {
      const cleanData = cleanFile(data);
      return promisifiedWriteFile(fileName, cleanData);
    })
    .then(() => {
      console.log("File sanitized!");
    });
};

sanitizeFile("test.txt");
