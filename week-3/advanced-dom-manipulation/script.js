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

let counter = 4;

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

  const spanElement = document.createElement('span');
  spanElement.innerHTML = newTodoValue;

  const space1Element = document.createElement('span');
  space1Element.innerHTML = ' ';

  const editButton = document.createElement('button');
  editButton.innerHTML = 'Edit';
  editButton.setAttribute("onclick", `editTodo(${counter})`);

  const space2Element = document.createElement('span');
  space2Element.innerHTML = ' ';

  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = 'Delete';
  deleteButton.setAttribute("onclick", `deleteTodo(${counter})`);

  newTodoElement.appendChild(spanElement);
  newTodoElement.appendChild(space1Element);
  newTodoElement.appendChild(editButton);
  newTodoElement.appendChild(space2Element);
  newTodoElement.appendChild(deleteButton);

  document.querySelector("#todos").appendChild(newTodoElement);
  counter += 1;
  emptyInput();
};

const deleteTodo = (index) => {
  const todoToDelete = document.getElementById("todo-" + index);
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
