const todoTemplate = document.getElementById('todo-item-template') as HTMLTemplateElement;

export function renderTodoItem({ text, checked }: {
  text: string;
  checked: boolean;
}): string {
  const clone = todoTemplate.content.firstElementChild!.cloneNode(true) as HTMLElement;

  const input = clone.querySelector('input')!;
  const span = clone.querySelector('span')!;

  input.checked = checked;
  span.textContent = text;
  if (checked) {
    span.classList.add('text-gray-500','line-through');
  } else {
    span.classList.add('text-gray-800');
  }

  return clone.outerHTML;
}