Usage: todos-using-cli [options] [command]

CLI to manage todos

Options:
  -V, --version                   output the version number
  -h, --help                      display help for command

Commands:
  save-todo <todo>                saves the provided todo
  list-todos                      lists all the saved todos
  list-completed-todos            lists all the saved completed todos
  list-incompleted-todos          lists all the saved incompleted todos
  delete-todo <todoId>            deletes the todo having the provided todoId
  update-todo <todoId> <newTodo>  updates the todo having the provided todoId with the newTodo
  mark-todo-complete <todoId>     marks the todo as complete, having the provided todoId
  mark-todo-incomplete <todoId>   marks the todo as incomplete, having the provided todoId
  help [command]                  display help for command