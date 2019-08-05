<template>
  <div>
    <!-- 商品分类 -->
    <el-button
      type="success"
      plain
      @click="showAddCatDialog"
    >添加分类</el-button>
    <el-table
      :data="catData"
      style="width: 100%"
    >
      <el-table-column
        type="expand"
        width="50"
      >
        <template slot-scope="scope">
          <el-tree
            :data="scope.row.children"
            :props="defaultProps"
          ></el-tree>
        </template>
      </el-table-column>
      <el-table-column
        prop="cat_name"
        label="分类名称"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="cate_deleted"
        label="是否有效"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.cate_deleted?'否':'是'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="cat_level"
        label="层级"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.cat_level==0">一级</span>
          <span v-else-if="scope.row.cat_level==1">二级</span>
          <span v-else>三级</span>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加分类对话框 -->
    <el-dialog
      title="添加分类"
      :visible.sync="dialogAddCatVisible"
    >
      <el-form
        :model="addCatForm"
        label-width="80px"
      >
        <el-form-item label="分类名称">
          <el-input
            v-model="addCatForm.cat_name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="父级名称">
          <el-cascader
            v-model="addCatForm.cat_pid_arr"
            :options="options"
            clearable
            :props="defaultProps2"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogAddCatVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addCat"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      catData: [
        {
          cat_name: '王小虎',
          cate_deleted: '有效',
          cat_level: '三级'
        }
      ],
      data: [
        {
          label: '一级 1',
          children: [
            {
              label: '二级 1-1',
              children: [
                {
                  label: '三级 1-1-1'
                }
              ]
            }
          ]
        }
      ],

      options: [
        {
          value: 'ziyuan',
          label: '资源',
          children: [
            {
              value: 'axure',
              label: 'Axure Components'
            },
            {
              value: 'sketch',
              label: 'Sketch Templates'
            },
            {
              value: 'jiaohu',
              label: '组件交互文档'
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'cat_name'
      },
      dialogAddCatVisible: false,
      addCatForm: {
        cat_name: '',
        cat_pid_arr: []
      },
      defaultProps2: {
        label: 'cat_name',
        value: 'cat_id'
      }
    }
  },
  created() {
    this.loadCatData()
    this.loadCatData2()
  },
  methods: {
    // 加载商品列表
    async loadCatData() {
      let res = await this.$axios.get('categories', {
        params: {
          type: 3,
          pagenum: 1,
          pagesize: 4
        }
      })
      //   console.log(res)
      this.catData = res.data.data.result
    },
    // 展示添加对话框
    showAddCatDialog() {
      this.dialogAddCatVisible = true
    },
    // 加载级联选择器
    async loadCatData2() {
      let res = await this.$axios.get('categories', {
        params: {
          type: 2
        }
      })
      // console.log(res)
      this.options = res.data.data
    },
    // 添加分类
    async addCat() {
      const { cat_name, cat_pid_arr } = this.addCatForm
      let res = await this.$axios.post('categories', {
        cat_pid: cat_pid_arr[cat_pid_arr.length - 1],
        cat_name,
        cat_level: 2
      })
      // console.log(res)
      if (res.data.meta.status === 201) {
        this.dialogAddCatVisible = false

        this.$message({
          message: '添加分类成功',
          type: 'success',
          duration: 800
        })
        this.loadCatData()
      }
    }
  }
}
</script>

<style>
</style>
