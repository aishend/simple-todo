let tasks = [];
let idCounter = 0;

// referencias ao dom
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
        estimatedTime: formData.estimatedTime,
        completed: false
    };
}


// guardamos o objeto ou atualizamos o estad -> alterar o estado da aplciacao so isso
function addTask(task) {
    tasks.push(task);
}


form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = readForm();
    const task = createTask(formData);

    addTask(task);

    console.log(tasks);
});