import prompts from "prompts";
import { CancelledError } from "../errors.js";

export async function confirmPush(config, ctx) {
  const { ok } = await prompts({
    type: "confirm",
    name: "ok",
    message: "Push to remote?",
    initial: true,
  });

  if (!ok) {
    throw new CancelledError();
  }
}
