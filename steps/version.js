import { logger, run, getChangeset } from "../utils/index.js";

export async function version(config, ctx) {
  await run("npm", [
    "version",
    ctx.version,
    "--no-git-tag-version",
    "--no-commit-hooks",
    "--allow-same-version",
  ]);
}
