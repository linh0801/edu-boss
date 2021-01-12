<template>
  <div class="header">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar size="medium" :src="userInfo.portrait || require('@/assets/default-avatar.png')"></el-avatar>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>{{userInfo.userName}}</el-dropdown-item>
        <el-dropdown-item @click.native="logout"> 退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { getUserInfo } from '@/service/user'
@Component
export default class AppHeader extends Vue {
  userInfo = {}
  created () {
    this.loadUserInfo()
    this.loadUserInfo()
  }

  async loadUserInfo () {
    const { data } = await getUserInfo()
    this.userInfo = data.content
  }

  logout () {
    this.$confirm('即将退出系统, 是否继续?', '退出示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      // 清除store 容器中的user
      this.$store.commit('setUser', null)
      // 返回登录页面
      this.$router.push({
        name: 'login'
      })
      this.$message({
        type: 'success',
        message: '退出成功!'
      })
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消退出'
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding: 0 15px;
  .el-dropdown-link {
    display: flex;
    align-items: center;
  }
}
</style>
