<script setup>
import { zeroRule } from '../settings.js'

const rules = [
  { value: 'standard', label: '0 變伏位' },
  { value: 'keepDouble', label: '連續 0 也算伏位' },
  { value: 'skipMiddle', label: '中間 0 跳過' }
]
</script>

<template lang='pug'>
fieldset.zeroRule
  legend 0 的算法
  label(v-for='r in rules' :key='r.value')
    input(type='radio' name='zeroRule' :value='r.value' v-model='zeroRule')
    | {{ r.label }}
</template>

<style lang='stylus' scoped>
.zeroRule
  border none
  display flex
  flex-wrap wrap
  justify-content center
  gap 4px 12px
  margin-bottom 12px
  font-size 0.85rem
  legend
    width 100%
    text-align center
    margin-bottom 4px
    font-weight bold
  label
    display flex
    align-items center
    gap 4px
    cursor pointer
</style>
