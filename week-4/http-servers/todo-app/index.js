/**
 * Create a Todo application operated using the Postman and todos saved in the todos.json file
 */

const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();

app.use(bodyParser.json());

app.get("/todos/health", (req, res) => {
  res.send("I am healthy!");
});

app.post("/todos/save-todo", (req, res) => {
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
        todo: req?.body?.todo || "",
        completed: false,
      });
      fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
        if (err) {
          res.json({
            error: "Error while fetching the todos",
            description: err,
          });
        }
        res.send("Todo saved successfully");
      });
    }
  });
});

app.get("/todos/list-todos", (req, res) => {
  fs.readFile("todos.json", "utf8", (err, data) => {
    if (err) {
      res.send(err);
    } else {
      const todos = JSON.parse(data);
      if (todos?.length === 0) {
        res.send("No todos found");
        return;
      }
      res.send(todos);
    }
  });
});

app.get("/todos/list-completed-todos", (req, res) => {
  fs.readFile("todos.json", "utf8", (err, data) => {
    if (err) {
      res.send(err);
    } else {
      let todos = JSON.parse(data);
      if (todos?.length === 0) {
        res.send("No todos found");
        return;
      }
      todos = todos.filter((todo) => {
        return todo.completed;
      });
      if (todos?.length === 0) {
        res.send("No completed todos found");
        return;
      }
      res.send(todos);
    }
  });
});

app.get("/todos/list-incompleted-todos", (req, res) => {
  fs.readFile("todos.json", "utf8", (err, data) => {
    if (err) {
      res.send(err);
    } else {
      let todos = JSON.parse(data);
      if (todos?.length === 0) {
        res.send("No todos found");
        return;
      }
      todos = todos.filter((todo) => {
        return !todo.completed;
      });
      if (todos?.length === 0) {
        res.send("All todos are completed");
        return;
      }
      res.send(todos);
    }
  });
});

app.delete("/todos/delete-todo/:todoId", (req, res) => {
  fs.readFile("todos.json", "utf8", (err, data) => {
    if (err) {
      res.send(err);
    } else {
      const todos = JSON.parse(data);
      if (todos?.length === 0) {
        res.send("Unable to delete as the todo list is empty");
        return;
      }
      const updatedTodos = todos.filter((todo) => {
        return todo?.id !== parseInt(req?.params?.todoId);
      });

      if (todos?.length === updatedTodos?.length) {
        res.send("No todo found having the specified todoId");
        return;
      }

      fs.writeFile("todos.json", JSON.stringify(updatedTodos), (err) => {
        if (err) {
          res.send("Error while fetching the todos:", err);
          return;
        }
        res.send("Todo deleted successfully");
      });
    }
  });
});

app.put("/todos/update-todo", (req, res) => {
  fs.readFile("todos.json", "utf8", (err, data) => {
    if (err) {
      res.send(err);
    } else {
      const todos = JSON.parse(data);
      if (todos?.length === 0) {
        res.send("Unable to update as the todo list is empty");
        return;
      }
      let todoNotFound = true;
      const updatedTodos = todos.map((todo) => {
        if (todo?.id === parseInt(req?.body?.todoId)) {
          todoNotFound = false;
          todo.todo = req?.body?.newTodo;
        }
        return todo;
      });

      if (todoNotFound) {
        res.send("No todo found having the specified todoId");
        return;
      }

      fs.writeFile("todos.json", JSON.stringify(updatedTodos), (err) => {
        if (err) {
          res.send("Error while fetching the todos:", err);
          return;
        }
        res.send("Todo updated successfully");
      });
    }
  });
});

app.put("/todos/mark-todo-complete/:todoId", (req, res) => {
  fs.readFile("todos.json", "utf8", (err, data) => {
    if (err) {
      res.send(err);
    } else {
      const todos = JSON.parse(data);
      if (todos?.length === 0) {
        res.send("Unable to update as the todo list is empty");
        return;
      }
      let todoNotFound = true;
      const updatedTodos = todos.map((todo) => {
        if (todo?.id === parseInt(req?.params?.todoId)) {
          todoNotFound = false;
          todo.completed = true;
        }
        return todo;
      });

      if (todoNotFound) {
        res.send("No todo found having the specified todoId");
        return;
      }

      fs.writeFile("todos.json", JSON.stringify(updatedTodos), (err) => {
        if (err) {
          res.send("Error while fetching the todos:", err);
          return;
        }
        res.send("Todo marked completed successfully");
      });
    }
  });
});

app.put("/todos/mark-todo-incomplete/:todoId", (req, res) => {
  fs.readFile("todos.json", "utf8", (err, data) => {
    if (err) {
      res.send(err);
    } else {
      const todos = JSON.parse(data);
      if (todos?.length === 0) {
        res.send("Unable to update as the todo list is empty");
        return;
      }
      let todoNotFound = true;
      const updatedTodos = todos.map((todo) => {
        if (todo?.id === parseInt(req?.params?.todoId)) {
          todoNotFound = false;
          todo.completed = false;
        }
        return todo;
      });

      if (todoNotFound) {
        res.send("No todo found having the specified todoId");
        return;
      }

      fs.writeFile("todos.json", JSON.stringify(updatedTodos), (err) => {
        if (err) {
          res.send("Error while fetching the todos:", err);
          return;
        }
        res.send("Todo marked incompleted successfully");
      });
    }
  });
});

app.listen(3000);
