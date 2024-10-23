const fs = require('fs');

// Reading files synchronously
const contents = fs.readFileSync('a.txt', 'utf8');
console.log(contents);
const contents2 = fs.readFileSync('b.txt', 'utf8');
console.log(contents2);

// Reading files asynchronously
fs.readFile('a.txt', 'utf-8', function(err, contents) {
    console.log(contents);
});
fs.readFile('b.txt', 'utf-8', function(err, contents) {
    console.log(contents);
});