<script setup>
import { zeroRule } from '../settings.js'
import RingChoice from './RingChoice.vue'

const rules = [
  { value: 'standard', label: '0 變伏位' },
  { value: 'keepDouble', label: '00 也算伏位' },
  { value: 'skipMiddle', label: '中間 0 跳過' }
]
</script>

<template lang='pug'>
RingChoice(v-model='zeroRule' legend='零的算法' name='zeroRule' :options='rules')
</template>
