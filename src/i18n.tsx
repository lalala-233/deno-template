import { dict, I18nKey, isValidKey, Lang } from "./i18n-dict.ts";

const langToggle = document.getElementById("langToggle") as HTMLButtonElement;

let lang: Lang = "en";

export function t(key: I18nKey): string {
  return dict[lang]?.[key] ?? dict.en[key] ?? key;
}
export function setLang(l: Lang) {
  lang = l;
  applyI18n();
}

function applyNode(el: Element) {
  const key = el.getAttribute("data-i18n");
  if (!key || !isValidKey(key)) return;
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
