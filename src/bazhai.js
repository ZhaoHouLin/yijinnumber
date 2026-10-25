// 八宅命卦：由出生年（以立春為界）與性別定命卦，再看八方位各落哪顆星
// 數字易經的八星表就是八宅大遊年換成洛書數，所以直接沿用 starOf
import { starOf } from './yijing.js'

// 洛書數對應的後天八卦與方位（5 居中宮，不是卦）
export const GUA = {
  1: { name: '坎', direction: '北' },
  2: { name: '坤', direction: '西南' },
  3: { name: '震', direction: '東' },
  4: { name: '巽', direction: '東南' },
  6: { name: '乾', direction: '西北' },
  7: { name: '兌', direction: '西' },
  8: { name: '艮', direction: '東北' },
  9: { name: '離', direction: '南' }
}
const EAST = [1, 3, 4, 9]
// 依方位繞一圈：北、東北、東、東南、南、西南、西、西北
const COMPASS = [1, 8, 3, 4, 9, 2, 7, 6]

// 立春日（2 月幾日），壽星通用公式：20 世紀 C=4.6295、21 世紀 C=3.87
export function lichunDay(year) {
  const y = year % 100
  const c = year < 2000 ? 4.6295 : 3.87
  return Math.floor(y * 0.2422 + c) - Math.floor((y - 1) / 4)
}

// 命卦的年份以立春為界：立春前出生算前一年
export function guaYear(year, month, day) {
  return month < 2 || (month === 2 && day < lichunDay(year)) ? year - 1 : year
}

// 男命即該年的年紫白星（2024 年為三碧，每年退一）；女命與男命相加恆為 6（模 9）
// 1900–1999 年與常見口訣「男 (100−年尾)÷9、女 (年尾−4)÷9 取餘」相同
// 頁面要顯示計算過程，所以分成「九年一輪數到幾」與「5 改寄坤艮」兩步
export function cycleNumber(year, gender) {
  const male = (((3 + 2024 - year - 1) % 9) + 9) % 9 + 1
  return gender === 'male' ? male : (((5 - male) % 9) + 9) % 9 + 1
}

export function guaNumber(year, gender) {
  const n = cycleNumber(year, gender)
  if (n !== 5) return n
  return gender === 'male' ? 2 : 8 // 5 無卦：男寄坤、女寄艮
}

// 把輸入的出生日期（19540601、1954/6/1、1954-06-01…）轉成 'YYYY-MM-DD'；不是真實日期就回 null
export function parseBirth(input) {
  const s = String(input ?? '').trim()
  const m = /^(\d{4})(\d{2})(\d{2})$/.exec(s) ?? /^(\d{4})\D+(\d{1,2})\D+(\d{1,2})\D*$/.exec(s)
  if (!m) return null
  const [y, mo, d] = m.slice(1).map(Number)
  const date = new Date(Date.UTC(y, mo - 1, d))
  if (y < 1901 || date.getUTCMonth() !== mo - 1 || date.getUTCDate() !== d) return null
  return `${y}-${String(mo).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}

// date 為 'YYYY-MM-DD'；回傳命卦與八方位的星（形狀同 analyzePhone 的結果，可直接畫欄）
export function mingGua(date, gender) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date ?? '')
  if (!m || !['male', 'female'].includes(gender)) return null
  const [year, month, day] = m.slice(1).map(Number)
  const effectiveYear = guaYear(year, month, day)
  const n = guaNumber(effectiveYear, gender)
  return {
    number: n,
    cycle: cycleNumber(effectiveYear, gender),
    ...GUA[n],
    group: EAST.includes(n) ? '東四命' : '西四命',
    effectiveYear,
    onLichun: month === 2 && day === lichunDay(year),
    directions: COMPASS.map(d => ({ ...starOf(`${n}${d}`), label: GUA[d].direction }))
  }
}
