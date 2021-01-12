<template>
  <div class="menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{isEdit ? '编辑菜单' : '新增菜单' }}</span>
      </div>
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径">
          <el-input v-model="form.href"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单">
          <el-select v-model="form.parentId" placeholder="请选择上级菜单">
            <el-option :value="-1" label="无上级菜单"></el-option>
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="item in parentMenuList"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="前端图标">
          <el-input v-model="form.icon"></el-input>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-radio-group v-model="form.shown">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number
            v-model="form.orderNum"
            :min="1"
            label="描述文字"
          ></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button v-if="!isEdit" @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { menuSaveOrUpdate, getEditMenuInfo } from '@/service/menu'
import { ElForm } from 'element-ui/types/form'
export default Vue.extend({
  name: 'CreateOrUpdate',
  data () {
    return {
      form: {
        parentId: -1, // -1 表示没有上级菜单
        name: '',
        href: '',
        icon: '',
        orderNum: 0,
        description: '',
        shown: false
      },
      parentMenuList: [], // 父级菜单列表
      rules: {
        name: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' }
        ]
      }
    }
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  created () {
    this.getEditMenuInfo()
  },
  methods: {
    async getEditMenuInfo () {
      const { data } = await getEditMenuInfo(this.$route.params.id ?? -1)
      const resData = data.data
      if (resData.menuInfo) {
        this.form = resData.menuInfo
      }
      if (data.code === '000000') {
        this.parentMenuList = data.data.parentMenuList
      }
    },
    async onSubmit () {
      // 验证
      (this.$refs.form as ElForm).validate((valid) => {
        if (valid) {
          console.log('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
      // 提交数据
      try {
        const { data } = await menuSaveOrUpdate(this.form)
        if (data.code === '000000') {
          this.$message.success(data.mesg)
          this.$router.back()
        } else {
          this.$message.error(data.mesg)
        }
      } catch (error) {
        this.$message.error(error)
      }
    },
    resetForm () {
      this.form = {
        parentId: -1, // -1 表示没有上级菜单
        name: '',
        href: '',
        icon: '',
        orderNum: 0,
        description: '',
        shown: false
      }
    }
  }
})
</script>

<style lang="scss" scoped></style>
