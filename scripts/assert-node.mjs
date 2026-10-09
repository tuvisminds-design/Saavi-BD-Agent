const minimum = [26, 11, 1]
const parts = process.versions.node.split(".").map((part) => Number(part))

let older = false
for (let index = 0; index < minimum.length; index += 1) {
  const actual = parts[index] ?? 0
  const required = minimum[index]
  if (actual > required) break
  if (actual < required) {
    older = true
    break
  }
}

if (older) {
  console.error(
    `This desk needs Node.js 26.11.1 or newer. The current process is ${process.version}.`,
  )
  console.error(
    "Install it with nvm, then start the app with that binary first on PATH:",
  )
  console.error(
    '  export PATH="$HOME/.nvm/versions/node/v26.11.1/bin:$PATH" && npm run dev',
  )
  process.exit(1)
}
