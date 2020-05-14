<template lang='pug'>
  #app
    .phoneTitle
      h2 請輸入您的電話號碼
      h4 
      input#phoneNum(type="text" pattern="[0-9]{10}" v-model='phoneNum' @input='check')
      .phoneNumResult
        .resultOutput(v-for='name in checkResultData')
          h3 {{name}}
          //- #resultText1
          //- #resultNum
    .idTitle
      h2 請輸入您的身分證字號
      h4 算人生際遇
      input#idNum(type="text" v-model='idNum' @input='checkID')    
      .idCardResult
        .idResultOutput
          #yearRange
          #idResultText
          #idResultNum {{idCheckData1}}

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
          num: ["11","22","33","44","66","77","88","99","00","55"]
        },
        1:{
          name: '延年',
          num: ["19","26","34","43","62","78","87","91"]
        },
        2:{
          name: '生氣',
          num: ["14","28","39","41","67","76","82","93"]
        },
        3:{
          name: '天醫',
          num: ["13","27","31","49","68","72","86","94"]
        },
        4:{
          name: '禍害',
          num: ["17","23","32","46","64","71","89","98"]
        },
        5:{
          name: '六煞',
          num: ["16","29","38","47","61","74","83","92"]
        },
        6:{
          name: '絕命',
          num: ["12","21","37","48","69","73","84","96"]
        },
        7:{
          name: '五鬼',
          num: ["18","24","36","42","63","79","81","97"]
        }
      },
      checkData1: [],
      checkData2: [],
      checkData3: [],
      checkData4: [],
      checkResultData: [],
      idCheckData1: [],
      idCheckData2: [],
      idCheckResultData: []

    }
  },
  methods: {
    check() {
      this.checkData1=[]
      this.checkData2=[]
      this.checkData3=[]
      this.checkResultData=[]
      // console.log(e.target.value)
      // console.log(this.phoneNum)
      for(let i=0;i<this.phoneNum.length-1;i++){
        this.checkData1.push(this.phoneNum[i]+this.phoneNum[i+1])
      }
      const data1 = this.checkData1
      console.log(data1)
      this.remove0055(data1)
    },
    remove0055(data1) {
      // console.log(data1)
      this.checkData2 = data1.filter(element => {
        return element !=='55' && element !=='00'
      })
      this.check5(this.checkData2)
    },
    check5(data2) {
      // 5在1&9之間要重複19一次
      for(let i=0;i<data2.length;i++){
        if(data2[i] == "95" && data2[i+1] == "51"){
          this.checkData3.push("91")
          this.checkData3.push("19")
        }else if(data2[i] == "51" && data2[i-1] == "95"){
          this.checkData3.push("91")
        }else if(data2[i] == "15" && data2[i+1] == "59"){
          this.checkData3.push("19")
          this.checkData3.push("91")
        }else if(data2[i] == "59" && data2[i-1] == "15"){
          this.checkData3.push("19")
        }
        // -----

        // 雙位數字中個位數字有5並且不是最後一組數字
        else if(data2[i].split("")[1] == "5" && (i !== (data2.length-1))){
          // 則this.checkData3加入 數字組中的十位數接合下一組數字組中的個位數
          this.checkData3.push(data2[i].split("")[0]+data2[i+1].split("")[1])
          // 將下一組數字刪除
          data2.splice(i+1,1)
        }
        // 檢查5在頭尾數字組要變伏位
        else if(data2[i].split("")[0] == "5" && (i == 0)){
          this.checkData3.push(data2[i+1].split("")[0]+data2[i+1].split("")[0])
        }else if(data2[i].split("")[1] == "5" && (i == (data2.length-1))){
          this.checkData3.push(data2[i].split("")[0]+data2[i].split("")[0])
          data2.splice(i+1,1)
        }
        // 其餘數字組十位數或個位數不是5就加入 checkC
        else if(data2[i].split("")[0] !== "5" || data2[i].split("")[1] !== "5"){
          this.checkData3.push(data2[i])
        }
        this.checkData4=[]
        this.check0(this.checkData3)
      }
    },
    check0(data3) {
      for(let i=0;i<data3.length;i++){
        // 雙位數字中個位數字有0並且不是最後一組數字
        if(data3[i].split("")[1] == "0" && (i != (data3.length-1))){
          // 則checkD加入 數字組重複十位數
          this.checkData4.push(data3[i].split("")[0]+data3[i].split("")[0])
        }
        // 雙位數字中十位數字有0並且不是最後一組數字
        else if(data3[i].split("")[0] == "0" && (i != (data3.length-1))){
          // 則this.checkData4加入 數字組重複個位數
          this.checkData4.push(data3[i].split("")[1]+data3[i].split("")[1])
        }

        // 雙位數十位數是0且是第一組
        else if(data3[i].split("")[0] == "0" && (i == 0)){
          // this.checkData4加入雙位數的個位數
          this.checkData4.push(data3[i].split("")[1]+data3[i].split("")[1])
        }
        // 雙位數十位數是0且是最後一組
        else if(data3[i].split("")[0] == "0" && (i == (data3.length-1))){
          // this.checkData4加入重複的個位數
          this.checkData4.push(data3[i].split("")[1]+data3[i].split("")[1])
        }
        // 雙位數個位數是0且是最後一組
        else if(data3[i].split("")[1] == "0" && (i == (data3.length-1))){
          // this.checkData4加入重複的十位數
          this.checkData4.push(data3[i].split("")[0]+data3[i].split("")[0])
        }else{
          // 其餘數字組加入this.checkData4   
          this.checkData4.push(data3[i])
        }
      }
      this.checkResult(this.checkData4)
    },
    checkResult(data4) {
      this.checkResultData = data4.map(element => {
        for (let i in this.numData) {
          for (let j in this.numData[i].num) {
            if (element == this.numData[i].num[j]) {
              return this.numData[i].name
            }
          }
        }
      })
    },
    upperCase(val) {
      let text = val.toUpperCase()
      let temp = ''
      for(let i=0;i<text.length;i++) {
        temp += this.findCode(text[i]) 
      }
      return temp
    },
    findCode(letter) {
      for( let i in this.code) {
        if( letter == i) {
          return this.code[i]
        } 
        return letter
      }
    },
    checkID(e) {
      this.idCheckData1= []
      let val = e.target.value
      let upperCode = this.upperCase(val)
      console.log(upperCode)
      
    }
  },
  comuted() {
  
  }

}
</script>



<style lang="stylus">
@import './assets/cssSetting.styl'


</style>
