import { createRequire } from "node:module";
import prompts from "prompts";
import { CancelledError } from "../errors.js";
import semver from "semver";
const { version: currentVersion } = createRequire(import.meta.url)(
  "../package.json"
);

const { inc: _inc, valid } = semver;
const inc = (i) => _inc(currentVersion, i);

export async function selectVersion(config, ctx) {
  let targetVersion;

  //准备选项
  const versions = config.increments
    .map((i) => `${i} (${inc(i)})`)
    .concat(["custom"]);

  const { release } = await prompts({
    type: "select",
    name: "release",
    message: "Select release type",
    choices: versions,
  });

  // 如果没选择结束直接抛出异常
  if (release === undefined) {
    throw new CancelledError();
  }

  if (release === 3) {
    //选择了自定义
    // targetVersion = (
    //   await prompts({
    //     type: "text",
    //     name: "version",
    //     message: "Input custom version",
    //     initial: currentVersion,
    //   })
    // ).version;

    const res = await prompts({
      type: "autocomplete",
      name: "value",
      message: "请输入或选择一个 tag",
      choices: [
        { title: "latest", value: "latest" },
        { title: "next", value: "next" },
        { title: "beta", value: "beta" },
        { title: "alpha", value: "alpha" },
      ],
    });
    console.log(res);
  } else {
    targetVersion = versions[release].match(/\((.*)\)/)[1];
  }

  if (!valid(targetVersion)) {
    //验证是否有效版本号
    throw new Error(`Invalid target version: ${targetVersion}`);
  }

  ctx.version = targetVersion;
}
