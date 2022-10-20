"use strict";
const form = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const list = document.getElementById("todoList");
const deleteButton = document.getElementById("delete");
let nextID = 0;
let todos = [];
const submit = (e) => {
    e.preventDefault(); //prevent submit from refreshing the page
    list.append(createTodo(todoInput.value));
    todoInput.value = "";
    todoInput.focus();
};
const createTodo = (content) => {
    //returns the li element with the various components inside it
    const li = document.createElement("li"); //create the LI element and populate it
    const IDstring = `${nextID}`;
    li.id = IDstring;
    li.classList.add("list-item");
    const checkbox = document.createElement("input");
    checkbox.classList.add("todoCheckbox");
    checkbox.type = "checkbox";
    checkbox.id = "checkbox" + IDstring;
    checkbox.addEventListener("change", () => checkTodo(IDstring));
    li.append(checkbox);
    const label = document.createElement("label");
    const p = document.createElement("p");
    p.append(content);
    label.append(p);
    label.htmlFor = checkbox.id;
    li.append(label);
    const del = document.createElement("button"); //create the delete button and add event listener.
    del.innerText = "X";
    li.append(del);
    del.addEventListener("click", () => deleteTodo(IDstring));
    todos.push({ todo: content, id: IDstring }); //add the todo to the internal array.
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
};
const deleteTodo = (id) => {
    //remove a specific todo by the ID
    const todo = document.getElementById(id);
    todo === null || todo === void 0 ? void 0 : todo.remove();
    todos = todos.filter((todo) => todo.id != id);
};
const deleteAll = () => {
    //delete all todos
    list.innerHTML = "";
    todos = [];
    nextID = 0;
};
//EVENT LISTENERS
form.addEventListener("submit", submit);
deleteButton.addEventListener("click", deleteAll);
//# sourceMappingURL=script.js.map