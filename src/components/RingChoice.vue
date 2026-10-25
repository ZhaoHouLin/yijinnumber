<script setup>
// 單選：legend 一行，選項排一列，選中的用朱筆圈起來
defineProps({
  legend: { type: String, required: true },
  name: { type: String, required: true },
  options: { type: Array, required: true }
})
const model = defineModel({ type: String })
</script>

<template lang='pug'>
fieldset.ringChoice
  legend {{ legend }}
  label(v-for='o in options' :key='o.value' :class='{ on: model === o.value }')
    input(type='radio' :name='name' :value='o.value' v-model='model')
    | {{ o.label }}
</template>

<style lang='stylus' scoped>
@import '../assets/cssSetting.styl'

// 選中的選項像用朱筆圈起來
.ringChoice
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
