import { createRequire } from "node:module";
import prompts from "prompts";
import { CancelledError } from "../errors.js";
import semver from "semver";
const { version: currentVersion } = createRequire(import.meta.url)(
  "../package.json"
);

const { inc: _inc, valid } = semver;
const inc = (i) => _inc(currentVersion, i);

function buildChoices(current) {
  const parsed = semver.parse(current);

  const base = `${parsed.major}.${parsed.minor}.${parsed.patch}`;

  const prereleaseTag = parsed.prerelease[0]; // alpha / beta / rc
  const prereleaseNum = parsed.prerelease[1] ?? -1;

  const choices = [];

  if (prereleaseTag) {
    // 当前 prerelease +1（放第一）
    choices.push({
      title: `${prereleaseTag}（+1，推荐）`,
      value: semver.inc(current, "prerelease", prereleaseTag),
    });
  }

  choices.push(
    { title: "latest（正式版）", value: base },
    { title: "beta", value: `${base}-beta.0` },
    { title: "rc", value: `${base}-rc.0` },
    { title: "alpha", value: `${base}-alpha.0` },
    { title: "next（自动）", value: "__next__" }
  );

  return choices;
}

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
    const choices = buildChoices(currentVersion);

    await prompts({
      type: "autocomplete",
      name: "version",
      message: "选择下一个版本",
      initial: choices[0]?.value,
      choices,
    });
  } else {
    targetVersion = versions[release].match(/\((.*)\)/)[1];
  }

  if (!valid(targetVersion)) {
    //验证是否有效版本号
    throw new Error(`Invalid target version: ${targetVersion}`);
  }

  ctx.version = targetVersion;
}
