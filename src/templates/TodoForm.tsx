export function TodoForm(
  { placeholder, btnText }: { placeholder: string; btnText: string },
) {
  return (
    <div className="flex gap-3 mb-8">
      <input
        type="text"
        id="todoInput"
        className="input input-bordered input-primary flex-1"
        placeholder={placeholder}
        data-i18n="placeholder"
        autoComplete="off"
      />
      <button
        id="addBtn"
        type="button"
        className="btn btn-primary"
        data-i18n="addBtn"
      >
        {btnText}
      </button>
    </div>
  );
}
