<script setup>
import { ref, computed } from 'vue'
import RingChoice from './RingChoice.vue'
import StarCard from './StarCard.vue'
import AlmanacColumns from './AlmanacColumns.vue'
import { mingGua } from '../bazhai.js'

const birth = ref('')
const gender = ref('')
const card = ref(null)
const today = new Date().toISOString().slice(0, 10)
const genders = [{ value: 'male', label: '男' }, { value: 'female', label: '女' }]
const gua = computed(() => mingGua(birth.value, gender.value))
</script>

<template lang='pug'>
section.page
  input.numberInput(v-model='birth' type='date' min='1901-01-01' :max='today' aria-label='出生日期（國曆）')
  AlmanacColumns(:results='gua ? gua.directions : []' :tally='false' empty='填出生日期與性別，排出八個方位的吉凶' @open='card.open($event)')
    RingChoice(v-model='gender' legend='性別' name='gender' :options='genders')
    template(v-if='gua')
      p.gua
        b {{ gua.name }}
        | 命・{{ gua.group }}
      p.note
        | 以 {{ gua.effectiveYear }} 年計（命卦以立春為年界）
        template(v-if='gua.onLichun') ；生在立春當天，若在交節時刻之前出生，要改算前一年
    p.note(v-else) 八宅命卦只看國曆出生日期與性別；各方位的星與數字組合和手機頁同一張表
  StarCard(ref='card')
</template>

<style lang='stylus' scoped>
@import '../assets/cssSetting.styl'

.gua
  text-align center
  font-size 1.1rem
  margin-bottom 4px
  b
    ring(red)
    width 2.2em
    height 2.2em
    margin-right 0.4em
    font-size 1.35rem
    font-weight 900

.note
  text-align center
  font-size 0.85rem
  color ink_soft
  margin 0 0 10px
</style>
