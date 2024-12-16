const { Command } = require("commander");
const fs = require("fs");
const program = new Command();

program
  .name("word-counter")
  .description("CLI to count the number of words in a file!")
  .version("0.0.1");

program
  .command("count-words")
  .description("Count the number of words in a file")
  .argument("<filePath>", "path of the file")
  .action((str) => {
    fs.readFile(str, "utf-8", (err, data) => {
      if (!err) {
        const lines = data.split("\r\n");
        let numberOfWords = 0;
        lines.forEach((line) => {
          line.split(" ").forEach((word) => {
            if (word) {
              numberOfWords++;
            }
          });
        });
        console.log(`There are total ${numberOfWords} words in the file!`);
      }
    });
  });

program
  .command("count-lines")
  .description("Count the number of lines in a file")
  .argument("<filePath>", "file to count lines")
  .action((file) => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const lines = data.split("\n").length;
        console.log(`There are ${lines} lines in ${file}`);
      }
    });
  });

program.parse();
