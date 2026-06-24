import { isValidKey, validKeys } from "../src/i18n-dict.ts";

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
      for (const m of content.matchAll(/data-i18n='([^']+)'/g)) {
        usedKeys.add(m[1]);
      }
    }
  }
}

await collectKeys(`${import.meta.dirname}/../src/templates`);

// Also collect from generated dist/index.html for extra coverage
try {
  await collectKeys(`${import.meta.dirname}/../dist`);
} catch {
  // skip if dist doesn't exist
}

let exitCode = 0;

for (const key of usedKeys) {
  if (!isValidKey(key)) {
    console.error(
      `❌ Missing translation key: "${key}" (used in template but not defined in any language)`,
    );
    exitCode = 1;
  }
}

for (const key of validKeys) {
  if (!usedKeys.has(key)) {
    console.warn(
      `⚠️  Unused key: "${key}" (defined in all languages but not referenced in any template)`,
    );
  }
}

Deno.exit(exitCode);
