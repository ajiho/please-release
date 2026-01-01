export default {
  increments: ["patch", "minor", "major"],
  tags: ["latest", "next"],

  git: {
    commitMessage: "release: v${version}",
    tagName: "v${version}",
    push: true,
  },

  changelog: {
    command: "npm run changelog",
    prettier: {
      config: "configs/prettier.config.mjs",
      file: "CHANGELOG.md",
    },
  },

  hooks: {
    "before:selectVersion": () => {
      console.log("Before selecting version");
    },

    "after:selectVersion": ({ version }) => {
      console.log("after selecting version", version);
    },

    "after:version": ({ version }) => {
      console.log("Updated version to", version);
    },

    "before:git:commit": "npm test",

    "after:release": async ({ version }) => {
      console.log(`🎉 Released ${version}`);
    },
  },
};
