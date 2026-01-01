import { execa } from "execa";
import { CancelledError } from "./errors.js";
import { renderTemplate } from "./utils/template.js";

function createHookContext(ctx) {
  return {
    ...ctx,

    cancel(message) {
      throw new CancelledError(message);
    },
  };
}

export async function runHook(hook, ctx) {
  if (!hook) return;

  const hookCtx = createHookContext(ctx);

  // string：shell 命令
  if (typeof hook === "string") {
    const cmd = renderTemplate(hook, ctx);
    await execa(cmd, { shell: true, stdio: "inherit" });
    return;
  }

  // function
  if (typeof hook === "function") {
    await hook(hookCtx);
    return;
  }

  // array
  if (Array.isArray(hook)) {
    for (const h of hook) {
      await runHook(h, ctx); // 继续传原始 ctx
    }
  }
}
