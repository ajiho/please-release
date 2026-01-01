export function renderTemplate(template, ctx) {
  if (!template) return template;

  return template.replace(/\$\{(\w+)\}/g, (_, key) => {
    if (ctx[key] == null) {
      throw new Error(`Template variable "${key}" is not defined`);
    }
    return String(ctx[key]);
  });
}
