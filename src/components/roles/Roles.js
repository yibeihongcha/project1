export default {
  data () {
    return {
      rolesData: [{
        roleName: '王小虎',
        roleDesc: '上海市普陀区'
      }],
      dialogAssignRightsVisible: false,
      treeData: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'authName'
      }
    }
  },
  created () {
    this.loadRolesData()
    this.loadRightsData()
  },
  methods: {
    // 加载角色列表数据
    async loadRolesData () {
      let res = await this.$axios.get('roles')
      // console.log(res);
      this.rolesData = res.data.data
    },
    // 自定义索引
    indexMethod (index) {
      return index
    },
    // 加载权限数据
    async loadRightsData () {
      let res = await this.$axios.get('rights/tree')

      // console.log(res);
      this.treeData = res.data.data
    },
    // 显示分配权限对话框
    showAssignRightsDialog (row) {
      this.roleId = row.id

      this.dialogAssignRightsVisible = true
      // console.log(row);

      // 获取第三层的id
      let keys = []
      row.children.forEach(item1 => {
        item1.children.forEach(item2 => {
          item2.children.forEach(item3 => {
            // console.log(item3.id);
            keys.push(item3.id)
          })
        })
      })

      // DOM更新后，自动调用回调
      this.$nextTick(() => {
        // console.log(this.$refs.tree);
        this.$refs.tree.setCheckedKeys(keys)
      })
    },
    // 分配权限
    async assignRights () {
      let keys1 = this.$refs.tree.getHalfCheckedKeys()

      let keys2 = this.$refs.tree.getCheckedKeys()

      let keys = [...keys1, ...keys2]

      let res = await this.$axios.post(`roles/${this.roleId}/rights`, {
        rids: keys.join(',')
      })

      if (res.data.meta.status === 200) {
        this.dialogAssignRightsVisible = false

        this.$message({
          message: '角色授权成功',
          type: 'success',
          duration: 800
        })

        this.loadRolesData()
      }
    }
  }
}
