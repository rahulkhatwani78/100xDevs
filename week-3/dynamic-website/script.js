// let counter = 0;
// setInterval(() => {
//   document.querySelectorAll("li")[2].innerHTML = counter;
//   counter += 1;
// }, 1000);
// const addTodo = () => {
//   const inputElement = document.querySelector("input");
//   const val = inputElement.value;
//   console.log(val);
// };

const counter = 4;

const emptyInput = () => {
  document.querySelector("input").value = "";
};

const addTodo = () => {
  const newTodoValue = document.querySelector("input").value;
  if (!newTodoValue) {
    return;
  }
  const newTodoElement = document.createElement("li");
  newTodoElement.setAttribute("id", "todo-" + counter);
  newTodoElement.innerHTML = `<span>${newTodoValue}</span> <button onclick="editTodo(${counter})">Edit</button> <button onclick="deleteTodo(${counter})">Delete</button>`;
  document.querySelector("#todos").appendChild(newTodoElement);
  counter += 1;
  emptyInput();
};

const deleteTodo = (index) => {
  const todoToDelete = document.getElementById("todo-" + index);
  // todoToDelete.parentNode.removeChild(todoToDelete); // Delete using parentNode
  document.getElementById("todos").removeChild(todoToDelete);
};

const updateTodo = (index) => {
  const newTodo = document.querySelector("input").value;
  document.getElementById("todo-" + index).children[0].innerHTML = newTodo;
  document.querySelector("#addTodo").innerHTML = "Add Todo";
  document.querySelector("#addTodo").onclick = () => {
    addTodo();
  };
  emptyInput();
};

const editTodo = (index) => {
  const todoToEdit = document.getElementById("todo-" + index).children[0]
    .innerHTML;
  document.querySelector("input").value = todoToEdit;
  document.querySelector("#addTodo").innerHTML = "Update Todo";
  document.querySelector("#addTodo").onclick = () => {
    updateTodo(index);
  };
};
