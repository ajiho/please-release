import { runHook } from "./hooks.js";
import {
  selectVersion,
  selectTag,
  version,
  gitAdd,
  gitCommit,
  gitTag,
  gitPush,
} from "./steps/index.js";

export async function release(config) {
  const ctx = {};
  // 流程开始
  await runHook(config.hooks?.["before:init"], ctx);
  // 选择版本
  await runHook(config.hooks?.["before:selectVersion"], ctx);
  await selectVersion(config, ctx);
  await runHook(config.hooks?.["after:selectVersion"], ctx);

  // 选择tag
  await runHook(config.hooks?.["before:selectTag"], ctx);
  await selectTag(config, ctx);
  await runHook(config.hooks?.["after:selectTag"], ctx);

  // version
  await runHook(config.hooks?.["before:version"], ctx);
  await version(config, ctx);
  await runHook(config.hooks?.["after:version"], ctx);

  // git系列
  await runHook(config.hooks?.["before:gitAdd"], ctx);
  await gitAdd(config, ctx);
  await runHook(config.hooks?.["after:gitAdd"], ctx);

  await runHook(config.hooks?.["before:gitCommit"], ctx);
  await gitCommit(config, ctx);
  await runHook(config.hooks?.["after:gitCommit"], ctx);

  await runHook(config.hooks?.["before:gitTag"], ctx);
  await gitTag(config, ctx);
  await runHook(config.hooks?.["after:gitTag"], ctx);

  await runHook(config.hooks?.["before:gitPush"], ctx);
  await gitPush(config, ctx);
  await runHook(config.hooks?.["after:gitPush"], ctx);

  // 流程走完之后
  await runHook(config.hooks?.["after:release"], ctx);
}
