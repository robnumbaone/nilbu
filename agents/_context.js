import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { join, dirname } from 'path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
export const claudeMd = readFileSync(join(root, 'CLAUDE.md'), 'utf8')
