export type Lang = "zh-CN" | "en";

export const dict: Record<Lang, Record<string, string>> = {
  "zh-CN": {
    placeholder: "写点什么...",
    addBtn: "添加",
    empty: "✨ 暂无任务，添加一条吧",
    deleteBtn: "删除",
    title: "首页 - Deno TodoList",
    langToggle: "EN",
  },
  en: {
    placeholder: "Write your todo here...",
    addBtn: "Add",
    empty: "✨ No tasks yet, add one!",
    deleteBtn: "Delete",
    title: "Home - Deno TodoList",
    langToggle: "中",
  },
};
