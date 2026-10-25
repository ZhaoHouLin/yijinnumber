<script setup>
import { ref, computed } from 'vue'
import RingChoice from './RingChoice.vue'
import { heluo, BRANCHES } from '../heluo.js'
import { useBirthInput } from '../birthInput.js'

const { birth, date, dateText, badDate } = useBirthInput()
const hour = ref('')
const gender = ref('')
const order = ref('byGender')
const lowerFive = ref('byGender')

const genders = [{ value: 'male', label: '男' }, { value: 'female', label: '女' }]
const orders = [{ value: 'byGender', label: '依性別與年干' }, { value: 'tianUpper', label: '天數一律在上' }]
const lowerFives = [{ value: 'byGender', label: '男寄離、女寄兌' }, { value: 'byYear', label: '陽年寄離、陰年寄兌' }]
// 子時 23–1 點、丑時 1–3 點……
const hours = [...BRANCHES].map((b, i) => ({ value: String(i), label: `${b}時（${(i * 2 + 23) % 24}–${i * 2 + 1} 點）` }))

const result = computed(() => date.value && hour.value !== '' && heluo(date.value, Number(hour.value), gender.value, { order: order.value, lowerFive: lowerFive.value }))
const PILLAR_NAMES = ['年', '月', '日', '時']
const LINE_NAMES = ['初', '二', '三', '四', '五', '上']
// 畫卦由上往下
const drawn = lines => lines.map((v, i) => ({ yang: v === 1, position: i + 1 })).reverse()
</script>

<template lang='pug'>
section.page
  input.numberInput(v-model='birth' type='text' inputmode='numeric' maxlength=10 placeholder='出生日期 例 19540601' aria-label='國曆出生日期，例如 19540601' autocomplete='bday')
  p.inputEcho(v-if='dateText') 國曆 {{ dateText }}
  p.inputEcho.error(v-else-if='badDate' role='alert') 沒有這一天，請確認年月日（例：19540601）
  label.hour
    span 出生時辰
    select(v-model='hour')
      option(value='' disabled) 請選擇
      option(v-for='h in hours' :key='h.value' :value='h.value') {{ h.label }}
  RingChoice(v-model='gender' legend='性別' name='heluoGender' :options='genders')

  template(v-if='result')
    ol.pillars(aria-label='八字')
      li(v-for='(p, i) in result.pillars' :key='i')
        small {{ PILLAR_NAMES[i] }}
        b {{ p }}

    .gua2
      section.gua(v-for='g in [{ title: "先天卦", h: result.xiantian }, { title: "後天卦", h: result.houtian }]' :key='g.title')
        h3 {{ g.title }}
        p.name {{ g.h.fullName }}
        ol.lines(:aria-label='`${g.h.fullName}，元堂在${LINE_NAMES[g.h.position - 1]}爻`')
          li(v-for='l in drawn(g.h.lines)' :key='l.position' :class='{ yin: !l.yang, yuan: l.position === g.h.position }')
            span.bar
            span.mark(v-if='l.position === g.h.position') 元堂
        p.judgment
          b 卦辭
          | {{ g.h.judgment }}
        p.lineText
          b 元堂
          | {{ g.h.lineText }}

    ol.steps
      li 八字換成數：{{ result.numbers.join('、') }}
      li 奇數加總為天數 {{ result.tian.sum }} → {{ result.tian.num }}，{{ result.tian.gua }}；偶數加總為地數 {{ result.di.sum }} → {{ result.di.num }}，{{ result.di.gua }}
      li {{ result.yinYang }}，{{ result.tianOnTop ? '天數卦在上' : '地數卦在上' }}，得先天{{ result.xiantian.fullName }}
      li {{ BRANCHES[hour] }}時，元堂在{{ LINE_NAMES[result.xiantian.position - 1] }}爻；此爻陰陽互變、上下卦對調，得後天{{ result.houtian.fullName }}

  p.note(v-else) 用出生年月日時排八字，換成天數、地數起卦，再由出生時辰定元堂爻，看一生的先天卦與後天卦（河洛理數）。

  details.options
    summary 算法選項（各家說法不同）
    RingChoice(v-model='order' legend='上下卦' name='heluoOrder' :options='orders')
    RingChoice(v-model='lowerFive' legend='1984–2043 年生，天地數餘 5' name='heluoFive' :options='lowerFives')
    p.note 規則依網路資料整理，未對照原典；卦辭、爻辭取自維基文庫《周易》。
