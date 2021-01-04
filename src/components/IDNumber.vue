

<script>
export default {
  props: {
    idResult: Array,
    idResultLimit: Function
  },
  methods: {
    idCheck(e) {
      this.$emit('idCheck',e)
    }
  }
}
</script>

<template lang='pug'>
.idInfo
  h2 請輸入您的身分證字號
  h4 算人生際遇
  input#idNum(type="text" maxlength=10 @input='idCheck')    
  .idResult
    .idResultText(v-for='(result,id) in idResult')
      h3 {{result[0]}}  
      a(:href="result[2]" target='_blank') {{result[1]}}
      h3 {{idResultLimit(id)[0]}}
      h3 |
      h3 {{idResultLimit(id)[1]}} 
      h4 歲

</template>

<style lang='stylus' scoped>
@import '../assets/cssSetting.styl'
.idInfo
  background-color dark_color
  size(100%,90vh)
  .idResult
    flexCenter()
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
        color #222
        font-weight bold
</style>