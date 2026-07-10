const tasks = [];
let idCounter = 0;

// referencias ao dom
const main = document.querySelector("main");
const form = document.getElementById("task-form");
const titleInput = document.getElementById("task-title");
const descriptionInput = document.getElementById("task-description");
const estimatedTimeInput = document.getElementById("task-estimated-time");



// Lê o formulário -> readform -> apenas responsavel por ler o dom, nada mais, nao sabe o uqe e uma task, como gerar ids ou onde as tasks sao guardadas
function readForm() {
    return {
        title: titleInput.value,
        description: descriptionInput.value,
        estimatedTime: estimatedTimeInput.value
    };
}


// contruimos uma task do dominio -> apenas recebe os dados e devolve uma entidade nada mais
function createTask(formData) {
    return {
        id: idCounter++,
        title: formData.title,
        description: formData.description,
        estimatedTime: Number(formData.estimatedTime),
        completed: false
    };
}


// guardamos o objeto ou atualizamos o estad -> alterar o estado da aplciacao so isso
function addTask(task) {
    tasks.push(task);
}

function createListElement(task) {
    const item = document.createElement("li");
    const title = document.createElement("h3");
    const description = document.createElement("p");
    const estimatedTime = document.createElement("span");

    item.appendChild(title);
    item.appendChild(description);
    item.appendChild(estimatedTime);

    title.textContent = task.title;
    description.textContent = task.description;
    estimatedTime.textContent = task.estimatedTime;

    return item; 
}


function createUnorderedList() {
    const unorderedList = document.createElement("ul");
    unorderedList.id = "task-list";
    main.appendChild(unorderedList);
    return unorderedList;
}

function getCurrentList() {
    let list = document.getElementById("task-list");
    if (list === null) {
        list = createUnorderedList();
    };

    return list; 
}

function appendElement(list, listElement) {
    list.appendChild(listElement); 
} 

function renderTasks() {
    const list = getCurrentList(); 
    list.replaceChildren(); // replace all children for none
    
    tasks.forEach(task => {
        const listElement = createListElement(task)
        appendElement(list, listElement);
    });
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = readForm();
    const task = createTask(formData);

    addTask(task);
    renderTasks();
});