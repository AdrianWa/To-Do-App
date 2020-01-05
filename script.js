/**
 * This section contains all functions of the website
 */
// add a single task to the todo-container
const printTodo = (todo) => {
    todoContainer.innerHTML += `
        <div class="card" id="task-${todo.id}">
            <h4>${todo.name}</h4>
            <p>${todo.desc}</p>
            <p>Priority: ${todo.priority}</p>
            <p>Added: ${todo.added}</p>
            ${todo.due ? `<p>Due: ${todo.due}</p>` : ""}
            <div class="u-pull-right">
                <button id="btn-del-${todo.id}">Delete</button>
            </div>
            <div class="u-cf"></div>
            </div>
        </div>
        `;
}

// add all tasks to the todo container
const printTodos = () => {
    clearTodos();
    for (todo of todos) {
        printTodo(todo);
    }
}

// add the button listener 
const addButtonEvents = () => {
    for (todo of todos) {
        var btnId = "btn-del-" + todo.id
        var btnDelete = document.getElementById(btnId);
        btnDelete.addEventListener("click", deleteTask);
    }
}

const clearTodos = () => {
    todoContainer.innerHTML = "";
}

// save task to todos variable and update UI
const addTask = () => {
    if (validateInputs()) {
        const newDate = new Date();
        const newId = getNextId();
        const newTodo = {
            id: newId,
            name: todoName.value,
            desc: todoDesc.value,
            added: newDate,
            due: todoDate.value,
            priority: todoPriority.value,
            done: false,
        };
        todos.push(newTodo);
        printTodos();
        addButtonEvents();
        resetInputs();
        saveTodos();
    }
}

// saves todos to local browser storage
const saveTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
}

const resetInputs = () => {
    todoName.value = "";
    todoDesc.value = "";
    todoPriority.value = "Medium";
    todoDate.value = "";
}

const validateInputs = () => {
    if (todoName.value === "") {
        errorName.innerText = "Task name is required";
        return false;
    }
    errorName.innerText = "";
    return true;
}

// find next availible id in current todos
const getNextId = () => {
    let id = 0;
    for (todo of todos) {
        if (todo.id > id) {
            id = todo.id;
        }
    }
    return id + 1;
}

// remove task from UI and storage
const deleteTask = (event) => {
    const id = event.target.id.substring(8);
    var element = document.getElementById("task-" + id);
    element.parentNode.removeChild(element);
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].id == id) {
            todos.splice(i, 1)
        }
    }
    saveTodos()
}

function sortBy(a, b, property) {
    
}

/**
 * Next section contains the code which is executed once when the page loads
 */
var todos;

// initialize todos from storage or as empty array
if (typeof localStorage !== 'undefined') {
    todos = JSON.parse(localStorage.getItem("todos")) || [];
} else {
    todos = [];
}

// initialize variable with DOM node references
const todoContainer = document.getElementById("todo-container");
const todoName = document.getElementById("todo-name");
const todoDesc = document.getElementById("todo-desc");
const todoPriority = document.getElementById("todo-priority");
const todoDate = document.getElementById("todo-date");
const errorName = document.getElementById("error-name");

// initial UI update
printTodos();
addButtonEvents();