import { ref, computed } from 'vue'
import { parseBirth } from './bazhai.js'

// 出生日期輸入框：直接打 8 碼（19540601），也接受各種分隔符
export function useBirthInput() {
  const birth = ref('')
  const date = computed(() => parseBirth(birth.value))
  const dateText = computed(() => {
    if (!date.value) return ''
    const [y, m, d] = date.value.split('-').map(Number)
    return `${y} 年 ${m} 月 ${d} 日`
  })
  // 打滿 8 碼還不是日期才提示，打到一半不吵
  const badDate = computed(() => !date.value && birth.value.replace(/\D/g, '').length >= 8)
  return { birth, date, dateText, badDate }
}
