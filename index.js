import prompts from "prompts";
import { loadConfig } from "./config.js";
import { runHook } from "./hooks.js";

export async function release(options = {}) {
  const config = await loadConfig(options.config);
  const ctx = {};

  console.log(config);

  // await runHook(config.hooks?.["before:selectVersion"], ctx);

  // const version = await selectVersion(config);
  // ctx.version = version;

  // await runHook(config.hooks?.["after:selectVersion"], ctx);

  // await runHook(config.hooks?.["before:version"], ctx);
  // await updatePackageVersion(version);
  // await runHook(config.hooks?.["after:version"], ctx);

  // await runHook(config.hooks?.["before:changelog"], ctx);
  // await generateChangelog(config);
  // await runHook(config.hooks?.["after:changelog"], ctx);

  // await runHook(config.hooks?.["before:git:commit"], ctx);
  // await gitCommit(version, config);
  // await gitTag(version, config);
  // await runHook(config.hooks?.["after:git:commit"], ctx);

  // if (config.git?.push !== false) {
  //   await runHook(config.hooks?.["before:git:push"], ctx);
  //   await gitPush();
  //   await runHook(config.hooks?.["after:git:push"], ctx);
  // }

  // await runHook(config.hooks?.["after:release"], ctx);
}
