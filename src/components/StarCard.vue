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
      span.badge(:class='{ unlucky: !star.lucky }') {{ star.lucky ? '吉' : '凶' }}
      button.close(type='button' @click='dialog.close()' aria-label='關閉') ×
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
    a.more(:href='star.url' target='_blank' rel='noopener') 到 Google 搜尋更多 →
</template>

<style lang='stylus' scoped>
@import '../assets/cssSetting.styl'
.starCard
  margin auto
  width 90vw
  max-width 340px
  border none
  border-radius 12px
  padding 20px
  background-color light_color
  box-shadow 0 8px 24px rgba(0,0,0,0.25)
  line-height 1.6
  &::backdrop
    background-color rgba(0,0,0,0.4)
  header
    display flex
    align-items center
    gap 8px
    margin-bottom 4px
    h3
      font-size 1.4rem
  .badge
    padding 0 8px
    border-radius 4px
    font-size 0.85rem
    color #fff
    background-color #8b1a1a
    &.unlucky
      background-color #555
  .close
    margin-left auto
    border none
    background none
    font-size 1.6rem
    line-height 1
    cursor pointer
  .meta
    font-size 0.85rem
    color #555
  .keyword
    font-weight bold
    margin 8px 0 4px
  dl
    display grid
    grid-template-columns auto 1fr
    gap 2px 8px
    margin 8px 0 12px
    dt
      font-weight bold
  .more
    color #8b1a1a
    font-size 0.9rem
</style>
