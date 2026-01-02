import { runHook } from "./hooks.js";
import {
  selectVersion,
  selectTag,
  bump,
  gitAdd,
  gitCommit,
  gitTag,
  gitPush,
} from "./steps/index.js";

import { checkGitRepoStatus } from "./utils/index.js";
import { logger } from "./utils/index.js";

export async function release(config) {
  // 检查当前git仓库
  const { isGitRepo, isClean } = await checkGitRepoStatus();

  if (!isGitRepo) {
    logger.error(
      "Current working directory is not a git repository.Please initialize a git repository first."
    );
    return;
  }

  if (!isClean) {
    logger.error(
      "Working dir must be clean.Please stage and commit your changes."
    );
    return;
  }

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
