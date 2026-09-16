// Dev server: --watch restarts us on each change, so we rebuild here and reload the page.
const DIST = new URL("../dist/", import.meta.url);
const INDEX = new URL("index.html", DIST);
const PORT = 3000;
const POLL_MS = 200;
const BUILD_ID = crypto.randomUUID();

const build = await new Deno.Command("deno", {
  args: ["task", "build"],
  stdout: "null",
}).output();
if (!build.success) {
  console.error("build failed");
}

// Injected as text; runs in the browser, so it cannot use anything from this file.
function reloadClient(pageId: string, pollMs: number) {
  setInterval(async () => {
    const currentId = await fetch("/__reload")
      .then((response) => response.text())
      .catch(() => pageId);
    if (currentId !== pageId) {
      location.reload();
    }
  }, pollMs);
}

const PAGE_ID = JSON.stringify(BUILD_ID);
const SNIPPET = `<script>(${reloadClient})(${PAGE_ID}, ${POLL_MS})</script>`;

Deno.serve({ port: PORT, hostname: "127.0.0.1" }, async (request) => {
  const { pathname } = new URL(request.url);

  if (pathname === "/__reload") {
    return new Response(BUILD_ID, { headers: { "cache-control": "no-store" } });
  }
  if (pathname !== "/" && pathname !== "/index.html") {
    return new Response("404", { status: 404 });
  }

  const html = await Deno.readTextFile(INDEX);
  return new Response(html.replace("</html>", `${SNIPPET}</html>`), {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
    },
  });
});
