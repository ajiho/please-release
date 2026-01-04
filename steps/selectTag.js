import prompts from "prompts";
import semver from "semver";
import { CancelledError } from "../errors.js";

export async function selectTag(config, ctx) {
  const isPrerelease = !!semver.prerelease(ctx.version);

  const choices = config.tags.map((tag) => {
    if (tag === "latest" && isPrerelease) {
      return {
        title: `${tag} (not allowed for prerelease)`,
        value: tag,
        disabled: true,
      };
    }

    return {
      title: tag,
      value: tag,
    };
  });

  const { tag } = await prompts({
    type: "select",
    name: "tag",
    message: "Select tag type",
    choices,
  });

  if (!tag) {
    throw new CancelledError();
  }

  const { yes } = await prompts({
    type: "confirm",
    name: "yes",
    message: `Releasing v${ctx.version} on ${tag}. Confirm?`,
    initial: true,
  });

  if (!yes) {
    throw new CancelledError();
  }

  ctx.tag = tag;
}
