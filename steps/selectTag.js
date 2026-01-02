import prompts from "prompts";
import { CancelledError } from "../errors.js";

export async function selectTag(config, ctx) {
  const tags = config.tags;

  const { tag } = await prompts({
    type: "select",
    name: "tag",
    message: "Select tag type",
    choices: tags,
  });

  const { yes: tagOk } = await prompts({
    type: "confirm",
    name: "yes",
    message: `Releasing v${ctx.version} on ${tags[tag]}. Confirm?`,
    initial: true,
  });

  if (!tagOk) {
    throw new CancelledError();
  }
  ctx.tag = tags[tag];
}
