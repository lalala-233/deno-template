export function EmptyState({ text }: { text: string }) {
  return (
    <div
      id="emptyState"
      className="text-center py-10 text-base-content/50 hidden"
    >
      <svg
        className="w-16 h-16 mx-auto mb-3 opacity-40"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
      <p className="text-lg" data-i18n="empty">{text}</p>
    </div>
  );
}
