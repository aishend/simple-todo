const tasks = [];
let nextTaskId = 0;

const form = document.getElementById("task-form");
const titleInput = document.getElementById("task-title");
const descriptionInput = document.getElementById("task-description");
const estimatedTimeInput = document.getElementById("task-estimated-time");
const taskList = document.getElementById("task-list");
const emptyMessage = document.getElementById("empty-message");


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

    title.textContent = task.title.trim();
    description.textContent = task.description.trim();
    estimatedTime.textContent = String(task.estimatedTime).trim() + " minutes";

    item.append(title, description, estimatedTime);

    return item;
}

function renderTasks() {
    emptyMessage.hidden = tasks.length > 0
    const items = tasks.map(createTaskListItem);
    taskList.replaceChildren(...items);
}

function formDataValid(data) {
    const title = data.title.trim();
    const estimatedTimeText = data.estimatedTime.trim();
    const estimatedTime = Number(estimatedTimeText);
    const errors = {
        title: "",
        estimatedTime: "",
    };

    if (title === "") {
        errors.title = "Title is required.";
    }

    if (estimatedTimeText === "") {
        errors.estimatedTime = "Estimated time is required.";
    } else if (!Number.isFinite(estimatedTime)) {
        errors.estimatedTime = "Estimated time must be a number.";
    } else if (estimatedTime < 1) {
        errors.estimatedTime = "Estimated time must be at least 1 minute.";
    }

    return {
        valid: errors.title === "" && errors.estimatedTime === "",
        errors,
    };
}

function showError(validation) {
    const titleErrorElement = document.getElementById("title-error");
    const estimatedTimeErrorElement = document.getElementById(
        "estimated-time-error",
    );
    titleErrorElement.textContent = validation.errors.title;
    estimatedTimeErrorElement.textContent = validation.errors.estimatedTime;
}

function clearForm() {
    titleInput.value = "";
    descriptionInput.value = "";
    estimatedTimeInput.value = "";
}

function handleTaskFormSubmit(event) {
    event.preventDefault();
    const data = readTaskForm();
    const validation = formDataValid(data);
    showError(validation);
    if (validation.valid) {
        const task = createTask(data);
        tasks.push(task);
        renderTasks();
        clearForm();
    }
}

form.addEventListener("submit", handleTaskFormSubmit);

renderTasks();