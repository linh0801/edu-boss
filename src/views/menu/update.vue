<template>
  <div>
    <create-or-update isEdit></create-or-update>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrUpdate from './components/createOrUpdate.vue'
export default Vue.extend({
  name: 'MenuUpdate',
  components: { CreateOrUpdate }
})
</script>

<style lang="scss" scoped></style>
