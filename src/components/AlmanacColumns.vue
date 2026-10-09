<script setup>
import { computed } from 'vue'

// 每組數字一欄，右起左讀；showAges 時欄寬等於該組管的年數
const props = defineProps({
  results: { type: Array, required: true },
  showAges: { type: Boolean, default: false },
  empty: { type: String, required: true }
})
defineEmits(['open'])

const DIGITS = '〇一二三四五六七八九'
const zh = n => (n < 10 ? DIGITS[n] : `${n >= 20 ? DIGITS[Math.floor(n / 10)] : ''}十${n % 10 ? DIGITS[n % 10] : ''}`)

const unique = list => [...new Set(list.map(r => r.name))].join('、')
const good = computed(() => props.results.filter(r => r.lucky))
const bad = computed(() => props.results.filter(r => !r.lucky))
</script>

<template lang='pug'>
.almanac
  template(v-if='!results.length')
    slot
    p.empty
      span {{ empty }}
  template(v-else)
    p.tally
      span 吉
        b {{ zh(good.length) }}
      span 凶
        b {{ zh(bad.length) }}
    slot
    TransitionGroup.cols(tag='ol' name='ink' :class='{ aged: showAges }')
      li(v-for='(r, i) in results' :key='i' :style='showAges ? { flexGrow: r.to - r.from } : null')
        button.col(type='button' :class='{ unlucky: !r.lucky }' @click='$emit("open", r)' :aria-label='`${r.pair} ${r.name}，${r.lucky ? "吉" : "凶"}，看說明`')
          span.pair {{ r.pair }}
          span.name {{ r.name }}
          span.hidden(v-if='r.hidden') 隱
          span.level {{ r.level ? `${r.level}級` : '' }}
          span.ages(v-if='showAges')
            | {{ r.from }}
            span.to {{ r.to }}
          span.mark {{ r.lucky ? '吉' : '凶' }}
    p.verdict
      span(v-if='good.length')
        b 宜
        | {{ unique(good) }}
      span(v-if='bad.length')
        b 忌
        | {{ unique(bad) }}
    p.hint 點任一欄看星的說明
</template>

<style lang='stylus' scoped>
@import '../assets/cssSetting.styl'

.almanac
  flex-grow 1
  display flex
  flex-direction column

.empty
  flex-grow 1
  display flex
  align-items center
  justify-content center
  min-height 240px
  padding 0 16px
  border-top 1px solid ink
  border-bottom 1px solid ink
  background-image linear-gradient(90deg, transparent calc(100% - 1px), rgba(27,27,27,0.18) 0)
  background-size 11.111% 100%
  color ink_soft
  text-align center
  span
    background-color paper
    padding 6px 4px

.tally
  display flex
  justify-content center
  gap 1.5em
  font-size 1rem
  margin-bottom 10px
  b
    margin-left 0.3em
    color red
    font-weight 900
    font-size 1.35rem

.cols
  flex-grow 1
  list-style none
  display flex
  flex-direction row-reverse
  border-top 2px solid ink
  border-bottom 1px solid ink
  li
    flex 1 1 0
    min-width 0
    border-left 1px solid ink
    &:last-child
      border-left none

.col
  width 100%
  height 100%
  min-height 240px
  display flex
  flex-direction column
  align-items center
  gap 6px
  padding 8px 0 10px
  border none
  background none
  color ink
  font inherit
  cursor pointer
  transition background-color 0.2s
  &:hover
    background-color rgba(176,30,35,0.08)
  &.unlucky
    hatch()
    &:hover
      background-color rgba(27,27,27,0.06)
  .pair
    align-self stretch
    text-align center
    padding-bottom 6px
    border-bottom 1px solid ink
    font-size 1.05rem
    font-weight 900
  .name
    writing-mode vertical-rl
    flex-grow 1
    display flex
    align-items center
    font-size 1.5rem
    font-weight 900
    letter-spacing 0.35em
  .hidden
    ring(ink_soft)
    width 1.5em
    height 1.5em
    border-width 1px
    font-size 0.7rem
  .level
    min-height 1.2em
    font-size 0.75rem
    color ink_soft
  .ages
    display flex
    flex-direction column
    align-items center
    font-size 0.8rem
    line-height 1.2
    .to::before
      content ''
      display block
      width 1px
      height 8px
      margin 2px auto
      background-color ink_soft
  .mark
    ring(red)
    width 1.9em
    height 1.9em
    font-size 0.95rem
    font-weight 900
  &.unlucky .mark
    ring(ink)

// 流年頁在手機上有 5 年的窄欄，整列圈註一起縮，維持水平對齊
@media (max-width 599px)
  .aged .col .mark
    width 1.6em
    height 1.6em
    font-size 0.8rem

.verdict
  display flex
  flex-wrap wrap
  gap 4px 1.5em
  margin-top 10px
  font-size 0.9rem
  b
    display inline-flex
    align-items center
    justify-content center
    width 1.6em
    height 1.6em
    margin-right 0.5em
    background-color red
    color paper
    font-weight 900

.hint
  margin-top 4px
  font-size 0.8rem
  color ink_soft

// 新的一欄像墨跡印上：先暈開再清楚，吉凶圈隨後蓋下
.ink-enter-active
  transition opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s cubic-bezier(0.16, 1, 0.3, 1)
  .mark
    animation stamp 0.35s 0.2s cubic-bezier(0.16, 1, 0.3, 1) backwards
.ink-enter-from
  opacity 0
  filter blur(4px)

@keyframes stamp
  from
    transform scale(1.6)
    opacity 0

@media (prefers-reduced-motion reduce)
  .ink-enter-active
    transition none
    .mark
      animation none

@media (min-width 800px)
  .col
    min-height 280px
    .name
      font-size 1.8rem
</style>
