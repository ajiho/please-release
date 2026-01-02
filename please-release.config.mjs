export default {
  increments: ["patch", "minor", "major"],
  tags: ["latest", "next"],

  git: {
    commitMessage: "release: v${version}",
    tagName: "v${version}",
  },

  hooks: {
    "before:init": ["npm run test"],

    "before:selectVersion": ({ logger }) => {
      logger.info("Before selecting version");
    },

    "after:selectVersion": ({ version, logger }) => {
      logger.info(`after selecting version:${version}`);
    },

    "after:bump": ({ version, cancel, logger }) => {
      logger.info(`Updated version to:${version}`);
    },

    "after:release": "echo 已推送 v${version} ",
  },
};
