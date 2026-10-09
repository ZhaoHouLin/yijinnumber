<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const pageName = computed(() => (route.name === 'IDNumber' ? '身分證' : '手機號碼'))
</script>

<template lang='pug'>
.sheet
  header.masthead
    h1 易經數字能量
    span.pageName {{ pageName }}
  main
    router-view(v-slot='{ Component }')
      transition(name='page' mode='out-in')
        component(:is='Component')
nav.tabs(aria-label='功能')
  router-link(to='/PhoneNumber') 算手機能量
  router-link(to='/IDNumber') 算流年
</template>

<style lang="stylus">
@import '@fontsource/noto-serif-tc/500.css'
@import '@fontsource/noto-serif-tc/900.css'
@import './assets/cssSetting.styl'

*
  margin 0
  padding 0
  box-sizing border-box

html
  background-color paper
  color ink
  font-family font_serif
  font-weight 500
  font-variant-numeric tabular-nums
  -webkit-text-size-adjust 100%
  scrollbar-color ink_soft paper_deep

::selection
  background-color red
  color paper

input
  caret-color red

:focus-visible
  outline 2px solid red
  outline-offset 2px

#app
  min-height 100dvh
  display flex
  flex-direction column
  padding 8px 8px 0

.sheet
  flex-grow 1
  width 100%
  max-width 760px
  margin 0 auto
  border 3px double red
  margin-bottom 8px
  padding 12px 12px 16px
  display flex
  flex-direction column

.masthead
  display flex
  justify-content space-between
  align-items center
  border-bottom 2px solid red
  padding-bottom 8px
  h1
    color red
    font-weight 900
    font-size 1.6rem
    letter-spacing 0.25em
  .pageName
    writing-mode vertical-rl
    font-weight 900
    letter-spacing 0.15em
    border-left 1px solid red
    padding-left 6px
    min-height 4.5em

main
  flex-grow 1
  display flex
  flex-direction column

.page
  flex-grow 1
  display flex
  flex-direction column

// 號碼輸入就是印出來的號碼本身
.numberInput
  display block
  width 100%
  margin 14px 0 10px
  padding 4px 0
  border none
  border-bottom 2px solid ink
  background none
  color ink
  font inherit
  font-weight 900
  font-size 2.25rem
  letter-spacing 0.12em
  text-align center
  text-transform uppercase
  &::placeholder
    color ink_soft
    font-size 1.25rem
    font-weight 500
    letter-spacing 0.2em
    text-transform none
  &:focus
    outline none
    border-bottom-color red

.tabs
  position sticky
  bottom 0
  display flex
  width calc(100% + 16px)
  margin 0 -8px
  background-color red
  a
    flex 1
    display flex
    align-items center
    justify-content center
    min-height 56px
    padding-bottom env(safe-area-inset-bottom)
    color #f6d9d9
    text-decoration none
    font-size 1.05rem
    letter-spacing 0.1em
    transition background-color 0.2s
    &:hover
      background-color red_deep
    &.router-link-exact-active
      background-color red_deep
      color #fff
      font-weight 900
    &:focus-visible
      outline-color paper
      outline-offset -6px

.page-enter-active, .page-leave-active
  transition opacity 0.25s
.page-enter-from, .page-leave-to
  opacity 0

@media (min-width 800px)
  #app
    padding-top 32px
  .sheet
    padding 20px 28px 32px
  .masthead h1
    font-size 2rem
  .tabs
    width 100%
    max-width 760px
    margin 0 auto
</style>
