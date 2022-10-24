const form = document.getElementById("todoForm") as HTMLFormElement;
const todoInput = document.getElementById("todoInput") as HTMLInputElement;
const list = document.getElementById("todoList") as HTMLUListElement;
const deleteButton = document.getElementById("delete") as HTMLButtonElement;

let nextID = 0;

type Todo = {
  todo: string;
  id: string;
  completed: boolean;
};

let todos: Todo[] = [];

const onLoad = () => {
  todos = JSON.parse(localStorage.getItem("todos") as string) || [];
  todos.forEach((todo) => {
    //get the highest id of all the todos and set nextID to be one more than that. Ensures that duplicate IDs aren't used.
    if (parseInt(todo.id) >= nextID) nextID = parseInt(todo.id + 1);

    //create a listItem for each todo
    list.append(createTodo(todo));
  });
};

const saveTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const submit = (e: SubmitEvent) => {
  e.preventDefault(); //prevent submit from refreshing the page
  const IDstring = `${nextID}`;
  nextID++;
  const todo: Todo = { todo: todoInput.value, id: IDstring, completed: false };

  list.append(createTodo(todo));
  todoInput.value = "";
  todoInput.focus();
  todos.push(todo);
  saveTodos();
};

const createTodo = (todo: Todo): HTMLLIElement => {
  //returns the li element with the various components inside it
  const li = document.createElement("li"); //create the LI element and populate it
  li.id = todo.id;
  li.classList.add("list-item");
  if (todo.completed) li.classList.add("checked");

  const checkbox = document.createElement("input");
  checkbox.classList.add("todoCheckbox");
  checkbox.type = "checkbox";
  checkbox.id = "checkbox" + todo.id;
  checkbox.checked = todo.completed;
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
  del.classList.add("remove");
  li.append(del);

  del.addEventListener("click", () => deleteTodo(todo.id));

  return li;
};

const checkTodo = (id: string) => {
  //toggle the checked class on the todo
  const todo = document.getElementById(id);
  todo?.classList.toggle("checked");
  todos.forEach((t) => {
    if (t.id == id) {
      t.completed = !t.completed;
    }
  });
  saveTodos();
};

const deleteTodo = (id: string) => {
  //remove a specific todo by the ID
  const todo = document.getElementById(id);
  todo?.remove();
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
