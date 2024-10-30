const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const errorMsg = document.getElementById('errorMsg'); // For displaying error messages

let editTodo = null;

// Function to display error message
const displayError = (message) => {
    errorMsg.textContent = message;
    errorMsg.style.display = "block";
    setTimeout(() => {
        errorMsg.style.display = "none";
    }, 3000);
}

// Function to add todo
const addTodo = () => {
    const inputText = inputBox.value.trim();
    if (inputText.length <= 0) {
        displayError("You must write something in your to do");
        return false;
    }

    if (addBtn.value === "Edit") {
        // Passing the original text to editLocalTodos function before edit it in the todoList
        editLocalTodos(editTodo.target.previousElementSibling.textContent);
        editTodo.target.previousElementSibling.textContent = inputText;
        addBtn.value = "Add";
        inputBox.value = "";
    }
    else {
        //Creating p tag
        const li = document.createElement("li");
        const p = document.createElement("p");
        p.textContent = inputText;
        li.appendChild(p);


        // Creating Edit Btn
        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.classList.add("btn", "editBtn");
        li.appendChild(editBtn);

        // Creating Delete Btn
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Remove";
        deleteBtn.classList.add("btn", "deleteBtn");
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
        inputBox.value = "";

        saveLocalTodos(inputText);
    }
}

// Function to update : (Edit/Delete) todo
const updateTodo = (e) => {
    if (e.target.textContent === "Remove") {
        todoList.removeChild(e.target.parentElement);
        deleteLocalTodos(e.target.parentElement);
    }

    if (e.target.textContent === "Edit") {
        inputBox.value = e.target.previousElementSibling.textContent;
        inputBox.focus();
        addBtn.value = "Edit";
        editTodo = e;
    }
}

// Function to save local todo
const saveLocalTodos = (todo) => {

    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Function to get local todo
const getLocalTodos = () => {

    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach(todo => {

        //Creating p tag
        const li = document.createElement("li");
        const p = document.createElement("p");
        p.textContent = todo;
        li.appendChild(p);


        // Creating Edit Btn
        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.classList.add("btn", "editBtn");
        li.appendChild(editBtn);

        // Creating Delete Btn
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Remove";
        deleteBtn.classList.add("btn", "deleteBtn");
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
    });

}

// Function to delete local todo
const deleteLocalTodos = (todo) => {

    const todos = JSON.parse(localStorage.getItem("todos")) || [];

    let todoText = todo.children[0].textContent;
    let todoIndex = todos.indexOf(todoText);
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    
}

const editLocalTodos = (todo) => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    let todoIndex = todos.indexOf(todo);
    todos[todoIndex] = inputBox.value;
    localStorage.setItem("todos", JSON.stringify(todos));
}

document.addEventListener('DOMContentLoaded', getLocalTodos);
addBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', updateTodo);