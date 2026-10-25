// 河洛理數：八字 → 天數地數 → 先天卦 → 元堂爻 → 後天卦
// 規則依網路資料整理，各家分歧與我們的取捨記在 docs/research/heluo.md
import L from 'lunar-javascript'
import ZHOUYI from './zhouyi.json'
// 白話依常見解釋整理，不是原典
import PLAIN from './zhouyiPlain.json'

// 天干：納甲洛書數；地支：河圖生成數（一支同時給一奇一偶）
const STEM_NUM = { 甲: 6, 乙: 2, 丙: 8, 丁: 7, 戊: 1, 己: 9, 庚: 3, 辛: 4, 壬: 6, 癸: 2 }
const BRANCH_NUMS = {
  子: [1, 6], 亥: [1, 6], 寅: [3, 8], 卯: [3, 8], 巳: [2, 7], 午: [2, 7],
  申: [4, 9], 酉: [4, 9], 辰: [5, 10], 戌: [5, 10], 丑: [5, 10], 未: [5, 10]
}
const YANG_STEMS = '甲丙戊庚壬'
export const BRANCHES = '子丑寅卯辰巳午未申酉戌亥'

// 洛書數→卦；爻由下往上，1 為陽爻
const TRIGRAM_BY_NUM = { 1: '坎', 2: '坤', 3: '震', 4: '巽', 6: '乾', 7: '兌', 8: '艮', 9: '離' }
const LINES = { 乾: [1, 1, 1], 兌: [1, 1, 0], 離: [1, 0, 1], 震: [1, 0, 0], 巽: [0, 1, 1], 坎: [0, 1, 0], 艮: [0, 0, 1], 坤: [0, 0, 0] }
// 卦的全名：上下卦相同叫「乾為天」，否則「天風姤」
const NATURE = { 乾: '天', 坤: '地', 震: '雷', 巽: '風', 坎: '水', 離: '火', 艮: '山', 兌: '澤' }
const trigramOf = lines => Object.keys(LINES).find(k => LINES[k].join() === lines.join())

export const OPTIONS = {
  // 上下卦：依性別與年干陰陽（馥靈之鑰）或天數一律在上（華易網範例）
  order: ['byGender', 'tianUpper'],
  // 下元（1984–2043）餘 5：男寄離女寄兌（CSDN）或陽年寄離陰年寄兌（華易網）
  lowerFive: ['byGender', 'byYear']
}

// 天數超過 25 減 25、地數超過 30 減 30，再取個位；個位是 0 時取十位（我們的取捨，出處沒寫）
export function reduce(sum, base) {
  let n = sum
  while (n > base) n -= base
  const units = n % 10
  return units === 0 ? Math.floor(n / 10) : units
}

// 三元：每 60 年一元，1864 起上元、1924 起中元、1984 起下元，循環 180 年
const yuanOf = year => ['上元', '中元', '下元'][Math.floor((((year - 1864) % 180) + 180) % 180 / 60)]

// 餘 5 沒有卦，依三元寄宮。中元的出處有誤字，依「陽男陰女寄艮、陰男陽女寄坤」補正
function lodgeFive(year, male, yangYear, lowerFive) {
  const yuan = yuanOf(year)
  if (yuan === '上元') return male ? '艮' : '坤'
  if (yuan === '中元') return male === yangYear ? '艮' : '坤'
  if (lowerFive === 'byYear') return yangYear ? '離' : '兌'
  return male ? '離' : '兌'
}

// 元堂爻（1–6，由下往上）：子至巳為陽時從陽爻起子，午至亥為陰時從陰爻起午。
// 同陰陽的爻不超過 3 個就飛兩遍，再飛另一種爻；4 個以上飛一遍。
// 純陽或純陰卦遇到相反的時辰沒有可起的爻，出處沒寫，暫由初爻往上依序數
export function yuanTang(lines, hourIndex) {
  const polarity = hourIndex < 6 ? 1 : 0
  const same = [0, 1, 2, 3, 4, 5].filter(i => lines[i] === polarity)
  const other = [0, 1, 2, 3, 4, 5].filter(i => lines[i] !== polarity)
  const order = same.length === 0 ? other : same.length <= 3 ? [...same, ...same, ...other] : [...same, ...other]
  return order[hourIndex % 6] + 1
}

