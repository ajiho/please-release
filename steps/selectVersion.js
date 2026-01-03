import { createRequire } from "node:module";
import prompts from "prompts";
import { CancelledError } from "../errors.js";
import semver from "semver";

const { version: currentVersion } = createRequire(import.meta.url)(
  "../package.json"
);

const { inc, valid, prerelease } = semver;

export async function selectVersion(config, ctx) {
  let targetVersion;

  const isPrerelease = prerelease(currentVersion);

  // 构建版本选项
  const choices = config.increments.map((type) => ({
    title: `${type} (${inc(currentVersion, type)})`,
    value: inc(currentVersion, type),
  }));

  // 如果当前是预发布版本，插入 prerelease 选项
  if (isPrerelease) {
    choices.unshift({
      title: `prerelease (${inc(currentVersion, "prerelease")})`,
      value: inc(currentVersion, "prerelease"),
    });
  }

  // custom 始终放最后
  choices.push({
    title: "custom",
    value: "custom",
  });

  const { release } = await prompts({
    type: "select",
    name: "release",
    message: "Select release type",
    choices,
  });

  if (!release) {
    throw new CancelledError();
  }

  // 自定义版本号
  if (release === "custom") {
    const { version } = await prompts({
      type: "text",
      name: "version",
      message: "Input custom version",
      initial: currentVersion,
      validate(value) {
        return valid(value) ? true : "Invalid semver version";
      },
    });

    if (!version) {
      throw new CancelledError();
    }

    targetVersion = version;
  } else {
    targetVersion = release;
  }

  ctx.version = targetVersion;
}
