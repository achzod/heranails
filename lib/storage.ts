import fs from 'fs'
import path from 'path'

export function getDataDir() {
  // Render: configure a persistent disk mounted to /var/data and set DATA_DIR=/var/data
  let dir = process.env.DATA_DIR
    ? path.resolve(process.env.DATA_DIR)
    : path.join(process.cwd(), 'data')

  try {
    if (!fs.existsSync(dir)) {
      console.log(`[Storage] Creating data directory at ${dir}`)
      fs.mkdirSync(dir, { recursive: true })
    }
  } catch (error) {
    // Fallbck: In build environments (like Render), the persistent disk might not be mounted yet.
    // We fall back to a local temporary directory so the build can succeed.
    console.warn(`[Storage] Warning: Could not create ${dir}, falling back to local data directory. Error: ${error instanceof Error ? error.message : String(error)}`)
    dir = path.join(process.cwd(), 'data')
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  }
  console.log(`[Storage] Using data directory: ${dir}`)
  return dir
}

export function ensureJsonFile(filePath: string, defaultValue: unknown) {
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, JSON.stringify(defaultValue, null, 2))
}




