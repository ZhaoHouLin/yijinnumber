// 從維基文庫《周易》抓 64 卦的卦辭與爻辭，產生 src/zhouyi.json
// 用法：node scripts/fetch-zhouyi.mjs
import { writeFileSync } from 'fs'

const raw = title => fetch(`https://zh.wikisource.org/w/index.php?title=${encodeURIComponent(title)}&action=raw`).then(r => {
  if (!r.ok) throw new Error(`${title}: HTTP ${r.status}`)
  return r.text()
})

// 去掉維基語法：-{无}- → 无、{{另|包|苞}} → 包、粗體與 HTML 標籤
const clean = s => s
  .replace(/-\{([^}]*)\}-/g, '$1')
  .replace(/\{\{另\|([^|}]*)\|[^}]*\}\}/g, '$1')
  .replace(/<[^>]+>/g, '')
  .replace(/'''/g, '')
  .trim()

const TRIGRAMS = ['乾', '兌', '離', '震', '巽', '坎', '艮', '坤']

// 速查表：列是下卦、欄是上卦
const index = await raw('周易')
const table = index.slice(index.indexOf('六十四卦速查表'))
const names = {}
const rows = table.split('\n|-').slice(1, 9)
rows.forEach((row, i) => {
  const cells = [...row.matchAll(/\[\[\/([^|\]]+)\|/g)].map(m => m[1])
  if (cells.length !== 8) throw new Error(`速查表第 ${i + 1} 列只有 ${cells.length} 格`)
  cells.forEach((name, j) => { names[`${TRIGRAMS[j]}${TRIGRAMS[i]}`] = name }) // key：上卦+下卦
})

const out = { source: 'https://zh.wikisource.org/wiki/周易（維基文庫，公有領域）', hexagrams: {} }
for (const [key, name] of Object.entries(names)) {
  const text = await raw(`周易/${name}`)
  const yi = text.slice(text.indexOf('易經：'), text.indexOf('彖曰'))
  // 多數卦辭寫「'''姤'''：女壯…」；少數卦辭以卦名開頭，如「'''履'''虎尾…」
  // 少數頁面漏了 </span>，所以收尾標籤可有可無
  const j = /^\*\*<span[^>]*>'''([^']+)'''(：?)(.+?)(?:<\/span>)?$/m.exec(yi)
  const judgment = j && [null, j[2] ? j[3] : j[1] + j[3]]
  const lines = [...yi.matchAll(/^\*#<span[^>]*>(.+?)(?:<\/span>)?$/gm)].map(m => clean(m[1])).slice(0, 6)
  if (!judgment || lines.length !== 6) throw new Error(`${name} 解析失敗`)
  out.hexagrams[key] = { name: clean(name), judgment: clean(judgment[1]), lines }
}
if (Object.keys(out.hexagrams).length !== 64) throw new Error('不是 64 卦')
writeFileSync(new URL('../src/zhouyi.json', import.meta.url), JSON.stringify(out, null, 1))
console.log('ok', Object.keys(out.hexagrams).length)
