/**
 * Create a TODO application operated using the CLI
 */

const fs = require("fs");
const { Command } = require("commander");
const program = new Command();

program
  .name("todos-using-cli")
  .description("CLI to manage todos")
  .version("0.0.1");

program
  .command("save-todo")
  .description("saves the provided todo")
  .argument("<todo>", "Todo")
  .action((todo) => {
    fs.readFile("todos.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const todos = JSON.parse(data);
        let lastTodoId = 0;
        if (todos?.length !== 0) {
          lastTodoId = todos?.[todos?.length - 1]?.id;
        }
        todos.push({
          id: lastTodoId + 1,
          todo,
          completed: false,
        });
        fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
          if (err) {
            console.log("Error while fetching the todos:", err);
            return;
          }
          console.log("Todo saved successfully");
        });
      }
    });
  });

program
  .command("list-todos")
  .description("lists all the saved todos")
  .action(() => {
    fs.readFile("todos.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const todos = JSON.parse(data);
        if (todos?.length === 0) {
          console.log("No todos found");
          return;
        }
        console.log(todos);
      }
    });
  });

program
  .command("list-completed-todos")
  .description("lists all the saved completed todos")
  .action(() => {
    fs.readFile("todos.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        let todos = JSON.parse(data);
        if (todos?.length === 0) {
          console.log("No todos found");
          return;
        }
        todos = todos.filter((todo) => {
          return todo.completed;
        });
        if (todos?.length === 0) {
          console.log("No completed todos found");
          return;
        }
        console.log(todos);
      }
    });
  });

program
  .command("list-incompleted-todos")
  .description("lists all the saved incompleted todos")
  .action(() => {
    fs.readFile("todos.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        let todos = JSON.parse(data);
        if (todos?.length === 0) {
          console.log("No todos found");
          return;
        }
        todos = todos.filter((todo) => {
          return !todo.completed;
        });
        if (todos?.length === 0) {
          console.log("All todos are completed");
          return;
        }
        console.log(todos);
      }
    });
  });

program
  .command("delete-todo")
  .description("deletes the todo having the provided todoId")
  .argument("<todoId>", "Todo Id")
  .action((todoId) => {
    fs.readFile("todos.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const todos = JSON.parse(data);
        if (todos?.length === 0) {
          console.log("Unable to delete as the todo list is empty");
          return;
        }
        const updatedTodos = todos.filter((todo) => {
          return todo?.id !== parseInt(todoId);
        });

        if (todos?.length === updatedTodos?.length) {
          console.log("No todo found having the specified todoId");
          return;
        }

        fs.writeFile("todos.json", JSON.stringify(updatedTodos), (err) => {
          if (err) {
            console.log("Error while fetching the todos:", err);
            return;
          }
          console.log("Todo deleted successfully");
        });
      }
    });
  });

program
  .command("update-todo")
  .description("updates the todo having the provided todoId with the newTodo")
  .argument("<todoId>", "Todo Id")
  .argument("<newTodo>", "Todo")
  .action((todoId, newTodo) => {
    fs.readFile("todos.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const todos = JSON.parse(data);
        if (todos?.length === 0) {
          console.log("Unable to update as the todo list is empty");
          return;
        }
        let todoNotFound = true;
        const updatedTodos = todos.map((todo) => {
          if (todo?.id === parseInt(todoId)) {
            todoNotFound = false;
            todo.todo = newTodo;
          }
          return todo;
        });

        if (todoNotFound) {
          console.log("No todo found having the specified todoId");
          return;
        }

        fs.writeFile("todos.json", JSON.stringify(updatedTodos), (err) => {
          if (err) {
            console.log("Error while fetching the todos:", err);
            return;
          }
          console.log("Todo updated successfully");
        });
      }
    });
  });

program
  .command("mark-todo-complete")
  .description("marks the todo as complete, having the provided todoId")
  .argument("<todoId>", "Todo Id")
  .action((todoId) => {
    fs.readFile("todos.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const todos = JSON.parse(data);
        if (todos?.length === 0) {
          console.log("Unable to update as the todo list is empty");
          return;
        }
        let todoNotFound = true;
        const updatedTodos = todos.map((todo) => {
          if (todo?.id === parseInt(todoId)) {
            todoNotFound = false;
            todo.completed = true;
          }
          return todo;
        });

        if (todoNotFound) {
          console.log("No todo found having the specified todoId");
          return;
        }

        fs.writeFile("todos.json", JSON.stringify(updatedTodos), (err) => {
          if (err) {
            console.log("Error while fetching the todos:", err);
            return;
          }
          console.log("Todo marked completed successfully");
        });
      }
    });
  });

program
  .command("mark-todo-incomplete")
  .description("marks the todo as incomplete, having the provided todoId")
  .argument("<todoId>", "Todo Id")
  .action((todoId) => {
    fs.readFile("todos.json", "utf8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const todos = JSON.parse(data);
        if (todos?.length === 0) {
          console.log("Unable to update as the todo list is empty");
          return;
        }
        let todoNotFound = true;
        const updatedTodos = todos.map((todo) => {
          if (todo?.id === parseInt(todoId)) {
            todoNotFound = false;
            todo.completed = false;
          }
          return todo;
        });

        if (todoNotFound) {
          console.log("No todo found having the specified todoId");
          return;
        }

        fs.writeFile("todos.json", JSON.stringify(updatedTodos), (err) => {
          if (err) {
            console.log("Error while fetching the todos:", err);
            return;
          }
          console.log("Todo marked incompleted successfully");
        });
      }
    });
  });

program.parse();
