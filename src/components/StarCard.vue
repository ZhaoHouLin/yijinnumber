<script setup>
import { ref, computed } from 'vue'
import { STAR_INFO } from '../starInfo.js'

const dialog = ref(null)
const star = ref(null)
const info = computed(() => star.value && STAR_INFO[star.value.name])

function open(result) {
  star.value = result
  dialog.value.showModal()
}

// 點卡片外的遮罩也能關閉
function onClick(e) {
  if (e.target === dialog.value) dialog.value.close()
}

defineExpose({ open })
</script>

<template lang='pug'>
dialog.starCard(ref='dialog' @click='onClick' aria-labelledby='starCardTitle')
  .body(v-if='star')
    header
      h3#starCardTitle {{ star.name }}
      span.mark(:class='{ unlucky: !star.lucky }') {{ star.lucky ? '吉' : '凶' }}
      button.close(type='button' @click='dialog.close()' aria-label='關閉')
        svg(viewBox='0 0 20 20' width='20' height='20' aria-hidden='true')
          path(d='M4 4l12 12M16 4L4 16' stroke='currentColor' stroke-width='2' stroke-linecap='square')
    p.meta
      | 數字 {{ star.pair }}
      template(v-if='star.level')  ・能量 {{ star.level }} 級（1 級最強）
      template(v-if='star.hidden')  ・隱藏（中間有 0）
    p.keyword {{ info.keyword }}
    p {{ info.trait }}
    dl
      dt 優點
      dd {{ info.plus }}
      dt 缺點
      dd {{ info.minus }}
    a.more(:href='star.url' target='_blank' rel='noopener') 到 Google 搜尋更多
</template>

<style lang='stylus' scoped>
@import '../assets/cssSetting.styl'

.starCard
  margin auto
  width calc(100vw - 32px)
  max-width 360px
  border 3px double red
  padding 18px 20px 20px
  background-color paper
  color ink
  line-height 1.7
  &::backdrop
    background-color rgba(27,27,27,0.45)
  &[open]
    animation open 0.3s cubic-bezier(0.16, 1, 0.3, 1)
  header
    display flex
    align-items center
    gap 10px
    border-bottom 2px solid red
    padding-bottom 8px
    margin-bottom 8px
    h3
      font-size 1.8rem
      font-weight 900
      letter-spacing 0.2em
  .mark
    ring(red)
    width 2em
    height 2em
    font-weight 900
    &.unlucky
      ring(ink)
  .close
    margin-left auto
    width 44px
    height 44px
    display flex
    align-items center
    justify-content center
    border none
    background none
    color ink
    cursor pointer
    &:hover
      color red
  .meta
    font-size 0.85rem
    color ink_soft
  .keyword
    color red
    font-weight 900
    margin 8px 0 4px
  dl
    display grid
    grid-template-columns auto 1fr
    gap 2px 10px
    margin 10px 0 14px
    padding-top 10px
    border-top 1px solid ink
    dt
      font-weight 900
  .more
    color red
    font-size 0.9rem
    text-underline-offset 4px
    &:hover
      color red_deep

@keyframes open
  from
    opacity 0
    transform translateY(8px)

@media (prefers-reduced-motion reduce)
  .starCard[open]
    animation none
</style>
