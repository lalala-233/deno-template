export function renderTodoItem({ text, checked }: {
  text: string;
  checked: boolean;
}): string {
  return `<li class="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition">
  <input type="checkbox" class="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer"
    ${checked ? "checked" : ""}
    data-action="toggle">
  <span class="flex-1 ${
    checked ? "text-gray-500 line-through" : "text-gray-800"
  }">${htmlEscape(text)}</span>
  <button class="px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition"
    data-action="delete">删除</button>
</li>`;
}

function htmlEscape(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
