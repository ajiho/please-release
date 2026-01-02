#!/usr/bin/env node
import { release } from "./index.js";
import { loadConfig } from "./config.js";
import { NAME } from "./constants/index.js";

const config = await loadConfig(NAME);

release(config).catch((err) => {
  if (err) {
    if (err.code === "USER_CANCEL") {
      console.log("🛑 Release cancelled.");
      return;
    }
    process.exit(1);
  } else {
    process.exit(0);
  }
});
