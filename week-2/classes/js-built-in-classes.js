// Date class
const date = new Date();
console.log(date); // Prints the date in UTC time - 0 GMT
console.log(date.toUTCString());
console.log(date.toLocaleDateString());
console.log(date.toLocaleTimeString());

// Map class
const map = new Map();
map.set('name', 'Rahul');
map.set('age', 24);
console.log(map.get('name'));

// The above code is similar to objects in javascript
const obj = {
    name: 'Rahul',
    age: 24,
};
console.log(obj.name);

// String class
const firstName = 'Amanpreet';
console.log(firstName.toUpperCase()); 
/* 
   The reason that we are able to use the toUpperCase function to firstName, 
   because initializing the string in javascript actually creates a String class object, 
   that means the line 
   const firstName = 'Amanpreet'; 
   is actually
   const firstName = new String('Amanpreet');
*/