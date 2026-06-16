import type { VNode } from "preact";

interface BaseProps {
  children: VNode | VNode[];
  cssContent: string;
  jsContent: string;
}

export function Base({ children, cssContent, jsContent }: BaseProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title data-i18n="title">Home - Deno TodoList</title>
        <style dangerouslySetInnerHTML={{ __html: cssContent }} />
        <script
          type="module"
          dangerouslySetInnerHTML={{ __html: jsContent }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
