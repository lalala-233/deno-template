export function Header(
  { title, subtitle }: { title: string; subtitle: string },
) {
  return (
    <div className="bg-primary text-primary-content px-6 py-4 flex items-center justify-center relative">
      <div>
        <h1 className="text-3xl font-bold text-center">{title}</h1>
        <p className="opacity-80 text-center text-sm mt-1">{subtitle}</p>
      </div>
      <button
        id="langToggle"
        type="button"
        className="btn btn-ghost btn-sm absolute right-4 text-primary-content"
        data-i18n="langToggle"
      >
        中
      </button>
    </div>
  );
}
