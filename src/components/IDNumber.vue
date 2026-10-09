<script setup>
import { ref, computed } from 'vue'
import { zeroRule } from '../settings.js'
import ZeroRule from './ZeroRule.vue'
import StarCard from './StarCard.vue'
import { analyzeId } from '../yijing.js'

const id = ref('')
const card = ref(null)
const results = computed(() => analyzeId(id.value, { zeroRule: zeroRule.value }))
</script>

<template lang='pug'>
.idInfo
  h2 請輸入您的身分證字號
  h4 算人生際遇
  input#idNum(v-model='id' type='text' maxlength=10 aria-label='身分證字號' autocomplete='off' autocapitalize='characters')
  ZeroRule
  .idResult
    .idResultText(v-for='(r, i) in results' :key='i')
      h3 {{ r.pair }}
      button.star(type='button' :class='{ unlucky: !r.lucky }' @click='card.open(r)') {{ r.name }}{{ r.hidden ? '（隱）' : '' }}
      h5.level(v-if='r.level') {{ r.level }}級
      h3 {{ r.from }}
      h3 |
      h3 {{ r.to }}
      h4 歲
  StarCard(ref='card')
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
      .star
        border none
        background none
        padding 0
        cursor pointer
        font-size 1rem
        -webkit-writing-mode vertical-lr
        writing-mode vertical-lr
        font-weight bold
        color #8b1a1a
        &.unlucky
          color #333
      .level
        font-weight normal
        font-size 0.75rem
        text-align center
</style>
