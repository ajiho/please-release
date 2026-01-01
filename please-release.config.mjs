export default {
  increments: ["patch", "minor", "major"],
  tags: ["latest", "next"],

  git: {
    commitMessage: "release: v${version}",
    tagName: "v${version}",
    push: false,
  },

  hooks: {
    "before:init": "npm test",

    "before:selectVersion": () => {
      console.log("Before selecting version");
    },

    "after:selectVersion": ({ version }) => {
      console.log("after selecting version", version);
    },

    "before:version": ["npm run test", "echo Released ${version}"],

    "after:version": ({ version, cancel }) => {
      if (version === "0.2.7") {
        cancel("User aborted");
      }
      console.log("Updated version to", version);
    },

    "before:git:commit": "npm test",

    "after:release": "echo 已推送 v${version} ",
  },
};
