<template>
  <div class="user">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :model="conditions" :inline="true" ref="filter-form">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="conditions.phone"></el-input>
        </el-form-item>
        <el-form-item label="注册时间" prop="rangeDate">
          <el-date-picker
            v-model="conditions.rangeDate"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            :disabled="loading"
            @click="handleReset"
          >重置</el-button>
          <el-button
            type="primary"
            @click="handleQuery"
            :disabled="loading"
          >查询</el-button>
        </el-form-item>
      </el-form>
      </div>
      <el-table :data="users" stripe style="width: 100%" v-loading="loading">
        <el-table-column prop="id" label="用户ID" width="180">
        </el-table-column>
        <el-table-column label="头像" width="80">
          <template slot-scope="scope">
            <img
              width="30px"
              :src="
                scope.row.portrait ||
                'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
              "
            />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="用户名" width="180">
        </el-table-column>
        <el-table-column prop="phone" label="手机号"> </el-table-column>
        <el-table-column prop="phone" label="注册时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime | dateFormate }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="状态" width="80">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-value="ENABLE"
              inactive-value="DISABLE"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :disabled="scope.row.pendding"
              @change="onChangeUserStatus(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleSelectRole(scope.row)"
              >分配角色</el-button
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
      title="分配角色"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <el-select v-model="roleIdList" multiple placeholder="请选择">
        <el-option
          v-for="item in roles"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="handleAllocRole"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getUserPages, getRoleUser, forbidUser, enableUser } from '@/service/user'
import { getAllRoles, allocRoleUsers } from '@/service/role'
import { ElForm } from 'element-ui/types/form'
export default Vue.extend({
  name: 'UserList',
  data () {
    return {
      loading: false,
      conditions: {
        phone: '',
        startCreateTime: '',
        endCreateTime: '',
        currentPage: 1,
        pageSize: 5,
        rangeDate: []
      },
      totalCount: 0,
      roles: [],
      users: [],
      dialogVisible: false,
      roleIdList: [],
      userId: 0,
      pendding: false
    }
  },
  created () {
    this.loadUserList()
    this.loadAllRole()
  },
  methods: {
    async loadAllRole () {
      const { data } = await getAllRoles()
      this.roles = data.data
    },
    async loadUserList () {
      this.loading = true
      const { rangeDate } = this.conditions
      if (rangeDate && rangeDate.length) {
        this.conditions.startCreateTime = rangeDate[0]
        this.conditions.endCreateTime = rangeDate[1]
      } else {
        this.conditions.startCreateTime = ''
        this.conditions.endCreateTime = ''
      }
      const { data } = await getUserPages(this.conditions)
      this.users = data.data.records
      this.totalCount = data.data.total
      this.loading = false
    },
    async onChangeUserStatus (row: any) {
      if (row.status === 'DISABLE') {
        const { data } = await forbidUser(row.id)
        if (data.code === '000000') {
          this.$message.success(data.mesg)
        } else {
          row.status = 'ENABLE'
          this.$message.error(data.mesg)
        }
      }
      if (row.status === 'ENABLE') {
        const { data } = await enableUser(row.id)
        if (data.code === '000000') {
          this.$message.success(data.mesg)
        } else {
          row.status = 'DISABLE'
          this.$message.error(data.mesg)
        }
      }
    },
    handleQuery () {
      this.conditions.currentPage = 1
      this.loadUserList()
    },

    handleReset () {
      (this.$refs['filter-form'] as ElForm).resetFields()
      this.loadUserList()
    },

    handleSelectRole (row: any) {
      this.dialogVisible = true
      this.userId = row.id
      this.getRoleUser()
    },
    async getRoleUser () {
      const { data } = await getRoleUser(this.userId)
      this.roleIdList = data.data.map((role: any) => role.id)
    },
    async handleAllocRole () {
      // this.roleIdList
      const params = {
        userId: this.userId,
        roleIdList: this.roleIdList
      }
      await allocRoleUsers(params)
      this.dialogVisible = false
      this.$message.success('处理成功')
    },
    handleSizeChange (val: number) {
      this.conditions.pageSize = val
      this.loadUserList()
    },
    handleCurrentChange (val: number) {
      this.conditions.currentPage = val
      this.loadUserList()
    }
  }
})
</script>

<style lang="scss" scoped></style>
