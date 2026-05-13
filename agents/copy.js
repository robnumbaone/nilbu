/**
 * Copy agent — genera copy in italiano per il sito NILBU.
 *
 * Uso:
 *   node copy.js "hero della pagina chi siamo, tono diretto e umano"
 *   node copy.js "card servizio siti web, 1 tagline + 2 righe descrizione"
 */

import Anthropic from '@anthropic-ai/sdk'
import { claudeMd } from './_context.js'

const brief = process.argv.slice(2).join(' ')
if (!brief) {
  console.error('Uso: node copy.js "<brief>"')
  process.exit(1)
}

const client = new Anthropic()

const system = `Sei il copywriter di NILBU, una web agency italiana premium.
Scrivi sempre in italiano. Tono: diretto, moderno, niente frasi fatte o superlative inutili.
Il copy deve essere breve, concreto e adatto a un pubblico di business.

Contesto progetto:
${claudeMd}`

const message = await client.messages.create({
  model: 'claude-opus-4-7',
  max_tokens: 1024,
  messages: [
    {
      role: 'user',
      content: `Scrivi il copy per: ${brief}\n\nFornisci solo il testo finale, senza spiegazioni.`,
    },
  ],
  system,
})

console.log('\n' + message.content[0].text + '\n')
