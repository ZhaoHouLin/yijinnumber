<script setup>
import { ref, computed } from 'vue'
import { analyzeId } from '../yijing.js'

const id = ref('')
const results = computed(() => analyzeId(id.value))
</script>

<template lang='pug'>
.idInfo
  h2 請輸入您的身分證字號
  h4 算人生際遇
  input#idNum(v-model='id' type='text' maxlength=10 aria-label='身分證字號' autocomplete='off' autocapitalize='characters')
  .idResult
    .idResultText(v-for='(r, i) in results' :key='i')
      h3 {{ r.pair }}
      a(:href='r.url' target='_blank' rel='noopener' :class='{ unlucky: !r.lucky }') {{ r.name }}
      h5.level(v-if='r.level') {{ r.level }}級
      h3 {{ r.from }}
      h3 |
      h3 {{ r.to }}
      h4 歲
</template>

<style lang='stylus' scoped>
@import '../assets/cssSetting.styl'
.idInfo
  background-color dark_color
  size(100%,90vh)
  flex-grow 1
  .idResult
    flexCenter()
    flex-wrap wrap
    .idResultText
      margin 0 8px
      h3,h4,h5
        margin 2px 0
        text-align center
      h4
        -webkit-writing-mode vertical-lr
        writing-mode vertical-lr
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
