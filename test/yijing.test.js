import { describe, it, expect } from 'vitest'
import { createRequire } from 'node:module'
import { analyzePhone, analyzeId } from '../src/yijing.js'

const legacy = createRequire(import.meta.url)('./legacy.cjs')

// 重構不能改變算命結果：與原版演算法逐一比對（原版會崩潰的輸入除外）
function compareWithLegacy(gen, legacyFn, newFn, toRow) {
  let compared = 0
  for (let n = 0; n < 20000; n++) {
    const input = gen()
    let expected
    try {
      expected = legacyFn(input)
    } catch {
      continue
    }
    if (expected.some(r => r === undefined)) continue
    expect(newFn(input).map(toRow), input).toEqual(expected.map(toRow))
    compared++
  }
  expect(compared).toBeGreaterThan(15000)
}

const digits = len => Array.from({ length: len }, () => Math.floor(Math.random() * 10)).join('')
// 偏重 0 與 5，才能覆蓋到特殊規則
const biased = len => Array.from({ length: len }, () => '0551923'[Math.floor(Math.random() * 7)]).join('')
const randLen = () => 2 + Math.floor(Math.random() * 9)

describe('analyzePhone', () => {
  it('與原版結果一致（隨機號碼）', () => {
    compareWithLegacy(() => digits(randLen()), legacy.phone, analyzePhone, r => (Array.isArray(r) ? r.slice(0, 2) : [r.pair, r.name]))
  })
  it('與原版結果一致（大量 0/5 的號碼）', () => {
    compareWithLegacy(() => biased(randLen()), legacy.phone, analyzePhone, r => (Array.isArray(r) ? r.slice(0, 2) : [r.pair, r.name]))
  })
  it('5 在中間會被跳過，0 會變伏位', () => {
    expect(analyzePhone('0912345678').map(r => r.pair)).toEqual(['99', '91', '12', '23', '34', '46', '67', '78'])
  })
  it('忽略分隔符與零寬字元，不再崩潰', () => {
    expect(analyzePhone('0912-345​678')).toEqual(analyzePhone('0912345678'))
  })
  it('單組以 5 開頭的號碼不崩潰（原版 TypeError）', () => {
    expect(() => legacy.phone('51')).toThrow()
    expect(analyzePhone('51').map(r => r.pair)).toEqual(['11'])
  })
  it('來源範例：0 一律變伏位、5 頭尾伏位中間跳過、19 夾 5 重複', () => {
    const pairs = n => analyzePhone(n).map(r => r.pair)
    expect(pairs('74031')).toEqual(['74', '44', '33', '31'])
    expect(pairs('5249')).toEqual(['22', '24', '49'])
    expect(pairs('12567')).toEqual(['12', '26', '67'])
    expect(pairs('49513')).toEqual(['49', '91', '19', '91', '13'])
    expect(pairs('81597')).toEqual(['81', '19', '91', '19', '97'])
  })
  it('標出吉凶與能量等級', () => {
    const [tianyi, liusha, fuwei] = analyzePhone('1388')
    expect(tianyi).toMatchObject({ pair: '13', name: '天醫', lucky: true, level: 1 })
    expect(liusha).toMatchObject({ pair: '38', name: '六煞', lucky: false, level: 3 })
    expect(fuwei).toMatchObject({ pair: '88', name: '伏位', lucky: true, level: null })
  })
  it('搜尋連結指向該星的 Google 搜尋', () => {
    expect(analyzePhone('19')[0].url).toBe('https://www.google.com/search?q=' + encodeURIComponent('易經 延年'))
  })
})

describe('analyzeId', () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const id = () => letters[Math.floor(Math.random() * 26)] + digits(9)

  it('與原版結果一致（年齡區間除第一組起點外不變）', () => {
    compareWithLegacy(id, legacy.id, analyzeId, r => (Array.isArray(r) ? [r[0], r[1], r[4]] : [r.pair, r.name, r.to]))
  })
  it('小寫字母等同大寫', () => {
    expect(analyzeId('a123456789')).toEqual(analyzeId('A123456789'))
  })
  it('第一組管 0–13 歲，之後每組 5 年', () => {
    expect(analyzeId('A123456789').slice(0, 3).map(r => [r.from, r.to])).toEqual([[0, 13], [13, 18], [18, 23]])
  })
})
