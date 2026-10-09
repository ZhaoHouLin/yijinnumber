// 易經數字能量：把號碼拆成相鄰兩位數，依 5、0 規則轉換後對照八星

const STARS = [
  { name: '伏位', nums: ['11', '22', '33', '44', '66', '77', '88', '99', '00', '55'] },
  { name: '延年', nums: ['19', '26', '34', '43', '62', '78', '87', '91'] },
  { name: '生氣', nums: ['14', '28', '39', '41', '67', '76', '82', '93'] },
  { name: '天醫', nums: ['13', '27', '31', '49', '68', '72', '86', '94'] },
  { name: '禍害', nums: ['17', '23', '32', '46', '64', '71', '89', '98'] },
  { name: '六煞', nums: ['16', '29', '38', '47', '61', '74', '83', '92'] },
  { name: '絕命', nums: ['12', '21', '37', '48', '69', '73', '84', '96'] },
  { name: '五鬼', nums: ['18', '24', '36', '42', '63', '79', '81', '97'] }
]

const STAR_BY_PAIR = new Map(STARS.flatMap(({ name, nums }) => nums.map(n => [n, name])))

const searchUrl = name => `https://www.google.com/search?q=${encodeURIComponent(`易經 ${name}`)}`

function toPairs(digits) {
  const pairs = []
  for (let i = 0; i < digits.length - 1; i++) pairs.push(digits[i] + digits[i + 1])
  return pairs
}

// 5 是隱藏數：跨過 5 把前後數字接起來；5 在頭尾則變伏位
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

// 0 是加強數：含 0 的組合變成另一位數的伏位
function resolveZeros(pairs) {
  return pairs.map(p => {
    if (p[1] === '0') return p[0] + p[0]
    if (p[0] === '0') return p[1] + p[1]
    return p
  })
}

function analyzeDigits(digits) {
  const pairs = toPairs(digits).filter(p => p !== '55' && p !== '00')
  return resolveZeros(resolveFives(pairs))
    .filter(pair => STAR_BY_PAIR.has(pair))
    .map(pair => {
      const name = STAR_BY_PAIR.get(pair)
      return { pair, name, url: searchUrl(name) }
    })
}

export function analyzePhone(input) {
  return analyzeDigits(String(input).replace(/\D/g, ''))
}

// 身分證字母轉兩位數：A=01 … Z=26
const letterToDigits = ch => String(ch.charCodeAt(0) - 64).padStart(2, '0')

// 第一組管 1–13 歲，之後每組管 5 年
const ageRange = i => (i === 0 ? [1, 13] : [i * 5 + 8, i * 5 + 13])

export function analyzeId(input) {
  const digits = String(input)
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .replace(/[A-Z]/g, letterToDigits)
  return analyzeDigits(digits).map((r, i) => {
    const [from, to] = ageRange(i)
    return { ...r, from, to }
  })
}
