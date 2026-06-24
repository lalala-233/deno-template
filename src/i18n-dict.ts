export type Lang = "zh-CN" | "en";

const en = {
  placeholder: "Write your todo here...",
  addBtn: "Add",
  empty: "✨ No tasks yet, add one!",
  deleteBtn: "Delete",
  title: "Home - Deno TodoList",
  langToggle: "中",
} as const;

export type I18nKey = keyof typeof en;

export const validKeys = Object.keys(en);

export function isValidKey(key: string): key is I18nKey {
  return validKeys.includes(key);
}

export const dict: Record<Lang, Record<I18nKey, string>> = {
  "zh-CN": {
    placeholder: "写点什么...",
    addBtn: "添加",
    empty: "✨ 暂无任务，添加一条吧",
    deleteBtn: "删除",
    title: "首页 - Deno TodoList",
    langToggle: "EN",
  },
  en: en,
};
