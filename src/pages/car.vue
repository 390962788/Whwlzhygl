<template>
  <div>
    <div class="tools">
      <el-button size="small" icon="el-icon-circle-plus-outline" type="primary" @click="editClick(0)">添加</el-button>
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
        prop="carPlateNum"
        label="车牌">
      </el-table-column>
      <el-table-column
        prop="trailerPlateNum"
        label="挂车车牌">
      </el-table-column>
      <el-table-column
        label="驾驶员">
        <el-table-column
          prop="driverName"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="driverMobile"
          label="联系电话">
        </el-table-column>
      </el-table-column>
      <el-table-column
        label="押运员">
        <el-table-column
          prop="escortName"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="escortMobile"
          label="联系电话">
        </el-table-column>
      </el-table-column>
      <el-table-column
        label="负责人">
        <el-table-column
          prop="principalName"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="principalMobile"
          label="联系电话">
        </el-table-column>
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型">
      </el-table-column>
      <el-table-column
        prop="statusName"
        label="营运状态">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="editClick(scope.row.id)" type="text" size="small">编辑</el-button>
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
  </div>
</template>
<script>
import listMixin from '@/mixins/list'
import CarEdit from './car-edit'
export default {
  mixins: [listMixin],
  components: {
    CarEdit
  },
  data() {
    return {
      keyword: '',
      idField: 'id',
      editRoute: 'CarEdit',
      apiName: 'car',
      deleteApi: '/delete',
      getListApi: '/getList'
    }
  },
  mounted() {
    this.getList()
  }
}
</script>
