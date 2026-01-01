#!/usr/bin/env node
import { release } from "./index.js";

release().catch((err) => {
  console.error(err);
  process.exit(1);
});
