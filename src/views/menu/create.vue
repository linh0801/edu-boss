<template>
  <div>
    <create-or-update></create-or-update>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrUpdate from './components/createOrUpdate.vue'
export default Vue.extend({
  name: 'MenuCreate',
  components: { CreateOrUpdate }
})
</script>

<style lang="scss" scoped></style>
