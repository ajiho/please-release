import { execa } from "execa";

export async function runHook(hook, context) {
  if (!hook) return;

  // string：当作 shell 命令
  if (typeof hook === "string") {
    await execa(hook, { stdio: "inherit", shell: true });
    return;
  }

  // function
  if (typeof hook === "function") {
    await hook(context);
    return;
  }

  // array
  if (Array.isArray(hook)) {
    for (const h of hook) {
      await runHook(h, context);
    }
  }
}
