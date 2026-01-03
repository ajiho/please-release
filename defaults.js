export default {
  increments: ["patch", "minor", "major"],
  tags: ["latest", "next"],

  git: {
    commitMessage: "release: v${version}",
    tagName: "v${version}",
  },

  hooks: {},
};
