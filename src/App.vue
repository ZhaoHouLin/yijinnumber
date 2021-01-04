<template lang='pug'>
  #app
    transition(name='page' mode='out-in')
      router-view(:phoneResult='phoneResult' @phoneCheck='phoneCheck' :idResult='idResult' :idResultLimit='idResultLimit' @idCheck='idCheck')
    .list
      router-link(to='/PhoneNumber') 算手機能量
      router-link(to='/IDNumber') 算流年
</template>


<script>
export default {
  data() {
    return {
      phoneNum: '',
      idNum: '',
      code: {
        'A': '01',
        'B': '02',
        'C': '03',
        'D': '04',
        'E': '05',
        'F': '06',
        'G': '07',
        'H': '08',
        'I': '09',
        'J': '10',
        'K': '11',
        'L': '12',
        'M': '13',
        'N': '14',
        'O': '15',
        'P': '16',
        'Q': '17',
        'R': '18',
        'S': '19',
        'T': '20',
        'U': '21',
        'V': '22',
        'W': '23',
        'X': '24',
        'Y': '25',
        'Z': '26'
      },
      numData: {
        0:{
          name: '伏位',
          num: ["11","22","33","44","66","77","88","99","00","55"],
          searchUrl: 'https://www.google.com.tw/search?sxsrf=ALeKk03bdwORn-GjJP1a3jcEIxnFaZLfRA%3A1609738447488&ei=z6jyX8GmHZ6Rr7wPmZqIiAQ&q=%E6%98%93%E7%B6%93+%E4%BC%8F%E4%BD%8D&oq=%E6%98%93%E7%B6%93+%E4%BC%8F%E4%BD%8D&gs_lcp=CgZwc3ktYWIQAzICCAA6BAgAEEdQqpsnWN6sJ2DOridoAHACeACAAYQBiAHFApIBAzEuMpgBAKABAaABAqoBB2d3cy13aXrIAQjAAQE&sclient=psy-ab&ved=0ahUKEwiByt-Cx4HuAhWeyIsBHRkNAkEQ4dUDCA0&uact=5'
        },
        1:{
          name: '延年',
          num: ["19","26","34","43","62","78","87","91"],
          searchUrl: 'https://www.google.com.tw/search?sxsrf=ALeKk01EK2j-2gzA0bwSbBcX_TMPZV8kXg%3A1609740617751&ei=SbHyX8e6LcObmAX-z6vwDQ&q=%E6%98%93%E7%B6%93+%E5%BB%B6%E5%B9%B4&oq=%E6%98%93%E7%B6%93+%E5%BB%B6%E5%B9%B4&gs_lcp=CgZwc3ktYWIQAzIECCMQJ1DNWljNWmCXYWgAcAB4AIABhwGIAeMBkgEDMS4xmAEAoAECoAEBqgEHZ3dzLXdpesABAQ&sclient=psy-ab&ved=0ahUKEwiHg86Nz4HuAhXDDaYKHf7nCt4Q4dUDCA0&uact=5'
        },
        2:{
          name: '生氣',
          num: ["14","28","39","41","67","76","82","93"],
          searchUrl:'https://www.google.com.tw/search?sxsrf=ALeKk03bplJbfPexageQH0MVBvSD9XUPwg%3A1609740202311&ei=qq_yX-rMEqWImAW8uqGoAw&q=%E6%98%93%E7%B6%93+%E7%94%9F%E6%B0%A3&oq=%E6%98%93%E7%B6%93+%E7%94%9F%E6%B0%A3&gs_lcp=CgZwc3ktYWIQAzICCAA6BAgjECdQi54KWIueCmCDpQpoAHAAeACAAYUBiAHpAZIBAzAuMpgBAKABAqABAaoBB2d3cy13aXrAAQE&sclient=psy-ab&ved=0ahUKEwjqycHHzYHuAhUlBKYKHTxdCDUQ4dUDCA0&uact=5'
        },
        3:{
          name: '天醫',
          num: ["13","27","31","49","68","72","86","94"],
          searchUrl:'https://www.google.com.tw/search?sxsrf=ALeKk00x-kF-mkuD4V8Q3kqblqfYCFqUWA%3A1609740458405&ei=qrDyX4-cGI7c0gTevqugDg&q=%E6%98%93%E7%B6%93+%E5%A4%A9%E9%86%AB&oq=%E6%98%93%E7%B6%93+%E5%A4%A9%E9%86%AB&gs_lcp=CgZwc3ktYWIQAzIECCMQJzoFCCEQoAFQ7L0JWPfOCWDb1gloAnAAeACAAXuIAZQDkgEDMi4ymAEAoAECoAEBqgEHZ3dzLXdpesABAQ&sclient=psy-ab&ved=0ahUKEwiPmdDBzoHuAhUOrpQKHV7fCuQQ4dUDCA0&uact=5'
        },
        4:{
          name: '禍害',
          num: ["17","23","32","46","64","71","89","98"],
          searchUrl:'https://www.google.com.tw/search?sxsrf=ALeKk01qgcGAzOzFQLRNuFkxV6uQgBSFNw%3A1609740385149&ei=YbDyX_DkCLLFmAXu3IPgAQ&q=%E6%98%93%E7%B6%93+%E7%A6%8D%E5%AE%B3&oq=%E6%98%93%E7%B6%93+%E7%A6%8D%E5%AE%B3&gs_lcp=CgZwc3ktYWIQAzICCAA6BAgjECc6BQgAEM0CULB5WPSFAWCliwFoAXAAeACAAaMBiAHmA5IBAzEuM5gBAKABAqABAaoBB2d3cy13aXrAAQE&sclient=psy-ab&ved=0ahUKEwiwmdmezoHuAhWyIqYKHW7uABwQ4dUDCA0&uact=5'
        },
        5:{
          name: '六煞',
          num: ["16","29","38","47","61","74","83","92"],
          searchUrl:'https://www.google.com.tw/search?sxsrf=ALeKk03Ezd7hQDy2ujcP1sSl31KRUV2iVg%3A1609740403720&ei=c7DyX7bKK6ummAWlsLm4Cw&q=%E6%98%93%E7%B6%93+%E5%85%AD%E7%85%9E&oq=%E6%98%93%E7%B6%93+%E5%85%AD%E7%85%9E&gs_lcp=CgZwc3ktYWIQAzICCAA6BAgjECdQr2VYr2VgrmtoAXAAeACAAWyIAZ8CkgEDMS4ymAEAoAECoAEBqgEHZ3dzLXdpesABAQ&sclient=psy-ab&ved=0ahUKEwj2z8anzoHuAhUrE6YKHSVYDrcQ4dUDCA0&uact=5'
        },
        6:{
          name: '絕命',
          num: ["12","21","37","48","69","73","84","96"],
          searchUrl:'https://www.google.com.tw/search?sxsrf=ALeKk03-riZV9TQLr9amU9Zo-R1NdQ0Mig%3A1609740418184&ei=grDyX_bhCpDU0gTCyrO4Cg&q=%E6%98%93%E7%B6%93+%E7%B5%95%E5%91%BD&oq=%E6%98%93%E7%B6%93+%E7%B5%95%E5%91%BD&gs_lcp=CgZwc3ktYWIQAzICCAA6BAgjECdQpI4BWKSOAWDPqwFoAXAAeACAAWKIAYECkgEBM5gBAKABAqABAaoBB2d3cy13aXrAAQE&sclient=psy-ab&ved=0ahUKEwj2qrmuzoHuAhUQqpQKHULlDKcQ4dUDCA0&uact=5'
        },
        7:{
          name: '五鬼',
          num: ["18","24","36","42","63","79","81","97"],
          searchUrl:'https://www.google.com.tw/search?sxsrf=ALeKk032jL0CCQv7ujOPFGITywTUvElbxw%3A1609740440878&ei=mLDyX9eKNYLWmAXQ576gCw&q=%E6%98%93%E7%B6%93+%E4%BA%94%E9%AC%BC&oq=%E6%98%93%E7%B6%93+%E4%BA%94%E9%AC%BC&gs_lcp=CgZwc3ktYWIQAzICCAA6BAgjECdQ2HtY2Htgy4IBaABwAHgAgAFYiAH2AZIBATOYAQCgAQKgAQGqAQdnd3Mtd2l6wAEB&sclient=psy-ab&ved=0ahUKEwjXtqK5zoHuAhUCK6YKHdCzD7QQ4dUDCA0&uact=5'
        }
      },
      checkResultData: [],
      phoneResult: [],
      idResult:[],
      idCheckData1: [],
      idCheckData2: [],
      idCheckResultData: []

    }
  },
  methods: {
    phoneCheck(event) {
      this.checkResultData=[]
      if(event.target.composing) {
        return
      }
      this.phoneNum = event.target.value.trim()
      this.phoneNum = this.phoneNum.replace("\\u200B","")
      const data1 = []
      for(let i=0;i<this.phoneNum.length-1;i++){
        data1.push(this.phoneNum[i]+this.phoneNum[i+1])
      }

      this.phoneResult = this.remove0055(data1)
    },
    remove0055(data1) {
      const data2 = data1.filter(element => {
        return element !=='55' && element !=='00'
      })
      // console.log(this.check5(data2))
      return this.check5(data2)
    },
    check5(data2) {
      const data3 = []
      // 5在1&9之間要重複19一次
      for(let i=0;i<data2.length;i++){
        if(data2[i] == "95" && data2[i+1] == "51"){
          data3.push("91")
          data3.push("19")
        }else if(data2[i] == "51" && data2[i-1] == "95"){
          data3.push("91")
        }else if(data2[i] == "15" && data2[i+1] == "59"){
          data3.push("19")
          data3.push("91")
        }else if(data2[i] == "59" && data2[i-1] == "15"){
          data3.push("19")
        }

        // 雙位數字中個位數字有5並且不是最後一組數字
        else if(data2[i].split("")[1] == "5" && (i !== (data2.length-1))){
          // 則data3加入 數字組中的十位數接合下一組數字組中的個位數
          data3.push(data2[i].split("")[0]+data2[i+1].split("")[1])
          // 將下一組數字刪除
          data2.splice(i+1,1)
        }
        // 檢查5在頭尾數字組要變伏位
        else if(data2[i].split("")[0] == "5" && (i == 0)){
          data3.push(data2[i+1].split("")[0]+data2[i+1].split("")[0])
        }else if(data2[i].split("")[1] == "5" && (i == (data2.length-1))){
          data3.push(data2[i].split("")[0]+data2[i].split("")[0])
          data2.splice(i+1,1)
        }
        // 其餘數字組十位數或個位數不是5就加入 checkC
        else if(data2[i].split("")[0] !== "5" || data2[i].split("")[1] !== "5"){
          data3.push(data2[i])
        }
      }
      return this.check0(data3)
    },
    check0(data3) {
      const data4 = []
      for(let i=0;i<data3.length;i++){
        // 雙位數字中個位數字有0並且不是最後一組數字
        if(data3[i].split("")[1] == "0" && (i != (data3.length-1))){
          // 則checkD加入 數字組重複十位數
          data4.push(data3[i].split("")[0]+data3[i].split("")[0])
        }
        // 雙位數字中十位數字有0並且不是最後一組數字
        else if(data3[i].split("")[0] == "0" && (i != (data3.length-1))){
          // 則data4加入 數字組重複個位數
          data4.push(data3[i].split("")[1]+data3[i].split("")[1])
        }

        // 雙位數十位數是0且是第一組
        else if(data3[i].split("")[0] == "0" && (i == 0)){
          // data4加入雙位數的個位數
          data4.push(data3[i].split("")[1]+data3[i].split("")[1])
        }
        // 雙位數十位數是0且是最後一組
        else if(data3[i].split("")[0] == "0" && (i == (data3.length-1))){
          // data4加入重複的個位數
          data4.push(data3[i].split("")[1]+data3[i].split("")[1])
        }
        // 雙位數個位數是0且是最後一組
        else if(data3[i].split("")[1] == "0" && (i == (data3.length-1))){
          // data4加入重複的十位數
          data4.push(data3[i].split("")[0]+data3[i].split("")[0])
        }else{
          // 其餘數字組加入data4   
          data4.push(data3[i])
        }
      }
      // console.log(this.checkResult(data4))
      return this.checkResult(data4)
    },
    checkResult(data4) {
      return this.checkResultData = data4.map(element => {
        for (let i in this.numData) {
          for (let j in this.numData[i].num) {
            if (element == this.numData[i].num[j]) {
              return [element,this.numData[i].name,this.numData[i].searchUrl]
            }
          }
        }
      })
    },
    upperCase(val) {
      let text = val.toUpperCase()
      return text
    },
    idTempData(text) {
      let temp = ''
      for(let i=0;i<text.length;i++) {
        temp += this.leeterToNum(text[i]) 
      }
      return temp
    },
    leeterToNum(letter) {
      for( let i in this.code) {
        if( letter == i) {
          return this.code[i]
        }
      }
      return letter
    },
    idCheck(e) {
      this.idCheckData1= []
      let val = e.target.value
      let upperCode = this.upperCase(val)
      this.idTempData(upperCode)
      let idData = this.idTempData(upperCode)
      for(let i=0;i<idData.length-1;i++){
        this.idCheckData1.push(idData[i]+idData[i+1])
      }
      let idData1 = this.idCheckData1
      this.idResult=this.remove0055(idData1)
    },
    idResultLimit(id) {
      let lowerLimit = id+1
      let upperLimit = id+13
      for(let i=0;i<this.idResult.length;i++) {
        if( id > 0 ){
          lowerLimit = id*5+8
          upperLimit = id*5+13
        } 
      }
      return [lowerLimit,upperLimit]
    }
  },

}
</script>



<style lang="stylus">
@import './assets/cssSetting.styl'
primary_color = #ffeaba
light_color = #ffffed
dark_color = #cbb88a

#app
  background-color primary_color
  size(100%,100vh)
  flexCenter()
  flex-direction column
  .phoneInfo,.idInfo
    margin-top: 10vh
    flexCenter(flex-start,center)
    flex-direction column
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
    flexCenter()
    a
      size(50%,100%)
      flexCenter()
      // border 1px solid #000
      text-decoration none
      font-size 4vh
      color #eee
      background-color dark_color
      &.router-link-exact-active
        background-color light_color
        color black
        
.page-enter-active,.page-leave-active
  transition 0.5s
.page-enter,.page-leave-to
  opacity 0  

  
  
@media screen and (min-width: 1024px)
  #app
    .phoneInfo,.idInfo
      padding 0
    .phoneInfo
      input
        border 1px solid #000
        margin 0
        margin-bottom 16px
</style>
