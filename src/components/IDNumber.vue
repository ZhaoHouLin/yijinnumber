<script setup>
import { ref, computed } from 'vue'
import { zeroRule } from '../settings.js'
import ZeroRule from './ZeroRule.vue'
import StarCard from './StarCard.vue'
import AlmanacColumns from './AlmanacColumns.vue'
import { analyzeId, nextRound } from '../yijing.js'

const id = ref('')
const card = ref(null)
const results = computed(() => analyzeId(id.value, { zeroRule: zeroRule.value }))
const second = computed(() => nextRound(results.value))
</script>

<template lang='pug'>
section.page
  input.numberInput(v-model='id' type='text' maxlength=10 aria-label='身分證字號' placeholder='輸入身分證字號' autocomplete='off' autocapitalize='characters')
  AlmanacColumns(:results='results' show-ages empty='輸入身分證字號後，每一欄是一段流年' @open='card.open($event)')
    ZeroRule
    p.note 算人生際遇，年齡以虛歲計；欄寬即管的年數
  details.round(v-if='second.length')
    summary 第二輪：{{ second[0].from }} 歲起，從頭再排
    AlmanacColumns(:results='second' show-ages empty='' @open='card.open($event)')
  StarCard(ref='card')
</template>

<style lang='stylus' scoped>
@import '../assets/cssSetting.styl'

.note
  text-align center
  font-size 0.85rem
  color ink_soft
  margin -4px 0 10px

.round
  flex-shrink 0
  margin-top 20px
  summary
    display flex
    align-items center
    gap 8px
    min-height 44px
    cursor pointer
    font-weight 900
    list-style none
    &::-webkit-details-marker
      display none
    &::before
      content ''
      width 0
      height 0
      border-style solid
      border-width 6px 0 6px 9px
      border-color transparent transparent transparent red
      transition transform 0.2s
    &:hover
      color red
  &[open] summary
    margin-bottom 8px
    &::before
      transform rotate(90deg)
</style>
