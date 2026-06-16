import { Base } from "./Base.tsx";
import { Header } from "./Header.tsx";
import { TodoForm } from "./TodoForm.tsx";
import { EmptyState } from "./EmptyState.tsx";
import { TodoItemTemplate } from "./TodoItemTemplate.tsx";

export function Index(
  { cssContent, jsContent }: { cssContent: string; jsContent: string },
) {
  return (
    <Base cssContent={cssContent} jsContent={jsContent}>
      <body className="bg-base-200 min-h-screen">
        <div className="container mx-auto px-4 py-10 max-w-2xl">
          <div className="card bg-base-100 shadow-xl">
            <Header title="TodoList" subtitle="with Tailwind CSS" />
            <div className="p-6">
              <TodoForm placeholder="Write your todo here..." btnText="add" />
              <ul id="todoList" className="space-y-3" />
              <EmptyState text="No tasks here. Let's add one." />
            </div>
          </div>
        </div>
        <TodoItemTemplate deleteText="remove" />
      </body>
    </Base>
  );
}
