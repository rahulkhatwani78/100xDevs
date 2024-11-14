const fs = require("fs");

const asyncReadFile = (fileName) => {
  return new Promise((resolve, reject) =>
    fs.readFile(fileName, "utf-8", (err, data) => {
      if (err) reject(err);
      resolve(data);
    })
  );
};

const readFiles = async () => {
  await asyncReadFile("a.txt")
    .then((data) => console.log("Data:", data))
    .catch((err) => console.log("Error:", err));
  await asyncReadFile("b.txt")
    .then((data) => console.log("Data:", data))
    .catch((err) => console.log("Error:", err));
};

readFiles();
