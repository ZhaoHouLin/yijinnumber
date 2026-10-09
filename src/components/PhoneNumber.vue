<script setup>
import { ref, computed } from 'vue'
import { analyzePhone } from '../yijing.js'

const phone = ref('')
const results = computed(() => analyzePhone(phone.value))
</script>

<template lang='pug'>
.phoneInfo
  h2 請輸入您的電話號碼
  input#phoneNum(v-model='phone' type='tel' inputmode='numeric' maxlength=10 aria-label='電話號碼' autocomplete='off')
  .phoneResult
    .resultText(v-for='(r, i) in results' :key='i')
      h3 {{ r.pair }}
      a(:href='r.url' target='_blank' rel='noopener' :class='{ unlucky: !r.lucky }') {{ r.name }}
      h5.level(v-if='r.level') {{ r.level }}級
</template>

<style lang='stylus' scoped>
@import '../assets/cssSetting.styl'
.phoneInfo
  background-color light_color
  size(100%,90vh)
  flex-grow 1
  .phoneResult
    flexCenter()
    flex-wrap wrap
    .resultText
      margin 0 8px
      a
        -webkit-writing-mode vertical-lr
        writing-mode vertical-lr
        text-decoration none
        font-weight bold
        color #8b1a1a
        &.unlucky
          color #333
      .level
        font-weight normal
        font-size 0.75rem
        text-align center
</style>
