<template lang='pug'>
  #app
    .phoneTitle
      h2 請輸入您的電話號碼
      h4 
      input#phoneNum(type="text" pattern="[0-9]{10}" v-model='phoneNum' @input='check')
      .phoneNumResult
        .resultOutput {{phoneNum}}
          #resultText {{numData[3][5]}}
          #resultNum
    .idTitle
      h2 請輸入您的身分證字號
      h4 算人生際遇
      input#idNum(type="text" v-model='idNum')    
      .idCardResult
        .idResultOutput
          #yearRange
          #idResultText
          #idResultNum

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
        0:["11","22","33","44","66","77","88","99","00","55"],
        1:["19","26","34","43","62","78","87","91"],
        2:["14","28","39","41","67","76","82","93"],
        3:["13","27","31","49","68","72","86","94"],
        4:["17","23","32","46","64","71","89","98"],
        5:["16","29","38","47","61","74","83","92"],
        6:["12","21","37","48","69","73","84","96"],
        7:["18","24","36","42","63","79","81","97"]
      },
      checkStep1: [],
      checkStep2: [],
      checkStep3: [],
      checkStep4: [],
      checkResult: [],
      IDcheckStep1: [],
      IDcheckStep2: [],

    }
  },
  methods: {
    check() {
      this.checkStep1=[]
      this.checkStep2=[]
      this.checkStep3=[]
      // console.log(e.target.value)
      console.log(this.phoneNum)
      for(var i=0;i<this.phoneNum.length-1;i++){
        this.checkStep1.push(this.phoneNum[i]+this.phoneNum[i+1])
      }
      const data1 = this.checkStep1
      // console.log(data1)
      this.remove0055(data1)
    },
    remove0055(data1) {
      // console.log(data1)
      this.checkStep2 = data1.filter(element => {
        return element !=='55' && element !=='00'
      })
      console.log(this.checkStep2)
      this.check5(this.checkStep2)
    },
    check5(data2) {
      for(let i=0;i<data2.length;i++){
    // -----5在1&9之間要重複19一次
        if(data2[i] == "95" && data2[i+1] == "51"){
          this.checkStep3.push("91")
          this.checkStep3.push("19")
        }else if(data2[i] == "51" && data2[i-1] == "95"){
          this.checkStep3.push("91")
        }else if(data2[i] == "15" && data2[i+1] == "59"){
          this.checkStep3.push("19")
          this.checkStep3.push("91")
        }else if(data2[i] == "59" && data2[i-1] == "15"){
          this.checkStep3.push("19")
        }
        // -----

        // 雙位數字中個位數字有5並且不是最後一組數字
        else if(data2[i].split("")[1] == "5" && (i != (data2.length-1))){
          // 則this.checkStep3加入 數字組中的個位數接合下一組數字組中的十位數
          this.checkStep3.push(data2[i].split("")[0]+data2[i+1].split("")[1])
          // 將下一組數字刪除
          data2.splice(i+1,1)
        }
        // 檢查5在頭尾數字組要變伏位
        else if(data2[i].split("")[0]=="5" && (i==0)){
          this.checkStep3.push(data2[i+1].split("")[0]+data2[i+1].split("")[0])
        }else if(data2[i].split("")[1]=="5" && (i==(data2.length-1))){
          this.checkStep3.push(data2[i].split("")[0]+data2[i].split("")[0])
          data2.splice(i+1,1)
        }
        // 其餘數字組十位數或個位數不是5就加入 checkC
        else if(data2[i].split("")[0]!="5" || data2[i].split("")[1]!="5"){
          this.checkStep3.push(data2[i])
        }
        console.log(this.checkStep3)
      }
    }
  },


}
</script>



<style lang="stylus">
@import './assets/cssSetting.styl'



</style>
