import { runHook } from "./hooks.js";
import { formatDuration, createTimer } from "./timer.js";
import { logger } from "./utils/index.js";
import { merge } from "lodash-es";
import defaultsConf from "./defaults.js";

import {
  selectVersion,
  selectTag,
  bump,
  gitAdd,
  gitCommit,
  gitTag,
  gitPush,
  ensureGitRepo,
  confirmPush,
} from "./steps/index.js";

export async function release(config = {}) {
  config = merge({}, defaultsConf, config);

  await ensureGitRepo();
  const timer = createTimer();

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

  // bump
  await runHook(config.hooks?.["before:bump"], ctx);
  await bump(config, ctx);
  await runHook(config.hooks?.["after:bump"], ctx);

  // git系列
  await confirmPush(config, ctx);
  await runHook(config.hooks?.["before:git"], ctx);

  // git 具体步骤
  await runHook(config.hooks?.["before:git.add"], ctx);
  await gitAdd(config, ctx);
  await runHook(config.hooks?.["after:git.add"], ctx);

  await runHook(config.hooks?.["before:git.commit"], ctx);
  await gitCommit(config, ctx);
  await runHook(config.hooks?.["after:git.commit"], ctx);

  await runHook(config.hooks?.["before:git.tag"], ctx);
  await gitTag(config, ctx);
  await runHook(config.hooks?.["after:git.tag"], ctx);

  await runHook(config.hooks?.["before:git.push"], ctx);
  await gitPush(config, ctx);
  await runHook(config.hooks?.["after:git.push"], ctx);

  await runHook(config.hooks?.["after:git"], ctx);

  // 流程走完之后
  await runHook(config.hooks?.["after:release"], ctx);

  const cost = formatDuration(timer.end());
  logger.log(`🏁 Done (in ${cost})`);
}
