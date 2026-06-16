export function TodoItemTemplate({ deleteText }: { deleteText: string }) {
  return (
    <template id="todo-item-template">
      <li className="flex items-center gap-3 p-4 bg-base-200 rounded-box border border-base-300 hover:shadow-sm transition">
        <input
          type="checkbox"
          className="checkbox checkbox-primary peer"
          data-action="toggle"
        />
        <span className="flex-1 peer-checked:line-through peer-checked:text-base-content/50 peer-checked:transition-all" />
        <button
          type="button"
          className="btn btn-ghost btn-sm text-base-content/40 hover:text-error hover:bg-error/10"
          data-action="delete"
          data-i18n="deleteBtn"
        >
          {deleteText}
        </button>
      </li>
    </template>
  );
}
