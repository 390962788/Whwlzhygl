<template>
  <div>
    <div class="tools">
      <el-button size="small" icon="el-icon-circle-plus-outline" type="primary" @click="editPop(0)">添加</el-button>
      <el-button size="small" icon="el-icon-delete" type="danger" @click="delectClick(multipleSelection)">删除</el-button>
    </div>
    <el-table
      v-loading="loading"
      ref="multipleTable"
      :data="tableData.list"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection">
      </el-table-column>
      <el-table-column
        prop="driverName"
        label="驾驶员">
      </el-table-column>
      <el-table-column
        prop="carPlateNum"
        label="头车车牌号">
      </el-table-column>
      <el-table-column
        prop="trailerPlateNum"
        label="挂车车牌号">
      </el-table-column>
      <el-table-column
        prop="escortName"
        label="押运员">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="editPop(scope.row.id)" type="text" size="small">编辑</el-button>
          <el-button @click="delectClick([scope.row.id])" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="height: 20px"></div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="getList"
      :current-page.sync="page"
      :page-sizes="[10, 25, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.total">
    </el-pagination>
    <el-dialog width="70%" title="编辑详情" :visible.sync="isShowForm" :key="sid">
      <order-detail-edit :sid="id" :id="sid" @save-ok="saveOk"></order-detail-edit>
    </el-dialog>
  </div>
</template>

<script>
import listMixin from '@/mixins/list'
import OrderDetailEdit from './order-detail-edit'
export default {
  mixins: [listMixin],
  components: {
    OrderDetailEdit
  },
  data() {
    return {
      keyword: '',
      idField: 'id',
      editRoute: 'OrderDetailEdit',
      apiName: 'orderDetail',
      deleteApi: '/delete',
      getListApi: '/getList',
      params: {orderId: this.id},
      isShowForm: false,
      sid: ''
    }
  },
  props: {
    id: {
      type: Number
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    editPop(id) {
      this.sid = id
      this.isShowForm = true
    },
    saveOk() {
      this.getList()
      this.isShowForm = false
    }
  }
}
</script>
<style>
</style>
