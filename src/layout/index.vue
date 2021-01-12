<template>
  <el-container class="wrapper">
  <el-aside width="200px">
    <app-aside-bar></app-aside-bar>
  </el-aside>
  <el-container>
    <el-header>
      <app-header></app-header>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>

</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import AppAsideBar from './components/sidebar.vue'
import AppHeader from './components/header.vue'
@Component({
  components: {
    AppAsideBar,
    AppHeader
  }
})
export default class LayoutIndex extends Vue {

}
</script>

<style lang="scss" scoped>
.wrapper {
  min-width: 900px;
  min-height: 100vh;
}
</style>