// 後天卦：元堂爻陰陽互變，上下卦對調；元堂跟著換到另一個卦裡的同一位置
export function toHoutian(lines, position) {
  const flipped = lines.map((v, i) => (i === position - 1 ? 1 - v : v))
  return {
    lines: [...flipped.slice(3), ...flipped.slice(0, 3)],
    position: position <= 3 ? position + 3 : position - 3
  }
}

function hexagram(lines, position) {
  const lower = trigramOf(lines.slice(0, 3))
  const upper = trigramOf(lines.slice(3))
  const { name, judgment, lines: texts } = ZHOUYI.hexagrams[upper + lower]
  const fullName = upper === lower ? `${name}為${NATURE[upper]}` : `${NATURE[upper]}${NATURE[lower]}${name}`
  const plain = PLAIN.hexagrams[name]
  return { name, fullName, upper, lower, lines, judgment, position, lineText: texts[position - 1], summary: plain.summary, linePlain: plain.lines[position - 1] }
}

// date：'YYYY-MM-DD'（國曆）；hourIndex：0 子時 … 11 亥時；gender：'male' | 'female'
export function heluo(date, hourIndex, gender, { order = 'byGender', lowerFive = 'byGender' } = {}) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date ?? '')
  if (!m || !(hourIndex >= 0 && hourIndex < 12) || !['male', 'female'].includes(gender)) return null
  const [y, mo, d] = m.slice(1).map(Number)
  // 取時辰中間的整點；子時用當天 00:30，避開晚子時換日的爭議
  const hour = hourIndex === 0 ? 0 : hourIndex * 2
  const ec = L.Solar.fromYmdHms(y, mo, d, hour, 30, 0).getLunar().getEightChar()
  const pillars = [ec.getYear(), ec.getMonth(), ec.getDay(), ec.getTime()]

  const numbers = pillars.flatMap(p => [STEM_NUM[p[0]], ...BRANCH_NUMS[p[1]]])
  const tianSum = numbers.filter(n => n % 2).reduce((a, b) => a + b, 0)
  const diSum = numbers.filter(n => n % 2 === 0).reduce((a, b) => a + b, 0)
  const tianNum = reduce(tianSum, 25)
  const diNum = reduce(diSum, 30)

  const male = gender === 'male'
  const yangYear = YANG_STEMS.includes(pillars[0][0])
  // 八字的年以立春為界，三元也依這個年份：年柱和同年年中不同，就是立春前出生
  const yearForYuan = pillars[0] === L.Solar.fromYmd(y, 6, 1).getLunar().getEightChar().getYear() ? y : y - 1
  const pick = n => (n === 5 ? lodgeFive(yearForYuan, male, yangYear, lowerFive) : TRIGRAM_BY_NUM[n])
  const tianGua = pick(tianNum)
  const diGua = pick(diNum)
  const tianOnTop = order === 'tianUpper' || male === yangYear
  const [upper, lower] = tianOnTop ? [tianGua, diGua] : [diGua, tianGua]

  const lines = [...LINES[lower], ...LINES[upper]]
  const position = yuanTang(lines, hourIndex)
  const after = toHoutian(lines, position)
  return {
    pillars,
    numbers,
    tian: { sum: tianSum, num: tianNum, gua: tianGua },
    di: { sum: diSum, num: diNum, gua: diGua },
    yinYang: (yangYear ? '陽' : '陰') + (male ? '男' : '女'),
    yuan: yuanOf(yearForYuan),
    tianOnTop,
    xiantian: hexagram(lines, position),
    houtian: hexagram(after.lines, after.position)
  }
}
