const tasks = [];
let nextTaskId = 0;

const form = document.getElementById("task-form");
const titleInput = document.getElementById("task-title");
const descriptionInput = document.getElementById("task-description");
const estimatedTimeInput = document.getElementById("task-estimated-time");
const taskList = document.getElementById("task-list");

function readTaskForm() {
  return {
    title: titleInput.value,
    description: descriptionInput.value,
    estimatedTime: estimatedTimeInput.value,
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

function createTaskListItem(task) {
  const item = document.createElement("li");
  const title = document.createElement("h3");
  const description = document.createElement("p");
  const estimatedTime = document.createElement("span");

  title.textContent = task.title;
  description.textContent = task.description;
  estimatedTime.textContent = String(task.estimatedTime);

  item.append(title, description, estimatedTime);

  return item;
}

function renderTasks() {
  const items = tasks.map(createTaskListItem);
  taskList.replaceChildren(...items);
}

function handleTaskFormSubmit(event) {
  event.preventDefault();

  const task = createTask(readTaskForm());
  tasks.push(task);
  renderTasks();
}

form.addEventListener("submit", handleTaskFormSubmit);
