/**
 * Review agent — controlla che un file rispetti il design system NILBU.
 *
 * Uso:
 *   node review.js ../website/src/components/ServiziScroll.jsx
 *   node review.js ../website/src/styles/servizi.css
 */

import Anthropic from '@anthropic-ai/sdk'
import { readFileSync } from 'fs'
import { claudeMd } from './_context.js'

const filePath = process.argv[2]
if (!filePath) {
  console.error('Uso: node review.js <percorso-file>')
  process.exit(1)
}

let fileContent
try {
  fileContent = readFileSync(filePath, 'utf8')
} catch {
  console.error(`File non trovato: ${filePath}`)
  process.exit(1)
}

const client = new Anthropic()

const system = `Sei un senior developer che fa code review per il sito NILBU.
Controlla che il codice rispetti il design system e le convenzioni del progetto.

Cosa verificare:
- Nessun colore hardcoded (devono usare i token CSS)
- Font corretti (Inter Tight / Inter / JetBrains Mono)
- GSAP usato correttamente (useLayoutEffect, gsap.context, ctx.revert)
- Copy in italiano
- Nessuna libreria non prevista dal progetto

Contesto progetto:
${claudeMd}`

const message = await client.messages.create({
  model: 'claude-opus-4-7',
  max_tokens: 2048,
  messages: [
    {
      role: 'user',
      content: `Fai una code review di questo file (${filePath}):\n\n\`\`\`\n${fileContent}\n\`\`\`

Elenca i problemi trovati (se ci sono) con riga e correzione suggerita. Se tutto è ok, dillo chiaramente.`,
    },
  ],
  system,
})

console.log('\n' + message.content[0].text + '\n')
