import { execa } from "execa";
import { createConsola } from "consola";
import { NAME } from "../constants/index.js";

export const run = (bin, args, opts = {}) =>
  execa(bin, args, { stdio: "pipe", ...opts });

export const logger = createConsola({
  defaults: {
    tag: NAME,
  },
});

export async function getChangeset(cwd = process.cwd()) {
  logger.info(`Changeset:`);
  await run("git", ["status", "--porcelain"], { stdio: "inherit", cwd });
  console.log("");
}

/**
 * 判断当前目录是否是一个干净的 git 仓库
 */
export async function checkGitRepoStatus(cwd = process.cwd()) {
  // 1. 是否是 git 仓库
  try {
    await execa("git", ["rev-parse", "--is-inside-work-tree"], { cwd });
  } catch {
    return {
      isGitRepo: false,
      isClean: false,
    };
  }

  // 2. 是否干净
  const { stdout } = await execa("git", ["status", "--porcelain"], { cwd });

  return {
    isGitRepo: true,
    isClean: stdout.trim().length === 0,
  };
}

export function renderTemplate(template, ctx) {
  if (!template) return template;

  return template.replace(/\$\{(\w+)\}/g, (_, key) => {
    if (ctx[key] == null) {
      throw new Error(`Template variable "${key}" is not defined`);
    }
    return String(ctx[key]);
  });
}
