<template>
  <div class="alloc-menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>分配菜单</span>
      </div>
      <el-tree
        ref="menuTree"
        :data="menus"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="checkedMenuKeys"
        :props="defaultProps"
      >
      </el-tree>
      <div class="btn-grp">
        <el-button type="primary" @click="onSave">保存</el-button>
        <el-button @click="resetChecked()">清空</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getMenuNodeList, getRoleMenus, allocateRoleMenus } from '@/service/menu'
export default {
  name: 'allocMenu',
  data () {
    return {
      menus: [],
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      },
      roleMenus: [],
      checkedMenuKeys: []
    }
  },
  props: {
    roleId: {
      type: [String, Number]
    }
  },
  created () {
    this.loadMenuNode()
    this.loadRoleMenus()
  },
  methods: {
    async loadMenuNode () {
      const { data } = await getMenuNodeList()
      this.menus = data.data
    },
    async loadRoleMenus () {
      const { data } = await getRoleMenus(this.roleId)
      this.roleMenus = data.data
      this.getCheckedMenus(this.roleMenus)
    },
    getCheckedMenus (menuList) {
      menuList.forEach(item => {
        if (item.subMenuList) {
          this.getCheckedMenus(item.subMenuList)
        } else if (item.selected) {
          // 使用push 无法更新组件
          // this.checkedMenuKeys.push(item.id)
          this.checkedMenuKeys = [...this.checkedMenuKeys, item.id]
        }
      })
    },
    getCheckedKeys () {
      this.checkedMenuKeys = this.$refs.menuTree.getCheckedKeys()
    },
    async onSave () {
      this.getCheckedKeys()
      const obj = {
        roleId: this.roleId,
        menuIdList: this.checkedMenuKeys
      }
      await allocateRoleMenus(obj)
      this.$router.back()
    },
    resetChecked () {
      this.$refs.menuTree.setCheckedKeys([])
    }
  }

}
</script>

<style lang="scss" scoped>
.btn-grp {
  text-align: center;
}
</style>
