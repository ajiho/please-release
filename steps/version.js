import { logger, run } from "../utils/index.js";

export async function version(config, ctx) {
  // 更新版本号
  logger.info("Updating the package version...");

  await run("npm", [
    "version",
    ctx.version,
    "--no-git-tag-version",
    "--no-commit-hooks",
    "--allow-same-version",
  ]);
}
