const STORAGE_KEYS = {
    tasks: "tasks",
    nextTaskId: "nextTaskId",
};

const form = document.getElementById("task-form");
const titleInput = document.getElementById("task-title");
const descriptionInput = document.getElementById("task-description");
const estimatedTimeInput = document.getElementById("task-estimated-time");
const taskList = document.getElementById("task-list");
const emptyMessage = document.getElementById("empty-message");
const titleError = document.getElementById("title-error");
const estimatedTimeError = document.getElementById("estimated-time-error");

const storedTasks = readStoredValue(STORAGE_KEYS.tasks, []);
const tasks = Array.isArray(storedTasks) ?
    storedTasks.filter(isValidStoredTask) : [];
const inferredNextTaskId = getNextTaskId(tasks);
const storedNextTaskId = readStoredValue(
    STORAGE_KEYS.nextTaskId,
    inferredNextTaskId,
);
let nextTaskId = Number.isInteger(storedNextTaskId) ?
    Math.max(storedNextTaskId, inferredNextTaskId) :
    inferredNextTaskId;

function readStoredValue(key, fallbackValue) {
    try {
        const value = localStorage.getItem(key);
        return value === null ? fallbackValue : JSON.parse(value);
    } catch {
        return fallbackValue;
    }
}

function writeStoredValue(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Could not save "${key}" to local storage.`, error);
    }
}

function getNextTaskId(taskCollection) {
    return taskCollection.reduce((nextId, task) => {
        if (!Number.isInteger(task.id)) {
            return nextId;
        }

        return Math.max(nextId, task.id + 1);
    }, 0);
}

function isValidStoredTask(task) {
    return (
        task !== null &&
        typeof task === "object" &&
        Number.isInteger(task.id) &&
        typeof task.title === "string" &&
        typeof task.description === "string" &&
        Number.isFinite(task.estimatedTime) &&
        typeof task.completed === "boolean" &&
        task.title.trim() !== "" &&
        task.estimatedTime >= 1 &&
        Number.isInteger(task.estimatedTime)
    );
}

function saveTasks() {
    writeStoredValue(STORAGE_KEYS.tasks, tasks);
}

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

    if (!task) {
        return;
    }

    task.completed = completed;
    saveTasks();
}

function deleteTask(taskId) {
    const taskIndex = tasks.findIndex(({ id }) => id === taskId);

    if (taskIndex === -1) {
        return;
    }

    tasks.splice(taskIndex, 1);
    saveTasks();
    renderTasks();
}

function createCompletionCheckbox(task) {
    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute(
        "aria-label",
        `Toggle completion for task: ${task.title}`,
    );

    checkbox.addEventListener("change", (event) => {
        setTaskCompleted(task.id, event.currentTarget.checked);
    });

    return checkbox;
}

function createDeleteButton(task) {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "delete-button";
    button.textContent = "Delete";
    button.setAttribute("aria-label", `Delete task: ${task.title}`);
    button.addEventListener("click", () => deleteTask(task.id));

    return button;
}

function createTaskListItem(task) {
    const item = document.createElement("li");
    const title = document.createElement("h3");
    const description = document.createElement("p");
    const estimatedTime = document.createElement("span");

    title.textContent = task.title;
    description.textContent = task.description;
    estimatedTime.textContent = `${task.estimatedTime} minutes`;

    item.append(
        createCompletionCheckbox(task),
        title,
        description,
        estimatedTime,
        createDeleteButton(task),
    );

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
    saveTasks();
    writeStoredValue(STORAGE_KEYS.nextTaskId, nextTaskId);
    renderTasks();
    form.reset();
}

form.addEventListener("submit", handleTaskFormSubmit);

renderTasks();