import { Todo } from "./main.ts";
import { applyI18nToElement } from "./i18n.ts";

const todoTemplate = document.getElementById(
  "todo-item-template",
) as HTMLTemplateElement;

export function createTodoItem({ id, text, completed }: Todo): HTMLElement {
  const clone = todoTemplate.content.firstElementChild!.cloneNode(
    true,
  ) as HTMLElement;
  clone.setAttribute("data-id", String(id));

  const input = clone.querySelector("input")!;
  const span = clone.querySelector("span")!;

  input.checked = completed;
  span.textContent = text;

  applyI18nToElement(clone);

  return clone;
}

export function updateTodoItem({ id, text, completed }: Todo): boolean {
  const li = document.querySelector(`[data-id="${id}"]`);
  if (!li) return false;

  const input = li.querySelector("input")!;
  const span = li.querySelector("span")!;

  input.checked = completed;
  span.textContent = text;

  return true;
}

export function removeTodoItem(id: number | string): boolean {
  const li = document.querySelector(`[data-id="${id}"]`);
  if (!li) return false;
  li.remove();
  return true;
}
