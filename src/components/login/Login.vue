<template>
  <!-- 登录页 -->
  <el-row
    type="flex"
    justify="center"
    align="middle"
  >
    <el-col :span="8">
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        class="demo-ruleForm"
      >
        <el-form-item
          label="用户名"
          prop="username"
        >
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>

        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="startLogin"
          >登录</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>

</template>

<script>
/* eslint-disable */

export default {
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 校验规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 登录
    startLogin() {
      // console.log('登录成功了')
      this.$refs.loginForm.validate(async valid => {
        if (!valid) {
          this.$message({
            message: '校验失败',
            type: 'error',
            duration: 800
          })
          return
        }
        // console.log('校验成功');
        let res = await this.$axios.post('login', this.loginForm)

        this.$axios.post('login', this.loginForm).then(res => {
          // console.log(res)
          if (res.data.meta.status === 200) {
            console.log(res.data.data.token)
            localStorage.setItem('token', res.data.data.token)

            this.$message({
              message: '登录成功',
              type: 'success',
              duration: 800
            })
            this.$router.push('/home')
          } else {
            this.$message({
              message: '登录失败',
              type: 'error',
              duration: 800
            })
          }

          // if (res.data.meta.status === 200) {
          //   console.log(res.data.data.token)
          //   localStorage.setItem('token', res.data.data.token)

          //   this.$message({
          //     message: '登录成功',
          //     type: 'success',
          //     duration: 800
          //   })
          //   this.$router.push('/home')
          // } else {
          //   this.$message({
          //     message: '登录失败',
          //     type: 'error',
          //     duration: 800
          //   })
          // }
        })
      })
    },
    // submitForm() {
    //   this.$refs.validate((valid) => {
    //     if (valid) {
    //       alert('submit!');
    //     } else {
    //       console.log('error submit!!');
    //       return false;
    //     }
    //   });
    // },

    // 重置按钮
    resetForm() {
      this.$refs.loginForm.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.el-row {
  height: 100%;
  background: #2d434c;

  .el-form {
    background: #fff;
    padding: 20px 30px;
    border-radius: 20px;
  }
}
</style>
