import { step } from "../utils/step.js";
import { run } from "../utils/run.js";

export async function version(config, ctx) {
  // 更新版本号
  step("\nUpdating the package version...");

  await run("npm", [
    "version",
    ctx.version,
    "--no-git-tag-version",
    "--no-commit-hooks",
    "--allow-same-version",
  ]);
}
