<template>
    <el-form ref="form"  :model="form" label-width="80px">
      <el-form-item label="资源名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="资源路径" prop="url">
        <el-input v-model="form.url"></el-input>
      </el-form-item>
      <el-form-item label="资源分类" prop="categoryId">
        <el-select v-model="form.categoryId">
              <el-option
                v-for="item of categorys"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
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
import { saveOrUpdateResource, getResource } from '@/service/resource'
import { ElForm } from 'element-ui/types/form'
export default Vue.extend({
  name: 'CreateOrUpdateResource',
  data () {
    return {
      form: {
        name: '',
        url: '',
        categoryId: '',
        description: ''
      }
    }
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    categorys: {
      type: Array
    },
    resourceId: {
      type: Number
    }
  },
  created () {
    if (this.isEdit && this.resourceId) {
      this.getResource()
    }
  },
  methods: {
    async getResource () {
      const { data } = await getResource(this.resourceId)
      if (data.code === '000000') {
        this.form = data.data
      }
    },
    async onSubmit () {
      // 提交数据
      try {
        const { data } = await saveOrUpdateResource(this.form)
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
