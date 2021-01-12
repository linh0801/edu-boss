<template>
  <div class="resource">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="conditions" class="demo-form-inline">
          <el-form-item label="资源名称">
            <el-input
              v-model="conditions.name"
              placeholder="资源名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="资源路径">
            <el-input
              v-model="conditions.url"
              placeholder="资源路径"
            ></el-input>
          </el-form-item>
          <el-form-item label="资源分类">
            <el-select v-model="conditions.categoryId" placeholder="资源分类">
              <el-option
                v-for="item of categorys"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :disabled="loading" @click="onSubmit"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <el-button @click="handleAdd" size="mini">添加</el-button>
    </el-card>
    <el-table :data="resources" v-loading="loading" style="width: 100%">
      <el-table-column label="编号" type="index"> </el-table-column>
      <el-table-column prop="name" label="资源名称"> </el-table-column>
      <el-table-column prop="url" label="资源路径"> </el-table-column>
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
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
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
      :title="isEdit ? '编辑资源' : '添加资源'"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <create-or-update-res
        v-if="dialogVisible"
        @success="onSuccess"
        :isEdit="isEdit"
        :resourceId="editId"
        :categorys="categorys">
      </create-or-update-res>

    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getResourceCategory, getResourcePages, deleteResource } from '@/service/resource'
import CreateOrUpdateRes from './components/createOrUpdateResource.vue'
export default Vue.extend({
  name: 'ResourceIndex',
  components: {
    CreateOrUpdateRes
  },
  data () {
    return {
      resources: [],
      conditions: {
        name: '',
        url: '',
        categoryId: '',
        current: 1,
        size: 5
      },
      totalCount: 0,
      loading: true,
      categorys: [],
      dialogVisible: false,
      isEdit: false,
      editId: 0
    }
  },
  created () {
    this.loadResourceList()
    this.loadCategory()
  },
  methods: {
    onSubmit () {
      this.conditions.current = 1
      this.conditions.size = 5
      this.loadResourceList()
    },
    onSuccess () {
      this.dialogVisible = false
      this.loadResourceList()
    },
    handleAdd () {
      this.dialogVisible = true
      this.isEdit = false
    },
    async loadResourceList () {
      this.loading = true
      const { data } = await getResourcePages(this.conditions)
      if (data.code === '000000') {
        this.resources = data.data.records
        this.totalCount = data.data.total
      }
      this.loading = false
    },
    async loadCategory () {
      const { data } = await getResourceCategory()
      if (data.code === '000000') {
        this.categorys = data.data
      }
    },
    handleEdit (row: any) {
      this.isEdit = true
      this.dialogVisible = true
      this.editId = row.id
    },
    handleDelete (row: any) {
      this.$confirm('确定删除记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data } = await deleteResource(row.id)
          if (data.code === '000000') {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 重新刷新列表数据
            this.loadResourceList()
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
    },
    handleSizeChange (val: number) {
      this.conditions.size = val
      this.loadResourceList()
    },
    handleCurrentChange (val: number) {
      this.conditions.current = val
      this.loadResourceList()
    }
  }
})
</script>

<style lang="scss" scoped></style>
