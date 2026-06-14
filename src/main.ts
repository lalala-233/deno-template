import { createTodoItem, updateTodoItem, removeTodoItem } from "./todo-item.ts";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const todoInput = document.getElementById("todoInput") as HTMLInputElement;
const addBtn = document.getElementById("addBtn") as HTMLButtonElement;
const todoList = document.getElementById("todoList") as HTMLUListElement;
const emptyState = document.getElementById("emptyState") as HTMLDivElement;

let todos: Todo[] = [];
let nextId = 1;

// 从 localStorage 加载，仅此一次全量渲染
function loadTodos() {
  const stored = localStorage.getItem("deno_todos");
  if (stored) {
    todos = JSON.parse(stored);
    nextId = todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1;
  }
  renderAll();
}

function saveTodos() {
  localStorage.setItem("deno_todos", JSON.stringify(todos));
}

function showEmpty() {
  todoList.classList.add("hidden");
  emptyState.classList.remove("hidden");
}

function showList() {
  todoList.classList.remove("hidden");
  emptyState.classList.add("hidden");
}

function addTodo(text: string) {
  if (!text.trim()) return;
  const newTodo: Todo = {
    id: nextId++,
    text: text.trim(),
    completed: false,
  };
  todos.push(newTodo);
  saveTodos();
  showList();
  todoList.appendChild(createTodoItem(newTodo));
  todoInput.value = "";
  todoInput.focus();
}

function toggleTodo(id: number) {
  const todo = todos.find((t) => t.id === id);
  if (!todo) return;
  todo.completed = !todo.completed;
  saveTodos();
  updateTodoItem(todo);
}

function deleteTodo(id: number) {
  todos = todos.filter((t) => t.id !== id);
  saveTodos();
  removeTodoItem(id);
  if (todos.length === 0) showEmpty();
}

function renderAll() {
  todoList.replaceChildren();
  for (const todo of todos) {
    todoList.appendChild(createTodoItem(todo));
  }
  todos.length === 0 ? showEmpty() : showList();
}


todoList.addEventListener("change", (e) => {
  const target = e.target as HTMLElement;
  if (target.getAttribute("data-action") === "toggle") {
    const li = target.closest("li") as HTMLLIElement;
    const id = Number(li?.getAttribute("data-id"));
    if (!isNaN(id)) toggleTodo(id);
  }
});

todoList.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  if (target.getAttribute("data-action") === "delete") {
    const li = target.closest("li") as HTMLLIElement;
    const id = Number(li?.getAttribute("data-id"));
    if (!isNaN(id)) deleteTodo(id);
  }
});

addBtn.addEventListener("click", () => addTodo(todoInput.value));
todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTodo(todoInput.value);
});

loadTodos();
