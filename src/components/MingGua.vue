<script setup>
import { ref, computed } from 'vue'
import RingChoice from './RingChoice.vue'
import StarCard from './StarCard.vue'
import AlmanacColumns from './AlmanacColumns.vue'
import { mingGua, parseBirth } from '../bazhai.js'

const birth = ref('')
const gender = ref('')
const card = ref(null)
const genders = [{ value: 'male', label: '男' }, { value: 'female', label: '女' }]
const date = computed(() => parseBirth(birth.value))
const dateText = computed(() => {
  if (!date.value) return ''
  const [y, m, d] = date.value.split('-').map(Number)
  return `${y} 年 ${m} 月 ${d} 日`
})
// 打滿 8 碼還不是日期才提示，打到一半不吵
const badDate = computed(() => !date.value && birth.value.replace(/\D/g, '').length >= 8)
const gua = computed(() => date.value && mingGua(date.value, gender.value))
const genderText = computed(() => (gender.value === 'male' ? '男' : '女'))
// 拿生氣方當例子，說明每欄的星怎麼來
const example = computed(() => gua.value?.directions.find(d => d.name === '生氣'))
</script>

<template lang='pug'>
section.page
  input.numberInput(v-model='birth' type='text' inputmode='numeric' maxlength=10 placeholder='出生日期 例 19540601' aria-label='國曆出生日期，例如 19540601' autocomplete='bday')
  p.date(v-if='dateText') 國曆 {{ dateText }}
  p.date.error(v-else-if='badDate' role='alert') 沒有這一天，請確認年月日（例：19540601）
  AlmanacColumns(:results='gua ? gua.directions : []' :tally='false' empty='填出生日期與性別，排出八個方位的吉凶' @open='card.open($event)')
    RingChoice(v-model='gender' legend='性別' name='gender' :options='genders')
    template(v-if='gua')
      p.gua
        b {{ gua.name }}
        | 命・{{ gua.group }}
      ol.steps
        li
          | {{ gua.effectiveYear }} 年{{ genderText }}命，九年一輪數到 
          b {{ gua.cycle }}
          template(v-if='gua.cycle === 5') （5 在中宮沒有卦，{{ genderText }}命改用 {{ gua.number }}）
          | ，{{ gua.number }} 是{{ gua.name }}卦
        li
          | 你的 {{ gua.number }} 配上各方位的卦數就是那一欄，例如{{ example.label }} {{ example.pair[1] }} → 
          b {{ example.pair }}
          |  {{ example.name }}
        li(v-if='gua.effectiveYear !== Number(date.slice(0, 4))') 立春前出生，所以算前一年
        li(v-else-if='gua.onLichun') 生在立春當天，若在交節時刻之前出生，要改算前一年
    p.note(v-else) 這是八宅風水：看住家哪個方位對你吉、哪個凶，不是算一生運勢。只用出生年（月日只用來判斷是否在立春前）與性別
  p.explain(v-if='gua') 方位是從住家或房間的中心往外看的方向。八宅常見的用法：大門、臥室、床頭、書桌放在吉方；廁所、儲藏室放凶方。
  StarCard(ref='card')
</template>

<style lang='stylus' scoped>
@import '../assets/cssSetting.styl'

.gua
  text-align center
  font-size 1.1rem
  margin-bottom 4px
  b
    ring(red)
    width 2.2em
    height 2.2em
    margin-right 0.4em
    font-size 1.35rem
    font-weight 900

.date
  text-align center
  margin -4px 0 10px
  color ink_soft
  &.error
    color red

.explain
  margin-top 8px
  font-size 0.9rem
  line-height 1.7

.steps
  margin 0 auto 10px
  padding-left 1.4em
  max-width 30em
  font-size 0.85rem
  line-height 1.7
  color ink_soft
  b
    color red
    font-weight 900

.note
  text-align center
  font-size 0.85rem
  color ink_soft
  margin 0 0 10px
</style>
