/* 
    Variables - Assignment #1
    Create a variable for each of the following: your favorite color, 
    your height in centimeters, and whether you like pizza. 
    Use appropriate variable declarations (let, const, or var). 
    Try logging it using console.log
*/
const favColor = "Blue"; // Using const - As my Fav Color won't change
var height = 178; // Using var - As my height may change in future
let likePizza = true; // Using let - As my choice of liking pizza may also change in future

console.log("\nVariables - Assignment #1\n");
console.log("My favorite color is", favColor);
console.log("My height is " + height + " centimeters");
console.log(`I ${likePizza ? "" : "don't "}like Pizza`);

/* 
    Functions - Assignment #1
    Write a function sum that finds the sum of two numbers. 
    Side quest - Try passing in a string instead of a number and see what happens? 
*/
function sum(var1, var2) {
  return var1 + var2;
}

console.log("\nFunctions - Assignment #1\n");
console.log(sum(15, 30));
console.log(sum("15", 30));

/* 
    Functions - Assignment #2
    Write a function called canVote that returns true or false if the age of a user is >= 18 
*/
function canVote(age) {
  return age >= 18;
}

console.log("\nFunctions - Assignment #2\n");
console.log(canVote(15));
console.log(canVote(20));

/* 
    If/Else - Assignment #1
    Write an if/else statement that checks if a number is even or odd. 
    If it's even, print "The number is even." Otherwise, print "The number is odd." 
*/
function oddOrEven(num) {
  if (num % 2 === 0) {
    console.log("The number is even.", num);
  } else {
    console.log("The number is odd.", num);
  }
}

console.log("\nIf/Else - Assignment #1\n");
oddOrEven(6);
oddOrEven(9);

/* 
    Loops - Assignment #1
    Write a function called sum that finds the sum from 1 to a number
*/
function findSum(num) {
  let sum = 0;
  for (let i = 1; i <= num; i++) {
    sum += i;
  }
  console.log("The sum of numbers 1 to " + num + " is " + sum);
}

console.log("\nLoops - Assignment #1\n");
findSum(3);
findSum(6);

/* 
    Objects - Assignment #1
    Write a function that takes a user as an input and greets them with their name and age
*/
function greet(user) {
  console.log("Hello " + user.name + ", your age is " + user.age + ".");
}

console.log("\nObjects - Assignment #1\n");
const user = {
  name: "Rahul",
  age: "24",
};
greet(user);

/* 
    Objects - Assignment #2 and #3
    Write a function that takes a new object as input which has name , age  
    and gender and greets the user with their gender 
    (Hi Mr/Mrs/Others harkirat, your age is 21)
*/
function greetWithSalutation(user) {
  let salutation, eligibleForVote;
  if (user.gender === "Male") {
    salutation = "Mr";
  } else if (user.gender === "Female") {
    salutation = "Mrs";
  } else {
    salutation = "Mx";
  }
  if (canVote(user.age)) {
    eligibleForVote = "eligible";
  } else {
    eligibleForVote = "not eligible";
  }
  console.log(
    "Hi " +
      salutation +
      " " +
      user.name +
      ", your age is " +
      user.age +
      ", so you are " +
      eligibleForVote +
      " for voting."
  );
}

console.log("\nObjects - Assignment #2 and #3\n");
const user1 = {
  name: "Rahul",
  age: "24",
  gender: "Male",
};
const user2 = {
  name: "Karina",
  age: "17",
  gender: "Female",
};
greetWithSalutation(user1);
greetWithSalutation(user2);

/* 
    Arrays - Assignment #1
    Write a function that takes an array of numbers as input, 
    and returns a new array with only even values. Read about filter in JS
*/
function returnEvenValues(numbers) {
  return numbers.filter((num) => num % 2 === 0);
}

console.log("\nArrays - Assignment #1\n");
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(returnEvenValues(numbers));

/* 
    Array of Objects - Assignment #1
    Write a function that takes an array of users as inputs 
    and returns only the users who are more than 18 years old
*/
function adultUsers(users) {
  return users.filter((user) => user.age > 18);
}

console.log("\nArray of Objects - Assignment #1\n");
const users = [
  {
    name: "Harkirat",
    age: 21,
  },
  {
    name: "Raman",
    age: 17,
  },
];
console.log(adultUsers(users));

/* 
    Object of Objects - Assignment #1
    Write a function that takes an array of users as inputs 
    and returns only the users who are more than 18 years old
*/
function adultMaleUsers(users) {
  return users.filter(
    (user) => user.demographics.age > 18 && user.demographics.gender === "Male"
  );
}

console.log("\nObject of Objects - Assignment #1\n");
const users2 = [
  {
    name: "Harkirat",
    demographics: {
      age: 24,
      gender: "Male",
    },
  },
  {
    name: "Karishma",
    demographics: {
      age: 20,
      gender: "Female",
    },
  },
  {
    name: "Aman",
    demographics: {
      age: 17,
      gender: "Male",
    },
  },
];
console.log(adultMaleUsers(users2));

console.log("\n");
