import { run, getChangeset } from "../utils/index.js";

export async function bump(config, ctx) {
  await run("npm", [
    "version",
    ctx.version,
    "--no-git-tag-version",
    "--no-commit-hooks",
    "--allow-same-version",
  ]);

  await getChangeset();
}
