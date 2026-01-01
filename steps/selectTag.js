import prompts from "prompts";

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
  });

  if (!tagOk) {
    const err = new Error("Release cancelled by user");
    err.code = "USER_CANCEL";
    throw err;
  }
  ctx.tag = tags[tag];
  // 下面不再执行了
  console.log("rweer");
}
