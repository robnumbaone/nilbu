/**
 * Component agent — genera un componente React + CSS per il sito NILBU.
 *
 * Uso:
 *   node component.js "card team member con foto, nome, ruolo"
 *   node component.js "sezione FAQ con accordion animato GSAP"
 */

import Anthropic from '@anthropic-ai/sdk'
import { claudeMd } from './_context.js'

const brief = process.argv.slice(2).join(' ')
if (!brief) {
  console.error('Uso: node component.js "<descrizione componente>"')
  process.exit(1)
}

const client = new Anthropic()

const system = `Sei un senior React developer che lavora sul sito di NILBU.
Generi componenti JSX + CSS che rispettano rigorosamente il design system del progetto.

Regole:
- Usa SEMPRE i token CSS del design system (--ink, --paper, --accent, --mute, --line-dk, ecc.)
- Font: Inter Tight per headline, Inter per body, JetBrains Mono per label
- Nessun colore hardcoded tranne quelli già nel design system
- Animazioni con GSAP (useLayoutEffect + gsap.context + ctx.revert)
- Copy sempre in italiano
- Niente librerie UI esterne

Contesto progetto:
${claudeMd}`

const message = await client.messages.create({
  model: 'claude-opus-4-7',
  max_tokens: 4096,
  messages: [
    {
      role: 'user',
      content: `Crea il componente React per: ${brief}

Fornisci:
1. Il file JSX completo (NomeComponente.jsx)
2. Il file CSS completo (nomeComponente.css)

Solo il codice, senza spiegazioni.`,
    },
  ],
  system,
})

console.log('\n' + message.content[0].text + '\n')
