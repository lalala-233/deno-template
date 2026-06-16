import { dict } from "../src/i18n-dict.ts";

// Recursively collect all data-i18n keys from .tsx files
const usedKeys = new Set<string>();

async function collectKeys(dir: string): Promise<void> {
  for await (const entry of Deno.readDir(dir)) {
    const path = `${dir}/${entry.name}`;
    if (entry.isDirectory) {
      await collectKeys(path);
    } else if (entry.name.endsWith(".tsx") || entry.name.endsWith(".html")) {
      const content = await Deno.readTextFile(path);
      for (const m of content.matchAll(/data-i18n="([^"]+)"/g)) {
        usedKeys.add(m[1]);
      }
    }
  }
}

await collectKeys(`${import.meta.dirname}/../src/templates`);

// Also collect from generated dist/index.html for extra coverage
try {
  collectKeys(`${import.meta.dirname}/../dist`);
} catch {
  // skip if dist doesn't exist
}

const langEntries = Object.entries(dict);
if (langEntries.length === 0) {
  console.error("❌ No languages defined in dict");
  Deno.exit(1);
}

// check if all keys are present in all languages
const [firstLang, firstTranslations] = langEntries[0];
const firstKeys = new Set(Object.keys(firstTranslations));
let keysConsistent = true;

for (const [lang, translations] of langEntries.slice(1)) {
  const currentKeys = new Set(Object.keys(translations));
  const areEqual = currentKeys.size === firstKeys.size &&
    [...firstKeys].every((k) => currentKeys.has(k));
  if (!areEqual) {
    console.error(
      `❌ Language "${lang}" has different keys than "${firstLang}"`,
    );
    const missing = [...firstKeys].filter((k) => !currentKeys.has(k));
    const extra = [...currentKeys].filter((k) => !firstKeys.has(k));
    if (missing.length) console.error(`   Missing keys: ${missing.join(", ")}`);
    if (extra.length) console.error(`   Extra keys: ${extra.join(", ")}`);
    keysConsistent = false;
  }
}
if (!keysConsistent) {
  Deno.exit(1);
}

const definedKeys = firstKeys;

let exitCode = 0;

for (const key of usedKeys) {
  if (!definedKeys.has(key)) {
    console.error(
      `❌ Missing translation key: "${key}" (used in template but not defined in any language)`,
    );
    exitCode = 1;
  }
}

for (const key of definedKeys) {
  if (!usedKeys.has(key)) {
    console.warn(
      `⚠️  Unused key: "${key}" (defined in all languages but not referenced in any template)`,
    );
  }
}

Deno.exit(exitCode);
