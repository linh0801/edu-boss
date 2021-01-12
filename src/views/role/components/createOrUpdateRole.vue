<template>
    <el-form ref="form"  :model="form" label-width="80px">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="角色编码" prop="code">
        <el-input v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
</template>

<script lang="ts">
import Vue from 'vue'
import { saveOrUpdateRole, getRole } from '@/service/role'
import { ElForm } from 'element-ui/types/form'
export default Vue.extend({
  name: 'CreateOrUpdateResource',
  data () {
    return {
      form: {
        name: '',
        id: '',
        description: ''
      }
    }
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    roleId: {
      type: [String, Number]
    }
  },
  created () {
    if (this.isEdit) {
      this.getRole()
    }
  },
  methods: {
    async getRole () {
      const { data } = await getRole(this.roleId)
      if (data.code === '000000') {
        this.form = data.data
      }
    },
    async onSubmit () {
      // 提交数据
      try {
        const { data } = await saveOrUpdateRole(this.form)
        if (data.code === '000000') {
          this.$message.success(data.mesg)
        } else {
          this.$message.error(data.mesg)
        }
      } catch (error) {
        this.$message.error(error)
      } finally {
        this.$emit('success')
      }
    },
    resetForm () {
      (this.$refs.form as ElForm).resetFields()
    }
  }
})
</script>

<style lang="scss" scoped></style>
