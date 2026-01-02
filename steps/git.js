import { run, renderTemplate, getChangeset } from "../utils/index.js";

export async function gitAdd(config, ctx) {
  await run("git", ["add", "."]);
}

export async function gitCommit(config, ctx) {
  const changes = await getChangeset();

  if (changes.length) {
    console.log("");
    logger.info("Changeset:");
    for (const line of changes) {
      console.log(`  ${line}`);
    }
    console.log("");
  }

  const message = renderTemplate(config.git?.commitMessage, ctx);
  await run("git", ["commit", "--no-verify", "-s", "-m", message]);
}

export async function gitTag(config, ctx) {
  const tagName = renderTemplate(config.git?.tagName, ctx);
  await run("git", ["tag", tagName]);
}

export async function gitPush(config, ctx) {
  const tagName = renderTemplate(config.git?.tagName, ctx);
  await run("git", ["push"]);
  await run("git", ["push", "origin", `refs/tags/${tagName}`]);
}
