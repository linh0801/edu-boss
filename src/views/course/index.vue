<template>
  <cource-list />
</template>

<script lang="ts">
import Vue from 'vue'
import CourceList from './components/CourceList.vue'
export default Vue.extend({
  name: 'CourseIndex',
  components: {
    CourceList
  }
})
</script>

<style lang="scss" scoped></style>