</template>

<style lang='stylus' scoped>
@import '../assets/cssSetting.styl'

.hour
  display flex
  justify-content center
  align-items center
  gap 10px
  margin-bottom 10px
  font-size 0.9rem
  font-weight 900
  select
    min-height 44px
    padding 0 8px
    border none
    border-bottom 2px solid ink
    background none
    color ink
    font inherit
    font-weight 500
    &:focus-visible
      border-bottom-color red

// 八字：四柱直排，像曆書的干支欄
.pillars
  list-style none
  display flex
  justify-content center
  border-top 2px solid ink
  border-bottom 1px solid ink
  margin 4px 0 14px
  li
    flex 1
    display flex
    flex-direction column
    align-items center
    padding 6px 0 8px
    & + li
      border-left 1px solid ink
  small
    font-size 0.75rem
    color ink_soft
  b
    writing-mode vertical-rl
    font-size 1.5rem
    font-weight 900
    letter-spacing 0.2em

.gua2
  display grid
  grid-template-columns 1fr 1fr
  border-top 1px solid ink
  border-bottom 1px solid ink
  .gua
    padding 10px 10px 14px
    & + .gua
      border-left 1px solid ink
  h3
    font-size 0.8rem
    color ink_soft
    font-weight 500
  .name
    color red
    font-size 1.35rem
    font-weight 900
    letter-spacing 0.1em
    margin-bottom 8px

// 卦畫：陽爻一整條墨，陰爻中間斷開；元堂爻用朱紅並標字
.lines
  list-style none
  display flex
  flex-direction column
  gap 6px
  width 6.5em
  margin 0 0 12px
  li
    position relative
    display flex
    align-items center
  .bar
    width 4.5em
    height 0.55em
    background-color ink
  li.yin .bar
    background linear-gradient(90deg, ink 42%, transparent 42% 58%, ink 58%)
  li.yuan .bar
    background-color red
  li.yuan.yin .bar
    background linear-gradient(90deg, red 42%, transparent 42% 58%, red 58%)
  .mark
    margin-left 0.5em
    font-size 0.7rem
    font-weight 900
    color red
    white-space nowrap

.judgment, .lineText
  font-size 0.9rem
  line-height 1.7
  b
    display inline-flex
    align-items center
    justify-content center
    padding 0 0.3em
    margin-right 0.5em
    background-color red
    color paper
    font-size 0.8rem
    font-weight 900
.lineText
  margin-top 6px

.steps
  margin 12px 0 0
  padding-left 1.4em
  font-size 0.85rem
  line-height 1.7
  color ink_soft

.note
  text-align center
  font-size 0.85rem
  color ink_soft
  margin 6px 0 10px

.options
  margin-top 16px
  summary
    min-height 44px
    display flex
    align-items center
    cursor pointer
    gap 8px
    font-size 0.9rem
    font-weight 900
    list-style none
    &::-webkit-details-marker
      display none
    &::before
      content ''
      border-style solid
      border-width 6px 0 6px 9px
      border-color transparent transparent transparent red
      transition transform 0.2s
    &:hover
      color red
  &[open] summary::before
    transform rotate(90deg)

@media (max-width 599px)
  .gua2
    grid-template-columns 1fr
    .gua + .gua
      border-left none
      border-top 1px solid ink
</style>
