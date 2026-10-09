import { describe, it, expect } from 'vitest'
import { createRequire } from 'node:module'
import { analyzePhone, analyzeId, nextRound } from '../src/yijing.js'

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
  it('流派選項：連續的 0 算伏位', () => {
    expect(analyzePhone('1003').map(r => r.pair)).toEqual(['11', '33'])
    expect(analyzePhone('1003', { zeroRule: 'keepDouble' }).map(r => [r.pair, r.name])).toEqual([['11', '伏位'], ['00', '伏位'], ['33', '伏位']])
  })
  it('流派選項：中間的 0 跳過並標為隱藏，頭尾的 0 仍是伏位', () => {
    const skip = n => analyzePhone(n, { zeroRule: 'skipMiddle' }).map(r => (r.hidden ? r.pair + '隱' : r.pair))
    expect(skip('806')).toEqual(['86隱'])
    expect(skip('8006')).toEqual(['86隱'])
    expect(skip('0912')).toEqual(['99', '91', '12'])
    expect(skip('120')).toEqual(['12', '22'])
    expect(analyzePhone('806').map(r => r.pair)).toEqual(['88', '66'])
  })
  it('搜尋連結指向該星的 Google 搜尋', () => {
    expect(analyzePhone('19')[0].url).toBe('https://www.google.com/search?q=' + encodeURIComponent('易經 延年'))
  })
})

describe('analyzeId', () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const id = () => letters[Math.floor(Math.random() * 26)] + digits(9)

  it('星的結果與原版一致', () => {
    compareWithLegacy(id, legacy.id, analyzeId, r => (Array.isArray(r) ? r.slice(0, 2) : [r.pair, r.name]))
  })
  it('小寫字母等同大寫', () => {
    expect(analyzeId('a123456789')).toEqual(analyzeId('A123456789'))
  })
  it('第一組管 0–13 歲，之後每組 5 年', () => {
    expect(analyzeId('A123456789').slice(0, 3).map(r => [r.from, r.to])).toEqual([[0, 13], [13, 18], [18, 23]])
  })
  it('年齡依原始位置計算：被 5 併掉的組併入前一組，後面的年齡不往前擠', () => {
    // 01 11 12 23 34 45 56 67 78 89：45+56 → 46，管兩組的年齡
    const ages = Object.fromEntries(analyzeId('A123456789').map(r => [r.pair, [r.from, r.to]]))
    expect(ages['46']).toEqual([33, 43])
    expect(ages['67']).toEqual([43, 48])
    expect(ages['89']).toEqual([53, 58])
  })
  it('年齡區間從 0 歲連續到最後一組，不留空檔', () => {
    for (const input of ['A155005559', 'Z950513000', 'B100055501', 'A123456789']) {
      for (const zeroRule of ['standard', 'keepDouble', 'skipMiddle']) {
        const rs = analyzeId(input, { zeroRule })
        expect(rs[0].from, input).toBe(0)
        expect(rs.at(-1).to, input).toBe(58)
        rs.forEach((r, i) => i > 0 && expect([rs[i - 1].to, rs[i - 1].from], input).toContain(r.from))
      }
    }
  })
})

describe('nextRound', () => {
  it('走完一輪後從第一組重頭排，年齡接續上一輪不留空檔', () => {
    const first = analyzeId('A123456789')
    const second = nextRound(first)
    expect(second.map(r => r.pair)).toEqual(first.map(r => r.pair))
    expect(second[0].from).toBe(first.at(-1).to)
    expect(second.map(r => [r.from, r.to])).toEqual(first.map(r => [r.from + 58, r.to + 58]))
  })
  it('沒有結果時回傳空陣列', () => {
    expect(nextRound([])).toEqual([])
  })
})
