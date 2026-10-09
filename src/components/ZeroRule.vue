<script setup>
import { zeroRule } from '../settings.js'

const rules = [
  { value: 'standard', label: '0 變伏位' },
  { value: 'keepDouble', label: '00 也算伏位' },
  { value: 'skipMiddle', label: '中間 0 跳過' }
]
</script>

<template lang='pug'>
fieldset.zeroRule
  legend 零的算法
  label(v-for='r in rules' :key='r.value' :class='{ on: zeroRule === r.value }')
    input(type='radio' name='zeroRule' :value='r.value' v-model='zeroRule')
    | {{ r.label }}
</template>

<style lang='stylus' scoped>
@import '../assets/cssSetting.styl'

// 選中的流派像用朱筆圈起來
.zeroRule
  border none
  display flex
  flex-wrap wrap
  justify-content center
  align-items center
  gap 4px
  margin 0 0 12px
  font-size 0.9rem
  legend
    width 100%
    text-align center
    margin-bottom 2px
    font-weight 900
  label
    position relative
    padding 6px 10px
    border 2px solid transparent
    border-radius 50%
    cursor pointer
    color ink_soft
    transition color 0.2s, border-color 0.2s
    &:hover
      color ink
    &.on
      border-color red
      color ink
      font-weight 900
    &:has(input:focus-visible)
      outline 2px solid red
      outline-offset 2px
  input
    position absolute
    opacity 0
    pointer-events none
</style>
