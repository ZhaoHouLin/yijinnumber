<script setup>
import { ref, computed } from 'vue'
import { zeroRule } from '../settings.js'
import ZeroRule from './ZeroRule.vue'
import StarCard from './StarCard.vue'
import AlmanacColumns from './AlmanacColumns.vue'
import { analyzePhone } from '../yijing.js'

const phone = ref('')
const card = ref(null)
const results = computed(() => analyzePhone(phone.value, { zeroRule: zeroRule.value }))
</script>

<template lang='pug'>
section.page
  input.numberInput(v-model='phone' type='tel' inputmode='numeric' maxlength=10 aria-label='手機號碼' placeholder='輸入手機號碼' autocomplete='off')
  AlmanacColumns(:results='results' empty='輸入號碼後，每兩位數排成一欄' @open='card.open($event)')
    ZeroRule
  StarCard(ref='card')
</template>
