#!/usr/bin/env node
import { release } from "./index.js";
import { loadConfig } from "./config.js";
import { NAME } from "./constants/index.js";
import { logger } from "./utils/index.js";

const config = await loadConfig(NAME);

release(config).catch((err) => {
  if (err) {
    logger.error(err);
    process.exit(1);
  } else {
    process.exit(0);
  }
});
