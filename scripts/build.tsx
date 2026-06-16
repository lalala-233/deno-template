import { minify } from "html-minifier-terser";
import { renderToString } from "preact-render-to-string";
import { Index } from "../src/templates/Index.tsx";

const [cssContent, jsContent] = await Promise.all([
  Deno.readTextFile("dist/output.css"),
  Deno.readTextFile("dist/main.js"),
]);

let html = `<!DOCTYPE html>
${renderToString(<Index cssContent={cssContent} jsContent={jsContent} />)}`;

html = await minify(html, {
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true,
  removeEmptyAttributes: true,
  collapseBooleanAttributes: true,
  removeAttributeQuotes: true,
});
await Deno.writeTextFile("dist/index.html", html);
