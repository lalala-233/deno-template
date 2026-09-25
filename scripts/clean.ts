// `deno eval` ignores permission flags (it always runs with full access), while `deno run` does not ignore `--allow-write`.
const targets = Deno.args.length > 0 ? Deno.args : ["dist"];
for (const path of targets) {
  await Deno.remove(path, { recursive: true });
}
