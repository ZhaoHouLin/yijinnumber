import { describe, it, expect } from 'vitest'
import { reduce, yuanTang, toHoutian, heluo } from '../src/heluo.js'

// 爻由下往上，1 陽 0 陰
const SHI = [0, 1, 0, 0, 0, 0] // 地水師：只有九二是陽爻
const LIN = [1, 1, 0, 0, 0, 0] // 地澤臨：初、二兩陽

describe('河洛理數', () => {
  it('天數過 25、地數過 30 要減，個位為 0 時取十位', () => {
    expect([reduce(29, 25), reduce(26, 30), reduce(57, 25), reduce(20, 25), reduce(30, 30)]).toEqual([4, 6, 7, 2, 3])
  })
  it('出處例：地水師陽時，子丑落九二，寅卯辰巳依序落初、三、四、五爻', () => {
    expect([0, 1, 2, 3, 4, 5].map(h => yuanTang(SHI, h))).toEqual([2, 2, 1, 3, 4, 5])
  })
  it('出處例：兩陽爻卦，子在第一陽爻、丑在第二、寅卯又回到第一第二', () => {
    expect([0, 1, 2, 3].map(h => yuanTang(LIN, h))).toEqual([1, 2, 1, 2])
  })
  it('陰時從最下面的陰爻起午', () => {
    expect(yuanTang(SHI, 6)).toBe(1)
  })
  it('出處例：先天天風姤元堂上爻，後天變風澤中孚、元堂在三爻', () => {
    const gou = [0, 1, 1, 1, 1, 1]
    expect(toHoutian(gou, 6)).toEqual({ lines: [1, 1, 0, 0, 1, 1], position: 3 })
  })
  it('完整例（手算）：2000-01-01 午時男，八字己卯丙子戊午戊午 → 先天天風姤初六 → 後天乾為天九四', () => {
    const r = heluo('2000-01-01', 6, 'male')
    expect(r.pillars).toEqual(['己卯', '丙子', '戊午', '戊午'])
    expect(r.tian).toEqual({ sum: 29, num: 4, gua: '巽' })
    expect(r.di).toEqual({ sum: 26, num: 6, gua: '乾' })
    expect(r.yinYang).toBe('陰男') // 陰男地數卦在上
    expect(r.xiantian).toMatchObject({ name: '姤', upper: '乾', lower: '巽', position: 1 })
    expect(r.xiantian.lineText).toMatch(/^初六：/)
    expect(r.xiantian.fullName).toBe('天風姤')
    expect(r.houtian).toMatchObject({ name: '乾', fullName: '乾為天', position: 4 })
    expect(r.houtian.lineText).toMatch(/^九四：/)
  })
  it('「天數一律在上」選項會改變上下卦', () => {
    expect(heluo('2000-01-01', 6, 'male', { order: 'tianUpper' }).xiantian).toMatchObject({ upper: '巽', lower: '乾' })
  })
  it('立春前出生，八字年柱與三元都算前一年', () => {
    const r = heluo('1984-02-03', 6, 'female')
    expect(r.pillars[0]).toBe('癸亥')
    expect(r.yuan).toBe('中元')
    expect(heluo('1984-02-06', 6, 'female').yuan).toBe('下元')
  })
  it('任何生辰都得到兩個合法的卦與爻辭', () => {
    for (const date of ['1950-03-15', '1977-08-08', '1990-12-19', '2012-02-29']) {
      for (let h = 0; h < 12; h++) {
        for (const g of ['male', 'female']) {
          const r = heluo(date, h, g)
          expect(r.xiantian.lineText, `${date} ${h} ${g}`).toBeTruthy()
          expect(r.houtian.lineText).toBeTruthy()
        }
      }
    }
  })
  it('餘 5 依三元寄宮：上元男艮女坤；中元陽男陰女寄艮、陰男陽女寄坤；下元男離女兌', () => {
    const tian = (date, g, opt) => heluo(date, 6, g, opt).tian
    expect(tian('1910-02-13', 'male')).toMatchObject({ num: 5, gua: '艮' })
    expect(tian('1910-02-13', 'female')).toMatchObject({ num: 5, gua: '坤' })
    expect(tian('1950-03-07', 'male').gua).toBe('艮') // 庚寅陽男
    expect(tian('1950-03-07', 'female').gua).toBe('坤') // 陽女
    expect(tian('1950-01-10', 'male').gua).toBe('坤') // 己丑陰男
    expect(tian('1950-01-10', 'female').gua).toBe('艮') // 陰女
    expect(tian('1990-01-13', 'male').gua).toBe('離')
    expect(tian('1990-01-13', 'female').gua).toBe('兌')
  })
  it('下元「依年干」選項：陰年不分男女都寄兌', () => {
    expect(heluo('1990-01-13', 6, 'male', { lowerFive: 'byYear' }).tian.gua).toBe('兌') // 己巳年
  })
  it('輸入不完整時不算', () => {
    expect(heluo('2000-01-01', -1, 'male')).toBeNull()
    expect(heluo('2000-01-01', 6, '')).toBeNull()
  })
})
