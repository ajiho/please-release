import { run } from "../utils/index.js";

export async function bump(config, ctx) {
  console.log("--------");
  console.log(ctx.version);

  await run("npm", [
    "version",
    ctx.version,
    "--no-git-tag-version",
    "--no-commit-hooks",
    "--allow-same-version",
  ]);
}
