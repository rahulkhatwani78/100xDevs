let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
const categoryMapping = {
  todo: "To Do",
  inProgress: "In Progress",
  underReview: "Under Review",
  finished: "Finished",
};
const priorityMapping = {
  Urgent: "highPriority",
  Medium: "mediumPriority",
  Low: "lowPriority",
};

const updateTasksInLocalStorage = () => {
  localStorage.removeItem("tasks");
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const taskComponent = (
  index,
  taskListClassName,
  title,
  description,
  priority,
  createdOn,
  updatedOn,
  isInitialization
) => {
  const now = new Date();

  // 24 hours format
  const date = now.getDate().toString().padStart(2, "0");
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const year = now.getFullYear().toString().padStart(2, "0");
  const hours24 = now.getHours().toString().padStart(2, "0");
  const min = now.getMinutes().toString().padStart(2, "0");
  const sec = now.getSeconds().toString().padStart(2, "0");

  // 12 hours format
  const hours12 = (((now.getHours() + 11) % 12) + 1)
    .toString()
    .padStart(2, "0");
  const ampm = now.getHours() >= 12 ? "PM" : "AM";

  const currTimestamp = `${date}/${month}/${year} ${hours12}:${min}:${sec} ${ampm}`;

  if (createdOn && !isInitialization) {
    tasks.forEach((task, id) => {
      if (index === task?.index) {
        tasks[id] = {
          index,
          taskListClassName,
          title,
          description,
          priority,
          createdOn,
          updatedOn: currTimestamp,
        };
      }
    });
  } else if (!isInitialization) {
    tasks.push({
      index,
      taskListClassName,
      title,
      description,
      priority,
      createdOn: currTimestamp,
    });
  }

  updateTasksInLocalStorage();

  const divElement = document.createElement("div");
  divElement.setAttribute("class", "task");
  divElement.setAttribute("id", `task-${index}`);
  divElement.setAttribute("draggable", "true");
  divElement.setAttribute("ondragstart", `drag(event)`);

  const headingElement = document.createElement("h3");
  headingElement.innerHTML = title;

  const descriptionElement = document.createElement("div");
  descriptionElement.innerHTML = description;

  const metaDataElement = document.createElement("div");
  metaDataElement.setAttribute("class", "metaData");
  const timeElement = document.createElement("div");
  timeElement.setAttribute("class", "date");
  const createdOnTime = updatedOn ? updatedOn : (createdOn && isInitialization) ? createdOn : currTimestamp
  timeElement.innerHTML = `${
    (createdOn && !isInitialization) || updatedOn ? "Updated" : "Created"
  } On: ${createdOnTime}`;
  const editBtnElement = document.createElement("div");
  const editBtn = document.createElement("button");
  editBtn.setAttribute("class", "editBtn");
  editBtn.setAttribute(
    "onclick",
    `addTask('${taskListClassName}', ${index}, '${title}', '${description}', '${priority}', '${
      createdOn || currTimestamp
    }')`
  );
  editBtn.innerHTML = "Edit";
  editBtnElement.appendChild(editBtn);
  const priorityElement = document.createElement("div");
  priorityElement.setAttribute("class", priorityMapping[priority]);
  priorityElement.innerHTML = priority;
  metaDataElement.appendChild(timeElement);
  metaDataElement.appendChild(editBtnElement);
  metaDataElement.appendChild(priorityElement);

  divElement.appendChild(headingElement);
  divElement.appendChild(descriptionElement);
  if ((createdOn && !isInitialization) || updatedOn) {
    const createdOnElement = document.createElement("div");
    createdOnElement.setAttribute("class", "date");
    createdOnElement.innerHTML = `Created On: ${createdOn}`;
    divElement.appendChild(createdOnElement);
  }
  divElement.appendChild(metaDataElement);

  return divElement;
};

const initializeCanvas = () => {
  const mainDiv = document.querySelector(".main");

  const addTodoButtons = document.createElement("div");
  addTodoButtons.setAttribute("class", "addTodoButtons");

  Object.keys(categoryMapping).forEach((category) => {
    const divElement = document.createElement("div");
    divElement.setAttribute("class", category);

    const headingElement = document.createElement("h2");
    headingElement.innerHTML = categoryMapping[category];

    const taskListElement = document.createElement("div");
    taskListElement.setAttribute("class", `${category}TaskList`);
    taskListElement.setAttribute("ondrop", "drop(event)");
    taskListElement.setAttribute("ondragover", "allowDrop(event)");

    divElement.appendChild(headingElement);
    divElement.appendChild(taskListElement);

    mainDiv.appendChild(divElement);

    const addTodoButton = document.createElement("button");
    addTodoButton.setAttribute("onclick", `addTask('${category}TaskList')`);
    addTodoButton.innerHTML = "Add Task";
    addTodoButtons.appendChild(addTodoButton);
  });

  mainDiv.appendChild(addTodoButtons);

  tasks.forEach((task) => {
    const addedTask = taskComponent(
      task?.index,
      task?.taskListClassName,
      task?.title,
      task?.description,
      task?.priority,
      task?.createdOn,
      task?.updatedOn,
      true
    );
    const taskList = document.querySelector(`.${task?.taskListClassName}`);
    taskList.appendChild(addedTask);
  });
};

initializeCanvas();

const appendTask = (taskListClassName, index, createdOn) => {
  document.querySelector(`#error-${index}`).innerHTML = "";
  const task = document.querySelector(`#task-${index}`);
  const taskList = document.querySelector(`.${taskListClassName}`);
  const title = document.querySelector(`#title-${index}`).value || "";
  const description =
    document.querySelector(`#description-${index}`).value || "";
  const priority = document.querySelector(`#priority-${index}`).value || "";

  if (!title || !description || !priority) {
    document.querySelector(`#error-${index}`).innerHTML =
      "Please add the task details before saving!";
    return;
  }

  const todoTask = taskComponent(
    index,
    taskListClassName,
    title,
    description,
    priority,
    createdOn
  );
  taskList.replaceChild(todoTask, task);
};

const addTask = (
  taskListClassName,
  index,
  title,
  description,
  priority,
  createdOn
) => {
  if (index === 0 || index) {
    id = index;
    taskListClassName =
      document.querySelector(`#task-${index}`).parentElement.className || "";
  } else {
    id = tasks.length;
  }

  const taskList = document.querySelector(`.${taskListClassName}`);

  const divElement = document.createElement("div");
  divElement.setAttribute("class", "task");
  divElement.setAttribute("id", `task-${id}`);

  const headingDiv = document.createElement("div");
  const headingLabel = document.createElement("span");
  headingLabel.innerHTML = "Title: ";
  const headingInput = document.createElement("input");
  headingInput.setAttribute("id", `title-${id}`);
  if (title) {
    headingInput.setAttribute("value", title);
  }
  headingDiv.appendChild(headingLabel);
  headingDiv.appendChild(headingInput);

  const descriptionDiv = document.createElement("div");
  const descriptionLabel = document.createElement("span");
  descriptionLabel.innerHTML = "Description: ";
  const descriptionInput = document.createElement("input");
  descriptionInput.setAttribute("id", `description-${id}`);
  if (description) {
    descriptionInput.setAttribute("value", description);
  }
  descriptionDiv.appendChild(descriptionLabel);
  descriptionDiv.appendChild(descriptionInput);

  const priorityDiv = document.createElement("div");
  const priorityLabel = document.createElement("span");
  priorityLabel.innerHTML = "Priority: ";
  const prioritySelect = document.createElement("select");
  prioritySelect.setAttribute("id", `priority-${id}`);
  ["Urgent", "Medium", "Low"].forEach((priorityValue) => {
    const priorityOption = document.createElement("option");
    priorityOption.setAttribute("value", priorityValue);
    if (priority === priorityValue) {
      priorityOption.setAttribute("selected", "selected");
    }
    priorityOption.innerHTML = priorityValue;
    prioritySelect.appendChild(priorityOption);
  });
  priorityDiv.appendChild(priorityLabel);
  priorityDiv.appendChild(prioritySelect);

  const errorDiv = document.createElement("div");
  errorDiv.setAttribute("class", "error");
  errorDiv.setAttribute("id", `error-${id}`);

  const saveBtnDiv = document.createElement("div");
  saveBtnDiv.setAttribute("class", "saveBtnDiv");
  const saveBtn = document.createElement("button");
  saveBtn.innerHTML = "Save Task";
  saveBtn.setAttribute("class", "saveBtn");
  saveBtn.setAttribute(
    "onclick",
    `appendTask('${taskListClassName}', ${id}, '${createdOn || ""}')`
  );
  saveBtnDiv.appendChild(saveBtn);

  divElement.appendChild(headingDiv);
  divElement.appendChild(descriptionDiv);
  divElement.appendChild(priorityDiv);
  divElement.appendChild(errorDiv);
  divElement.appendChild(saveBtnDiv);

  if (index === 0 || index) {
    taskList.replaceChild(divElement, document.querySelector(`#task-${index}`));
  } else {
    taskList.appendChild(divElement);
  }
};

const allowDrop = (ev) => {
  ev.preventDefault();
};

const drag = (ev) => {
  ev.dataTransfer.setData("task", ev.target.id);
};

const drop = (ev) => {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("task");
  tasks.forEach((task, index) => {
    if (`task-${task.index}` === data) {
      tasks[index].taskListClassName = ev.target.className;
    }
  });
  updateTasksInLocalStorage();
  ev.target.appendChild(document.getElementById(data));
};
