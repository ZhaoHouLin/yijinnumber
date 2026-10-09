// 易經數字能量：把號碼拆成相鄰兩位數，依 5、0 規則轉換後對照八星

// 每顆星依能量強弱分四級，levels[0] 為一級（最強）
const STARS = [
  { name: '伏位', lucky: true, levels: [['11', '22', '33', '44', '66', '77', '88', '99', '00', '55']] },
  { name: '天醫', lucky: true, levels: [['13', '31'], ['68', '86'], ['49', '94'], ['27', '72']] },
  { name: '生氣', lucky: true, levels: [['14', '41'], ['67', '76'], ['39', '93'], ['28', '82']] },
  { name: '延年', lucky: true, levels: [['19', '91'], ['78', '87'], ['34', '43'], ['26', '62']] },
  { name: '絕命', lucky: false, levels: [['12', '21'], ['69', '96'], ['48', '84'], ['37', '73']] },
  { name: '五鬼', lucky: false, levels: [['18', '81'], ['79', '97'], ['36', '63'], ['24', '42']] },
  { name: '六煞', lucky: false, levels: [['16', '61'], ['47', '74'], ['38', '83'], ['29', '92']] },
  { name: '禍害', lucky: false, levels: [['17', '71'], ['89', '98'], ['46', '64'], ['23', '32']] }
]

const STAR_BY_PAIR = new Map(
  STARS.flatMap(({ name, lucky, levels }) =>
    levels.flatMap((nums, i) => nums.map(pair => [pair, { name, lucky, level: levels.length > 1 ? i + 1 : null }]))
  )
)

const searchUrl = name => `https://www.google.com/search?q=${encodeURIComponent(`易經 ${name}`)}`

// start：該組在原始號碼中是第幾組，流年年齡依此計算
function toPairs(digits) {
  const pairs = []
  for (let i = 0; i < digits.length - 1; i++) pairs.push({ pair: digits[i] + digits[i + 1], start: i })
  return pairs
}

// 5 是加強數（橋樑）：跨過 5 把前後數字接起來；5 在頭尾則變伏位
function resolveFives(input) {
  const pairs = [...input]
  const out = []
  for (let i = 0; i < pairs.length; i++) {
    const cur = pairs[i].pair
    const prev = pairs[i - 1]?.pair
    const next = pairs[i + 1]?.pair
    const isLast = i === pairs.length - 1
    const emit = (...ps) => ps.forEach(pair => out.push({ ...pairs[i], pair }))
    // 5 在 1 與 9 之間要重複 19 一次
    if (cur === '95' && next === '51') emit('91', '19')
    else if (cur === '51' && prev === '95') emit('91')
    else if (cur === '15' && next === '59') emit('19', '91')
    else if (cur === '59' && prev === '15') emit('19')
    else if (cur[1] === '5' && !isLast) {
      emit(cur[0] + next[1])
      pairs.splice(i + 1, 1)
    }
    else if (cur[0] === '5' && i === 0) emit(cur[1] + cur[1])
    else if (cur[1] === '5' && isLast) emit(cur[0] + cur[0])
    else emit(cur)
  }
  return out
}

// 0 是隱藏數，各流派算法不同：
// standard   含 0 的組合變成另一位數的伏位（00 刪除）
// keepDouble 同上，但連續的 0（00）保留為伏位
// skipMiddle 中間的 0 直接跳過、前後數字相接並標為隱藏；頭尾的 0 仍變伏位
export const ZERO_RULES = ['standard', 'keepDouble', 'skipMiddle']

function resolveZeros(pairs, zeroRule) {
  const out = []
  for (let i = 0; i < pairs.length; i++) {
    const { pair: cur, start } = pairs[i]
    const next = pairs[i + 1]?.pair
    if (zeroRule === 'skipMiddle' && cur[0] !== '0' && cur[1] === '0' && next && next[0] === '0' && next[1] !== '0') {
      out.push({ pair: cur[0] + next[1], start, hidden: true })
      i++
    }
    else if (cur[1] === '0') out.push({ pair: cur[0] + cur[0], start })
    else if (cur[0] === '0') out.push({ pair: cur[1] + cur[1], start })
    else out.push({ pair: cur, start })
  }
  return out
}

function analyzeDigits(digits, { zeroRule = 'standard' } = {}) {
  const pairs = toPairs(digits).filter(({ pair }) => pair !== '55' && (pair !== '00' || zeroRule === 'keepDouble'))
  return resolveZeros(resolveFives(pairs), zeroRule)
    .filter(({ pair }) => STAR_BY_PAIR.has(pair))
    .map(({ pair, start, hidden = false }) => {
      const star = STAR_BY_PAIR.get(pair)
      return { pair, start, hidden, ...star, url: searchUrl(star.name) }
    })
}

export function analyzePhone(input, options) {
  return analyzeDigits(String(input).replace(/\D/g, ''), options)
}

// 身分證字母轉兩位數：A=01 … Z=26（數字易經流派用法，非內政部的 A=10）
const letterToDigits = ch => String(ch.charCodeAt(0) - 64).padStart(2, '0')

// 原始第 i 組的流年（虛歲）：第一組管 0–13 歲，之後每組管 5 年
const ageFrom = i => (i === 0 ? 0 : i * 5 + 8)
const ageTo = i => i * 5 + 13

export function analyzeId(input, options) {
  const digits = String(input)
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .replace(/[A-Z]/g, letterToDigits)
  const pairCount = digits.length - 1
  const results = analyzeDigits(digits, options)
  // 每組管到下一個不同起點的前一組為止：被 5 合併或刪掉的組併入前一組，年齡不留空檔
  return results.map(({ start, ...r }, i) => {
    const nextStart = results.slice(i + 1).find(n => n.start > start)?.start ?? pairCount
    return { ...r, from: ageFrom(i === 0 ? 0 : start), to: ageTo(nextStart - 1) }
  })
}

// 流年走完一輪後從第一組重頭再排，年齡接續上一輪的最後一歲
export function nextRound(results) {
  const offset = results.at(-1)?.to ?? 0
  return results.map(r => ({ ...r, from: r.from + offset, to: r.to + offset }))
}
