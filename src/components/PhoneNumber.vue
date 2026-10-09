<script setup>
import { ref, computed } from 'vue'
import { zeroRule } from '../settings.js'
import ZeroRule from './ZeroRule.vue'
import StarCard from './StarCard.vue'
import { analyzePhone } from '../yijing.js'

const phone = ref('')
const card = ref(null)
const results = computed(() => analyzePhone(phone.value, { zeroRule: zeroRule.value }))
</script>

<template lang='pug'>
.phoneInfo
  h2 請輸入您的電話號碼
  input#phoneNum(v-model='phone' type='tel' inputmode='numeric' maxlength=10 aria-label='電話號碼' autocomplete='off')
  ZeroRule
  .phoneResult
    .resultText(v-for='(r, i) in results' :key='i')
      h3 {{ r.pair }}
      button.star(type='button' :class='{ unlucky: !r.lucky }' @click='card.open(r)') {{ r.name }}{{ r.hidden ? '（隱）' : '' }}
      h5.level(v-if='r.level') {{ r.level }}級
  StarCard(ref='card')
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
