# please-release

A lightweight, generic release CLI with steps and hooks.

## 配置

```js
export default {
  increments: ["patch", "minor", "major"],
  tags: ["latest", "next", "beta", "alpha", "rc"],

  git: {
    commitMessage: "release: v${version}",
    tagName: "v${version}",
    push: true,
  },

  hooks: {
    "before:selectVersion": ({ version }) => {
      console.log("Before selecting version");
    },

    "after:selectVersion": ({ version }) => {
      console.log("After selecting version", version);
    },

    "before:bump": "npm run test",

    "after:bump": ({ version, cancel }) => {
      if (version === "0.2.7") {
        cancel("User aborted");
      }
      console.log("Updated version to", version);
    },
  },
};
```
