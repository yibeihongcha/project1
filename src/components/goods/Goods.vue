<template>
  <div>
    <!-- 商品列表 -->
    <el-button
      type="success"
      plain
      @click="go2goodsAdd"
    >添加分类</el-button>
    <el-table
      :data="goodsData"
      style="width: 100%"
    >
      <el-table-column
        prop="goods_name"
        label="商品名称"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="goods_price"
        label="商品价格"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="goods_number"
        label="商品数量"
      >
      </el-table-column>
      <el-table-column
        prop="add_time"
        label="创建时间"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.add_time | dateFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      goodsData: [
        {
          goods_name: '王小虎',
          goods_price: '1',
          goods_number: '2',
          add_time: '3'
        }
      ]
    }
  },
  filters: {
    dateFilter (res) {
      return moment(res).format('YYYY-MM-DD')
    }
  },
  created () {
    this.loadGoodsData()
  },
  methods: {
    // 加载商品列表
    async loadGoodsData () {
      let res = await this.$axios.get('goods', {
        params: {
          query: '',
          pagenum: 1,
          pagesize: 4
        }
      })
      //   console.log(res)
      this.goodsData = res.data.data.goods
    },
    // 跳转到商品页面
    go2goodsAdd () {
      this.$router.push('/goods-add')
    }
  }
}
</script>

<style>
</style>
