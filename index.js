import { loadConfig } from "./config.js";
import { runHook } from "./hooks.js";
import { selectVersion, selectTag, version } from "./steps/index.js";

export async function release() {
  const config = await loadConfig("please-release");
  const ctx = {};

  // 选择版本
  await runHook(config.hooks?.["before:selectVersion"], ctx);
  await selectVersion(config, ctx);
  await runHook(config.hooks?.["after:selectVersion"], ctx);

  // 选择tag
  await runHook(config.hooks?.["before:selectTag"], ctx);
  await selectTag(config, ctx);
  await runHook(config.hooks?.["after:selectTag"], ctx);

  // 更新
  await runHook(config.hooks?.["before:version"], ctx);
  await version(config, ctx);
  await runHook(config.hooks?.["after:version"], ctx);
}
