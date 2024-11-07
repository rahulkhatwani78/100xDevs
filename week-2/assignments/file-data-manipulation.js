/*
   Read the contents of a file and trim the lines (remove extra spaces from the start and the end of each line)
   and overwrite the content in the same file.
*/

const fs = require("fs");

const readFilePromisified = (fileName) => {
  return new Promise((resolve, reject) =>
    fs.readFile(fileName, "utf-8", (err, data) => {
      if (err) reject(err);
      resolve(data);
    })
  );
};

const writeFilePromisified = (fileName, data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        fs.writeFile(fileName, data, (err) => {
        if (err) reject(err);
        resolve();
      })}, 5000);
    
  });
};

const cleanData = (data) => {
  let lines = data.split("\r\n");
  if (lines.length === 1) return data;
  lines = lines.map((line) => {
    return line.trim();
  });
  return lines.join("\r\n");
};

const sanitizeFile = (fileName) => {
  readFilePromisified(fileName)
    .then((data) => {
      if (!data) return;
      const sanitizedData = cleanData(data);
      return writeFilePromisified(fileName, sanitizedData);
    })
    .then(() => {
      console.log("Data Sanitized!");
    })
    .catch((err) => {
      console.log(err);
    });
};

sanitizeFile("a.txt");
