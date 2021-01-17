<template>
  <div class="alloc-menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>分配资源</span>
      </div>
      <el-tree
        ref="resTree"
        :data="resources"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="checkedResouceKeys"
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
import { getAllResource, getResourceCategory, getRoleResource, allocateRoleResources } from '@/service/resource'
export default {
  name: 'allocResource',
  data () {
    return {
      resources: [],
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      },
      roleMenus: [],
      checkedResouceKeys: [],
      checkedNodes: []
    }
  },
  props: {
    roleId: {
      type: [String, Number]
    }
  },
  created () {
    this.loadResourceTreeNode()
    this.getRoleResource()
  },
  methods: {
    async loadResourceTreeNode () {
      const res = await Promise.all([getResourceCategory(), getAllResource()])
      // console.dir(res)
      // 资源分类
      const categoryNodes = res[0].data.data
      // 所有资源
      const subNodes = res[1].data.data
      categoryNodes.forEach(node => {
        const children = subNodes.filter(subNode => subNode.categoryId === node.id)
        this.resources.push({
          id: Math.random(), // 为了避免分类 ID 和资源 ID 冲突
          name: node.name,
          subMenuList: children
        })
      })
    },
    async getRoleResource () {
      const { data } = await getRoleResource(this.roleId)
      this.getCheckedResources(data.data)
    },
    getCheckedResources (resourceList) {
      resourceList.forEach(item => {
        if (item.resourceList) {
          this.getCheckedResources(item.resourceList)
        } else if (item.selected) {
          // 使用push 无法更新组件
          // this.checkedResouceKeys.push(item.id)
          this.checkedResouceKeys = [...this.checkedResouceKeys, item.id]
        }
      })
    },
    getCheckedKeys () {
      this.checkedResouceKeys = this.$refs.resTree.getCheckedKeys()
    },
    async onSave () {
      this.getCheckedKeys()
      const obj = {
        roleId: this.roleId,
        resourceIdList: this.checkedResouceKeys
      }
      await allocateRoleResources(obj)
      this.$message.success('保存成功')
      this.$router.back()
    },
    resetChecked () {
      this.$refs.resTree.setCheckedKeys([])
    }
  }

}
</script>

<style lang="scss" scoped>
.btn-grp {
  text-align: center;
}
</style>
