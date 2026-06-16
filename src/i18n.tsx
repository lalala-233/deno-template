type Lang = "zh-CN" | "en";

const langToggle = document.getElementById("langToggle") as HTMLButtonElement;

const dict: Record<Lang, Record<string, string>> = {
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

let lang: Lang = "en";

export function t(key: string): string {
  return dict[lang]?.[key] ?? dict.en[key] ?? key;
}

export function setLang(l: Lang) {
  lang = l;
  applyI18n();
}

function applyNode(el: Element) {
  const key = el.getAttribute("data-i18n");
  if (!key) return;
  if (el instanceof HTMLInputElement) {
    el.placeholder = t(key);
  } else {
    el.textContent = t(key);
  }
}

export function applyI18n() {
  document.querySelectorAll("[data-i18n]").forEach(applyNode);
}

export function applyI18nToElement(el: Element) {
  el.querySelectorAll("[data-i18n]").forEach(applyNode);
}

// changing document.documentElement.lang will change default font, so we don't change it now.
langToggle.addEventListener("click", () => {
  if (lang === "en") {
    // document.documentElement.lang = "zh-CN";
    setLang("zh-CN");
  } else {
    // document.documentElement.lang = "en";
    setLang("en");
  }
});
