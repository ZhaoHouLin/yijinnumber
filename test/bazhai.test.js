import { describe, it, expect } from 'vitest'
import { lichunDay, guaYear, guaNumber, mingGua, parseBirth } from '../src/bazhai.js'

// 出處口訣（1900–1999 年）：男 (100−年尾)÷9、女 (年尾−4)÷9 取餘，餘 0 作 9
const folk = (year, gender) => {
  const yy = year % 100
  const r = ((gender === 'male' ? 100 - yy : yy - 4) % 9 + 9) % 9
  return r === 0 ? 9 : r
}
const noFive = (n, gender) => (n === 5 ? (gender === 'male' ? 2 : 8) : n)

describe('八宅命卦', () => {
  it('1900–1999 年與出處口訣完全一致', () => {
    for (let y = 1900; y <= 1999; y++) {
      for (const g of ['male', 'female']) expect(guaNumber(y, g), `${y} ${g}`).toBe(noFive(folk(y, g), g))
    }
  })
  it('出處例子：1954 年男命為坎', () => {
    expect(mingGua('1954-06-01', 'male')).toMatchObject({ number: 1, name: '坎', group: '東四命' })
  })
  it('跨入 2000 年後公式連續：每年退一，男女相加模 9 為 6', () => {
    expect(guaNumber(2024, 'male')).toBe(3)
    expect(guaNumber(2000, 'male')).toBe(9)
    expect(guaNumber(2000, 'female')).toBe(6)
  })
  it('5 無卦：男寄坤、女寄艮', () => {
    // 1986 年男命、1972 年女命算出來是 5
    expect(folk(1986, 'male')).toBe(5)
    expect(mingGua('1986-06-01', 'male')).toMatchObject({ cycle: 5, number: 2, name: '坤' })
    expect(folk(1972, 'female')).toBe(5)
    expect(mingGua('1972-06-01', 'female').name).toBe('艮')
  })
  it('立春日與實際曆法一致', () => {
    expect([1954, 1985, 2021, 2024, 2025].map(lichunDay)).toEqual([4, 4, 3, 4, 3])
  })
  it('命卦以立春為年界，不是元旦也不是農曆新年', () => {
    expect(guaYear(2024, 2, 3)).toBe(2023)
    expect(guaYear(2024, 2, 4)).toBe(2024)
    expect(guaYear(2024, 1, 20)).toBe(2023)
    expect(mingGua('2024-02-03', 'male').effectiveYear).toBe(2023)
    expect(mingGua('2024-02-04', 'male').onLichun).toBe(true)
  })
  it('八個方位剛好各落一顆星，本宮方位為伏位', () => {
    for (const n of ['1954', '1986', '1990', '2000']) {
      const r = mingGua(`${n}-06-01`, 'female')
      expect(new Set(r.directions.map(d => d.name)).size).toBe(8)
      expect(r.directions.find(d => d.label === r.direction).name).toBe('伏位')
    }
  })
  it('坎命：生氣在東南（14）、天醫在東（13）、延年在南（19）', () => {
    const dirs = Object.fromEntries(mingGua('1954-06-01', 'male').directions.map(d => [d.name, [d.label, d.pair]]))
    expect(dirs['生氣']).toEqual(['東南', '14'])
    expect(dirs['天醫']).toEqual(['東', '13'])
    expect(dirs['延年']).toEqual(['南', '19'])
  })
  it('日期或性別不完整時不算', () => {
    expect(mingGua('', 'male')).toBeNull()
    expect(mingGua('1990-01-01', '')).toBeNull()
  })
})

describe('出生日期輸入', () => {
  it('直接打 8 碼數字或用任何分隔符都能讀', () => {
    for (const s of ['19540601', '1954-06-01', '1954/6/1', '1954.6.1', '1954年6月1日']) expect(parseBirth(s), s).toBe('1954-06-01')
  })
  it('還沒打完或不存在的日期不算，避免算出錯的命卦', () => {
    for (const s of ['', '1954', '195406', '19540231', '19541301', '1954/2/30', '18991231']) expect(parseBirth(s), s).toBeNull()
  })
})
