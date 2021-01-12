<template>
  <div class="menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click="menuCreate">添加菜单</el-button>
      </div>
      <el-table :data="menus" style="width: 100%">
        <el-table-column label="编号" type="index"> </el-table-column>
        <el-table-column prop="name" label="菜单名称"> </el-table-column>
        <el-table-column prop="level" label="菜单级数"> </el-table-column>
        <el-table-column prop="icon" label="前端图标"> </el-table-column>
        <el-table-column prop="orderNum" label="排序"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAllMenu, deleteMenu } from '@/service/menu'
export default Vue.extend({
  name: 'MenuIndex',
  data () {
    return {
      menus: []
    }
  },
  created () {
    this.loadMenuList()
  },
  methods: {
    menuCreate () {
      this.$router.push({
        name: 'menuCreate'
      })
    },
    async loadMenuList () {
      const { data } = await getAllMenu()
      if (data.code === '000000') {
        this.menus = data.data
      }
    },
    handleEdit (row: any) {
      this.$router.push({
        name: 'menuUpdate',
        params: {
          id: row.id
        }
      })
    },
    handleDelete (row: any) {
      this.$confirm('确定删除记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data } = await deleteMenu(row.id)
        if (data.code === '000000') {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          // 重新刷新列表数据
          this.loadMenuList()
        } else {
          if (data.code === '000000') {
            this.$message.error('删除失败！')
          }
        }
      }).catch(() => {
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
