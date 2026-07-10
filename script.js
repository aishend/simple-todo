const tasks = [];
let nextTaskId = 0;

const form = document.getElementById("task-form");
const titleInput = document.getElementById("task-title");
const descriptionInput = document.getElementById("task-description");
const estimatedTimeInput = document.getElementById("task-estimated-time");
const taskList = document.getElementById("task-list");
const emptyMessage = document.getElementById("empty-message");
const titleError = document.getElementById("title-error");
const estimatedTimeError = document.getElementById("estimated-time-error");

function readTaskForm() {
  return {
    title: titleInput.value.trim(),
    description: descriptionInput.value.trim(),
    estimatedTime: estimatedTimeInput.value.trim(),
  };
}

function createTask({ title, description, estimatedTime }) {
  return {
    id: nextTaskId++,
    title,
    description,
    estimatedTime: Number(estimatedTime),
    completed: false,
  };
}

function setTaskCompleted(taskId, completed) {
  const task = tasks.find(({ id }) => id === taskId);

  if (task) {
    task.completed = completed;
  }
}

function createTaskListItem(task) {
  const item = document.createElement("li");
  const checkbox = document.createElement("input");
  const title = document.createElement("h3");
  const description = document.createElement("p");
  const estimatedTime = document.createElement("span");

  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.setAttribute(
    "aria-label",
    `Toggle completion for task: ${task.title}`,
  );

  title.textContent = task.title;
  description.textContent = task.description;
  estimatedTime.textContent = `${task.estimatedTime} minutes`;

  checkbox.addEventListener("change", (event) => {
    setTaskCompleted(task.id, event.currentTarget.checked);
  });

  item.append(checkbox, title, description, estimatedTime);

  return item;
}

function renderTasks() {
  emptyMessage.hidden = tasks.length > 0;
  const items = tasks.map(createTaskListItem);
  taskList.replaceChildren(...items);
}

function validateTaskData({ title, estimatedTime }) {
  const estimatedTimeNumber = Number(estimatedTime);
  const errors = {
    title: "",
    estimatedTime: "",
  };

  if (title === "") {
    errors.title = "Title is required.";
  }

  if (estimatedTime === "") {
    errors.estimatedTime = "Estimated time is required.";
  } else if (!Number.isFinite(estimatedTimeNumber)) {
    errors.estimatedTime = "Estimated time must be a number.";
  } else if (estimatedTimeNumber < 1) {
    errors.estimatedTime = "Estimated time must be at least 1 minute.";
  }

  return {
    valid: errors.title === "" && errors.estimatedTime === "",
    errors,
  };
}

function renderValidationErrors(errors) {
  titleError.textContent = errors.title;
  estimatedTimeError.textContent = errors.estimatedTime;
}

function handleTaskFormSubmit(event) {
  event.preventDefault();

  const data = readTaskForm();
  const validation = validateTaskData(data);
  renderValidationErrors(validation.errors);

  if (!validation.valid) {
    return;
  }

  tasks.push(createTask(data));
  renderTasks();
  form.reset();
}

form.addEventListener("submit", handleTaskFormSubmit);

renderTasks();
