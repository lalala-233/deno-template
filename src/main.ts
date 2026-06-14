import { renderTodoItem } from "./todo-item.ts";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// DOM 元素
const todoInput = document.getElementById("todoInput") as HTMLInputElement;
const addBtn = document.getElementById("addBtn") as HTMLButtonElement;
const todoList = document.getElementById("todoList") as HTMLUListElement;
const emptyState = document.getElementById("emptyState") as HTMLDivElement;

// 数据
let todos: Todo[] = [];
let nextId = 1;

function loadTodos() {
  const stored = localStorage.getItem("deno_todos");
  if (stored) {
    todos = JSON.parse(stored);
    nextId = todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1;
  }
  render();
}

function saveTodos() {
  localStorage.setItem("deno_todos", JSON.stringify(todos));
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
  render();
  todoInput.value = "";
  todoInput.focus();
}

function toggleTodo(id: number) {
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos();
    render();
  }
}

function deleteTodo(id: number) {
  todos = todos.filter((t) => t.id !== id);
  saveTodos();
  render();
}

function render() {
  if (todos.length === 0) {
    todoList.classList.add("hidden");
    emptyState.classList.remove("hidden");
    return;
  }
  todoList.classList.remove("hidden");
  emptyState.classList.add("hidden");

  todoList.innerHTML = todos
    .map((todo) => renderTodoItem({ text: todo.text, checked: todo.completed }))
    .join("");
}

// 事件委托：监听 checkbox 切换和删除按钮
todoList.addEventListener("change", (e) => {
  const target = e.target as HTMLElement;
  if (target.getAttribute("data-action") === "toggle") {
    const li = target.closest("li") as HTMLLIElement;
    const idx = Array.from(todoList.children).indexOf(li);
    if (idx >= 0) toggleTodo(todos[idx].id);
  }
});

todoList.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  if (target.getAttribute("data-action") === "delete") {
    const li = target.closest("li") as HTMLLIElement;
    const idx = Array.from(todoList.children).indexOf(li);
    if (idx >= 0) deleteTodo(todos[idx].id);
  }
});

// 添加按钮和回车事件
addBtn.addEventListener("click", () => addTodo(todoInput.value));
todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTodo(todoInput.value);
});

loadTodos();
