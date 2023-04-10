const form = document.querySelector("#new-todo-form");
const todoInput = document.querySelector("#todo-input");
const list = document.querySelector("#list");
const template = document.querySelector("#list-item-template");
const PREFIX = "ADVANCED_TODO_LIST";
const KEY = `${PREFIX}-todos`;
let todos = load() || [];
todos.forEach(addTodo);

list.addEventListener("change", (e) => {
  if (e.target.matches("[data-list-item-checkbox]")) {
    const item = e.target.closest(".list-item");
    const todoid = item.dataset.todoId;
    const todo = todos.find((t) => t.id === todoid);
    todo.completed = e.target.checked;
    save();
  }
});

list.addEventListener("click", (e) => {
  if (e.target.matches("[data-button-delete]")) {
    const item = e.target.closest(".list-item");
    const todoid = item.dataset.todoId;
    todos = todos.filter((t) => t.id !== todoid);
    item.remove();
    save();
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const todo = todoInput.value;

  if (todo === "") return;

  const advtodo = {
    name: todo,
    completed: false,
    id: new window.Date().valueOf().toString(),
  };
  todos.push(advtodo);

  addTodo(advtodo);
  save();
  todoInput.value = "";
});

function addTodo(todo) {
  const clone = template.content.cloneNode(true);
  const litem = clone.querySelector(".list-item");
  litem.dataset.todoId = todo.id;
  const checkbox = clone.querySelector("[data-list-item-checkbox]");
  checkbox.checked = todo.completed;
  const text = clone.querySelector("[data-list-item-text]");
  text.innerText = todo.name;
  list.appendChild(clone);
}

function load() {
  const todostring = localStorage.getItem(KEY);
  return JSON.parse(todostring);
}

function save() {
  localStorage.setItem(KEY, JSON.stringify(todos));
}
