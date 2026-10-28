import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

const root = fileURLToPath(new URL("..", import.meta.url))

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith("@/")) {
    const file = path.join(root, `${specifier.slice(2)}.ts`)
    return nextResolve(pathToFileURL(file).href, context)
  }
  if (
    (specifier.startsWith("./") || specifier.startsWith("../")) &&
    !/\.(ts|js|mjs|cjs|json|node)$/.test(specifier) &&
    context.parentURL
  ) {
    const parent = fileURLToPath(context.parentURL)
    const full = path.resolve(path.dirname(parent), `${specifier}.ts`)
    return nextResolve(pathToFileURL(full).href, context)
  }
  return nextResolve(specifier, context)
}
