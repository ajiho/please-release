#!/usr/bin/env node
import { release } from "./index.js";

release().catch((err) => {
  if (err) {
    if (err.code === "USER_CANCEL") {
      console.log("❌ Release cancelled.");
      return;
    }
    process.exit(1);
  } else {
    process.exit(0);
  }
});
