<template>
  <div class="role">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button size="mini" @click="handleAdd">添加角色</el-button>
      </div>
      <el-table :data="roles" v-loading="loading" style="width: 100%">
        <el-table-column label="编码" prop="id"> </el-table-column>
        <el-table-column prop="name" label="角色名称"> </el-table-column>
        <el-table-column prop="description" label="描述"> </el-table-column>
        <el-table-column label="添加时间">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{
              scope.row.createdTime | dateFormate
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini"
             type="text"
            @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="text"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="conditions.current"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="conditions.size"
      :disabled="loading"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
    >
    </el-pagination>
    <el-dialog
      :title="isEdit ? '编辑角色' : '添加角色'"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <create-or-update-role
        v-if="dialogVisible"
        @success="onSuccess"
        :isEdit="isEdit"
        :role-id="roleId"
        >
      </create-or-update-role>

    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getRolePages, deleteRole } from '@/service/role'
import CreateOrUpdateRole from './components/createOrUpdateRole.vue'
export default Vue.extend({
  name: 'RoleIndex',
  components: { CreateOrUpdateRole },
  data () {
    return {
      roles: [],
      loading: false,
      conditions: {
        size: 5,
        current: 1
      },
      totalCount: 0,
      isEdit: false,
      roleId: '',
      dialogVisible: false
    }
  },
  created () {
    this.loadAllRole()
  },
  methods: {
    async loadAllRole () {
      this.loading = true
      const { data } = await getRolePages(this.conditions)
      if (data.code === '000000') {
        this.roles = data.data.records
        this.totalCount = data.data.total
      }
      this.loading = false
    },
    onSuccess () {
      this.dialogVisible = false
      this.loadAllRole()
    },
    handleAdd () {
      this.isEdit = false
      this.dialogVisible = true
    },
    handleSizeChange (val: number) {
      this.conditions.size = val
      this.loadAllRole()
    },
    handleCurrentChange (val: number) {
      this.conditions.current = val
      this.loadAllRole()
    },
    handleEdit (row: any) {
      this.dialogVisible = true
      this.isEdit = true
      this.roleId = row.id
    },
    handleDelete (row: any) {
      this.$confirm('确定删除记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data } = await deleteRole(row.id)
          if (data.code === '000000') {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 重新刷新列表数据
            this.loadAllRole()
          } else {
            this.$message.error('删除失败！')
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
})
</script>

<style lang="scss" scoped></style>
