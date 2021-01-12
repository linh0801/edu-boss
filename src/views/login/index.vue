<template>
<div class="longin-container">
  <header class="sys-name">Edu 管理系统</header>
  <div class="login-form">
    <el-form ref="form"
    label-position="top"
    :rules="rules"
    :model="form"
    label-width="80px">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" :loading="isLoginLoading" type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { login } from '@/service/user'
import { ElForm } from 'element-ui/types/form'
import { mapMutations } from 'vuex'
export default Vue.extend({
  name: 'LoginIndex',
  data () {
    return {
      form: {
        phone: '15510792995',
        password: '111111'
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      },
      isLoginLoading: false
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    async login () {
      this.isLoginLoading = true
      try {
      // 表单校验
        await (this.$refs.form as ElForm).validate()
        // 请求数据
        const result = await login(this.form)
        const data = result.data
        if (data.state !== 1) {
          return this.$message.error(data.message)
        } else {
          this.$message.success('登录成功')
          // 用户信息存储到store 容器
          this.setUser(data.content)
          // 跳转到之前要访问的页面，默认跳转到首页
          const redirectPath = this.$route.query.redirect
          this.$router.push(redirectPath as string || '/')
        }
      } catch (exception) {
        console.log('登录失败', exception)
      } finally {
        this.isLoginLoading = false
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.longin-container {
  width:300px;
  margin: 2rem auto;
  .sys-name {
    font-size: 3rem;
    margin: 2rem 0;
  }
  .login-form {
    display: flex;
    align-items: center;
    border-radius:4px;
    background: #fff;
    justify-content: center;
    .login-btn {
      width: 220px;
    }
  }
}
</style>
