"use strict";
const form = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const list = document.getElementById("todoList");
const deleteButton = document.getElementById("delete");
let nextID = 0;
let todos = [];
const onLoad = () => {
    todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach((todo) => {
        //get the highest id of all the todos and set nextID to be one more than that. Ensures that duplicate IDs aren't used.
        if (parseInt(todo.id) >= nextID)
            nextID = parseInt(todo.id + 1);
        //create a listItem for each todo
        list.append(createTodo(todo));
    });
};
const saveTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
};
const submit = (e) => {
    e.preventDefault(); //prevent submit from refreshing the page
    const IDstring = `${nextID}`;
    const todo = { todo: todoInput.value, id: IDstring };
    list.append(createTodo(todo));
    todoInput.value = "";
    todoInput.focus();
    todos.push(todo);
    saveTodos();
};
const createTodo = (todo) => {
    //returns the li element with the various components inside it
    const li = document.createElement("li"); //create the LI element and populate it
    li.id = todo.id;
    li.classList.add("list-item");
    if (todo.completed)
        li.classList.add("checked");
    const checkbox = document.createElement("input");
    checkbox.classList.add("todoCheckbox");
    checkbox.type = "checkbox";
    checkbox.id = "checkbox" + todo.id;
    checkbox.checked = todo.completed || false;
    checkbox.addEventListener("change", () => checkTodo(todo.id));
    li.append(checkbox);
    const label = document.createElement("label");
    const p = document.createElement("p");
    p.append(todo.todo);
    label.append(p);
    label.htmlFor = checkbox.id;
    li.append(label);
    const del = document.createElement("button"); //create the delete button and add event listener.
    del.innerText = "X";
    li.append(del);
    del.addEventListener("click", () => deleteTodo(todo.id));
    // todos.push(todo); //add the todo to the internal array.
    nextID++;
    return li;
};
const checkTodo = (id) => {
    //toggle the checked class on the todo
    const todo = document.getElementById(id);
    todo === null || todo === void 0 ? void 0 : todo.classList.toggle("checked");
    todos.forEach((t) => {
        if (t.id == id) {
            t.completed = !t.completed;
        }
    });
    saveTodos();
};
const deleteTodo = (id) => {
    //remove a specific todo by the ID
    const todo = document.getElementById(id);
    todo === null || todo === void 0 ? void 0 : todo.remove();
    todos = todos.filter((todo) => todo.id != id);
    saveTodos();
};
const deleteAll = () => {
    //delete all todos
    list.innerHTML = "";
    todos = [];
    nextID = 0;
    saveTodos();
};
//EVENT LISTENERS
form.addEventListener("submit", submit);
deleteButton.addEventListener("click", deleteAll);
onLoad();
//# sourceMappingURL=script.js.map