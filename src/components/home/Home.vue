<template>
  <el-container>
    <!-- 页面的头部 -->
    <el-header>
      <el-row>
        <el-col :span="8">
          <img
            src="../../assets/logo.png"
            alt=""
          >
        </el-col>
        <el-col :span="8">
          <h1>电商后台管理系统</h1>
        </el-col>
        <el-col
          :span="8"
          class="col3"
        >
          <span>恭喜上海前端44期月薪2W</span>
          <a
            href="#"
            @click.prevent="logout"
          >退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <el-menu
          :router='true'
          :default-active="handleUrlPath()"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu
            v-for="item1 in menusData"
            :key="item1.id"
            :index="item1.id+''"
          >
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item1.authName }}</span>
            </template>
            <el-menu-item
              v-for="item2 in item1.children"
              :key="item2.id"
              :index="'/'+item2.path"
            >{{ item2.authName }}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      menusData: []
    }
  },
  created () {
    this.loadLeftMenusData()
  },
  methods: {
    // 动态的加载左侧的权限列表
    async loadLeftMenusData () {
      let res = await this.$axios('menus')
      // console.log(res)
      this.menusData = res.data.data
    },
    // 退出
    async logout () {
      try {
        await this.$confirm('此操作将退出该账户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        // console.log('点击了确定')
        localStorage.removeItem('token')

        this.$message({
          type: 'success',
          message: '退出成功!',
          duration: 800
        })

        // 退出到login页
        this.$router.push('/login')
      } catch (error) {
        // console.log('点击了取消')
        this.$message({
          type: 'info',
          message: '取消退出',
          duration: 800
        })
      }

      // this.$confirm('此操作将退出该账户, 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // })
      //   .then(() => {
      //     localStorage.removeItem('token')

      //     this.$message({
      //       type: 'success',
      //       message: '退出成功!',
      //       duration: 800
      //     })

      //     // 退出到login页
      //     this.$router.push('/login')
      //   })
      //   .catch(() => {
      //     this.$message({
      //       type: 'info',
      //       message: '取消退出',
      //       duration: 800
      //     })
      //   })
    },
    // 处理url路径
    handleUrlPath () {
      if (this.$route.path === 'goods-add') {
        return '/goods'
      }

      if (this.$route.path.startsWith('/users')) {
        return '/users'
      }

      return this.$route.path
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;

  .el-header {
    background: #b3c1cd;
    padding: 0;

    h1 {
      text-align: center;
      line-height: 60px;
      color: #fff;
    }
    .col3 {
      text-align: right;
      padding-right: 20px;
      line-height: 60px;

      a {
        color: #daa520;
      }
    }
  }

  .el-aside {
    background: #545c64;
  }

  .el-main {
    background: #eaeef1;
  }
}
</style>
