import { minify } from "html-minifier-terser";

export default function (eleventyConfig) {
  // minifyCss breaks css if tailwind css don't minify
  // but gives little benefit if tailwind css minify
  // minifyJs gives no benefit.
  eleventyConfig.addTransform("minifyHtml", async (content, outputPath) => {
    if (outputPath && outputPath.endsWith(".html")) {
      return await minify(content, {
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
    }
    return content;
  });
  eleventyConfig.ignores.add("node_modules");
  return {
    dir: {
      input: ".",
      output: "dist",
      includes: "src/_includes",
    },
    templateFormats: ["html"],
  };
}
