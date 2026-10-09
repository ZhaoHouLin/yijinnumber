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

function toPairs(digits) {
  const pairs = []
  for (let i = 0; i < digits.length - 1; i++) pairs.push(digits[i] + digits[i + 1])
  return pairs
}

// 5 是加強數（橋樑）：跨過 5 把前後數字接起來；5 在頭尾則變伏位
function resolveFives(input) {
  const pairs = [...input]
  const out = []
  for (let i = 0; i < pairs.length; i++) {
    const cur = pairs[i]
    const prev = pairs[i - 1]
    const next = pairs[i + 1]
    const isLast = i === pairs.length - 1
    // 5 在 1 與 9 之間要重複 19 一次
    if (cur === '95' && next === '51') out.push('91', '19')
    else if (cur === '51' && prev === '95') out.push('91')
    else if (cur === '15' && next === '59') out.push('19', '91')
    else if (cur === '59' && prev === '15') out.push('19')
    else if (cur[1] === '5' && !isLast) {
      out.push(cur[0] + next[1])
      pairs.splice(i + 1, 1)
    }
    else if (cur[0] === '5' && i === 0) out.push(cur[1] + cur[1])
    else if (cur[1] === '5' && isLast) out.push(cur[0] + cur[0])
    else out.push(cur)
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
    const cur = pairs[i]
    const next = pairs[i + 1]
    if (zeroRule === 'skipMiddle' && cur[0] !== '0' && cur[1] === '0' && next && next[0] === '0' && next[1] !== '0') {
      out.push({ pair: cur[0] + next[1], hidden: true })
      i++
    }
    else if (cur[1] === '0') out.push({ pair: cur[0] + cur[0] })
    else if (cur[0] === '0') out.push({ pair: cur[1] + cur[1] })
    else out.push({ pair: cur })
  }
  return out
}

function analyzeDigits(digits, { zeroRule = 'standard' } = {}) {
  const pairs = toPairs(digits).filter(p => p !== '55' && (p !== '00' || zeroRule === 'keepDouble'))
  return resolveZeros(resolveFives(pairs), zeroRule)
    .filter(({ pair }) => STAR_BY_PAIR.has(pair))
    .map(({ pair, hidden = false }) => {
      const star = STAR_BY_PAIR.get(pair)
      return { pair, hidden, ...star, url: searchUrl(star.name) }
    })
}

export function analyzePhone(input, options) {
  return analyzeDigits(String(input).replace(/\D/g, ''), options)
}

// 身分證字母轉兩位數：A=01 … Z=26（數字易經流派用法，非內政部的 A=10）
const letterToDigits = ch => String(ch.charCodeAt(0) - 64).padStart(2, '0')

// 第一組管 0–13 歲，之後每組管 5 年
const ageRange = i => (i === 0 ? [0, 13] : [i * 5 + 8, i * 5 + 13])

export function analyzeId(input, options) {
  const digits = String(input)
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .replace(/[A-Z]/g, letterToDigits)
  return analyzeDigits(digits, options).map((r, i) => {
    const [from, to] = ageRange(i)
    return { ...r, from, to }
  })
}
