/* eslint-disable */
export default {
  data () {
    return {
      usersData: [
        {
          username: '王小虎',
          email: 'wangxiaohu@.com',
          mobile: '123456123456'
        },
      ],
      total: 0,
      pagenum: 1,
      input3: '',
      dialogAddUserVisible: false,
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 校验规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度应该在3-5之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 10, message: '长度应该在5-10之间', trigger: 'blur' }
        ],
        email: [
          { pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '格式不正确', trigger: 'blur' }
        ],
        mobile: [
          { pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/, message: '格式不正确', trigger: 'blur' }
        ]
      },
      value1: true,
      dialogEditUserVisible: false,
      editUserForm: {
        username: '飞哥',
        email: '',
        mobile: '',
        id: 0
      },
      dialogAssignRoleVisible: false,
      assignRoleForm: {
        username: '飞哥',
        id: 0,
        rid: ''
      },
      rolesData: []
    }

  },
  created () {
    // 获取url路径中页码的值
    let page = this.$route.params.page
    // console.log(page);

    this.getUserData(page)
    this.loadRoleData()
  },
  methods: {
    // 用户信息渲染
    async getUserData (pagenum = 1, query = '') {
      let config = {
        params: {
          query,
          pagenum,
          pagesize: 3
        }
      }
      let res = await this.$axios.get('users', config)
      // console.log(res);
      this.usersData = res.data.data.users

      this.total = res.data.data.total

      this.pagenum = res.data.data.pagenum

      // this.$axios.get('users',{
      //   params:{
      //     query,
      //     pagenum,
      //     pagesize:3
      //   },
      //   // headers:{
      //   //   Authorization:localStorage.getItem('token')
      //   // }
      // })
      // .then(res => {
      //   // console.log(res);
      //   this.usersData = res.data.data.users


      //   this.total = res.data.data.total

      //   this.pagenum = res.data.data.pagenum
      // })
    },
    // 通过分页渲染
    currentPageChanged (curPage) {
      // console.log(curPage);
      // 通过编程式导航 改变入口
      this.$router.push('/users/' + curPage)

      this.getUserData(curPage, this.input3)
    },
    //模糊查询
    search () {
      this.getUserData(1, this.input3)
    },
    // 显示弹框
    showAddUserDialog () {
      this.dialogAddUserVisible = true
    },
    // 添加用户
    async addUser () {
      let res = await this.$axios.post('users', this.addUserForm)
      if (res.data.meta.status == 201) {
        this.dialogAddUserVisible = false

        this.$message({
          message: '添加用户成功',
          type: 'success',
          duration: 800
        })
        this.getUserData(1)
      }
      // this.$axios.post('users', this.addUserForm, {
      //   // headers: {
      //   //   Authorization:localStorage.getItem('token')
      //   // }
      // })
      // .then(res => {
      //   // console.log(res);

      // if (res.data.meta.status == 201) {
      //   this.dialogAddUserVisible = false

      //   this.$message({
      //     message: '添加用户成功',
      //     type: 'success',
      //     duration:800
      //   })
      //   this.getUserData(1)
      // }
      // })
    },
    // 重置弹框信息
    dialogClosed () {
      this.$refs.addUserRef.resetFields()
    },
    // 删除用户
    async delUser (id) {
      if (id != 500) {
        let res = await this.$axios.delete(`users/${id}`)
        if (res.data.meta.status == 200) {
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 800
          })
          this.getUserData(1)
        }
      } else {
        this.$message({
          message: '我是怼不掉的,哈哈',
          type: 'error',
          duration: 800
        })
      }
      // if (id != 500) {
      //   this.$axios.delete(`users/${id}`, {
      //     headers: {
      //       Authorization:localStorage.getItem('token')
      //     }
      //   })
      // .then(res => {
      //     // console.log(res);
      //     if (res.data.meta.status == 200) {
      //       this.$message({
      //         message: '删除成功',
      //         type: 'success',
      //         duration:800
      //       })
      //       this.getUserData(1)
      //     }
      //   })
      // } else {
      //   this.$message({
      //     message: '我是怼不掉的,哈哈',
      //     type: 'error',
      //     duration:800
      //   })
      // }
    },
    // 状态改变
    async stateChange (row) {
      const { id, mg_state } = row
      if (id != 500) {
        let res = await this.$axios.put(`users/${id}/state/${mg_state}`)
        if (res.data.meta.status == 200) {
          this.$message({
            message: '更新状态成功',
            type: 'success',
            duration: 800
          })
        }
      } else {
        this.$message({
          message: '点我是不行的哦-_-',
          type: 'error',
          duration: 800
        })
        row.mg_state = true
      }
      // if (id != 500) {
      //   this.$axios.put(`users/${id}/state/${mg_state}`, null, {
      //     // headers: {
      //     //   Authorization:localStorage.getItem('token')
      //     // }
      //   })
      // .then(res => {
      //     // console.log(res);
      //     //
      //     if (res.data.meta.status == 200) {
      //       this.$message({
      //         message: '更新状态成功',
      //         type: 'success',
      //         duration:800
      //       })
      //     }
      //   })
      // } else {
      //   this.$message({
      //     message: '点我是不行的哦-_-',
      //     type: 'error',
      //     duration:800
      //   })
      //   row.mg_state = true
      // }
    },
    // 显示对话框
    showEditUserDialog (row) {
      this.dialogEditUserVisible = true

      let { username, email, mobile, id } = row

      this.editUserForm.username = username

      this.editUserForm.email = email

      this.editUserForm.mobile = mobile

      this.editUserForm.id = id
    },
    // 更新用户
    async editUser () {
      let { email, mobile, id } = this.editUserForm

      let res = await this.$axios.put(`users/${id}`, {
        email,
        mobile
      })

      // console.log(res);
      if (res.data.meta.status === 200) {
        this.dialogEditUserVisible = false

        this.$message({
          message: '更新成功',
          type: 'success',
          duration: 800
        })
        this.getUserData(this.pagenum, this.input3)
      }
    },
    // 加载角色列表
    async loadRoleData () {
      let res = await this.$axios.get('roles')
      // console.log(res);
      this.rolesData = res.data.data
    },
    // 展示分配角色对话框
    async showAssignRoleDialog (row) {
      this.dialogAssignRoleVisible = true

      const { username, id } = row

      this.assignRoleForm.username = username
      this.assignRoleForm.id = id

      let res = await this.$axios.get(`users/${id}`)
      // console.log(res);
      this.assignRoleForm.rid = res.data.data.rid === -1 ? '' : res.data.data.rid
    },
    // 分配角色
    async assignRole () {
      const { id, rid } = this.assignRoleForm

      let res = await this.$axios.put(`users/${id}/role`, {
        rid
      })
      // console.log(res);
      if (res.data.meta.status === 200) {
        this.dialogAssignRoleVisible = false

        this.$message({
          message: '分配角色成功',
          type: 'success',
          duration: 800
        })
        this.getUserData(this.pagenum, this.input3)
      }
    }
  }
}
