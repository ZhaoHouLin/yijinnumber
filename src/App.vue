<template lang='pug'>
router-view(v-slot='{ Component }')
  transition(name='page' mode='out-in')
    component(:is='Component')
nav.list
  router-link(to='/PhoneNumber') 算手機能量
  router-link(to='/IDNumber') 算流年
</template>

<style lang="stylus">
@import './assets/cssSetting.styl'

#app
  background-color primary_color
  size(100%,100vh)
  size(100%,100dvh)
  flexCenter()
  flex-direction column
  .phoneInfo,.idInfo
    padding-top 10vh
    flexCenter(flex-start,center)
    flex-direction column
    overflow-y auto
    h2
      margin 2% 0
    input
      border 1px solid #000
      text-align center
      font-size 1rem
      size(50%,30px)
      margin 2% 0
  .list
    size(100%,10vh)
    flex-shrink 0
    flexCenter()
    a
      size(50%,100%)
      flexCenter()
      text-decoration none
      font-size 4vh
      color #eee
      background-color dark_color
      &.router-link-exact-active
        background-color light_color
        color black

.page-enter-active,.page-leave-active
  transition 0.5s
.page-enter-from,.page-leave-to
  opacity 0
</style>
