type Lang = 'zh' | 'en';

const langToggle = document.getElementById("langToggle") as HTMLButtonElement;

const dict: Record<Lang, Record<string, string>> = {
  zh: {
    placeholder: '写点什么...',
    addBtn: '添加',
    empty: '✨ 暂无任务，添加一条吧',
    deleteBtn: '删除',
    pageTitle: '首页',
  },
  en: {
    placeholder: 'Write your todo here...',
    addBtn: 'Add',
    empty: '✨ No tasks yet, add one!',
    deleteBtn: 'Delete',
    pageTitle: 'Home',
  },
};

let lang: Lang = 'en';

export function t(key: string): string {
  return dict[lang]?.[key] ?? dict.en[key] ?? key;
}

export function setLang(l: Lang) {
  lang = l;
  applyI18n();
}

function applyNode(el: Element) {
  const key = el.getAttribute('data-i18n');
  if (!key) return;
  if (el instanceof HTMLInputElement) {
    el.placeholder = t(key);
  } else {
    el.textContent = t(key);
  }
}

export function applyI18n() {
  document.querySelectorAll('[data-i18n]').forEach(applyNode);
  document.title = `${t('pageTitle')} - Deno TodoList`;
}

export function applyI18nToElement(el: Element) {
  el.querySelectorAll('[data-i18n]').forEach(applyNode);
}

langToggle.addEventListener("click", () => {
  if (langToggle.textContent!.trim() === "EN") {
    setLang("en");
    langToggle.textContent = "中";
  } else {
    setLang("zh");
    langToggle.textContent = "EN";
  }
});
