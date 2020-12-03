

<script>
export default {
  props: {
    phoneResult: Array
  },
  methods: {
    phoneCheck(e) {
      this.$emit('phoneCheck',e)
    }
  },
  mounted() {
    
  }

}
</script>


<template lang='pug'>
.phoneInfo
  h2 請輸入您的電話號碼
  h4 
  input#phoneNum(type="text" maxlength=10 @input='phoneCheck')
  .phoneResult
    .resultText(v-for='result in phoneResult')
      h3 {{result[0]}}
      h4 {{result[1]}}
</template>

<style lang='stylus' scoped>
@import '../assets/cssSetting.styl'
.phoneInfo
  background-color light_color
  size(100%,90vh)
  .phoneResult
    flexCenter()
    .resultText
      margin 0 8px
      h4
        -webkit-writing-mode vertical-lr
        writing-mode vertical-lr 
</style>