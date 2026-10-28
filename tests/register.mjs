import { register } from "node:module"

register("./resolve-hook.mjs", {
  parentURL: import.meta.url,
})
