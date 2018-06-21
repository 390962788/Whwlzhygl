<template>
  <div>
    <div class="tools">
      <el-button size="small" icon="el-icon-circle-plus-outline" type="primary" @click="editClick(0)">添加</el-button>
      <el-button size="small" icon="el-icon-delete" type="danger" @click="delectClick(multipleSelection)">删除</el-button>
      <el-button size="small" icon="el-icon-tickets" type="success" @click="$router.push({name: 'Role'})">人员角色管理</el-button>
      <el-input v-model="keyword" placeholder="姓名" size="small" clearable class="search-input" @keyup.13.native="getList"></el-input>
      <el-select size="small" v-model="params.roleId" placeholder="选择类型搜索" @change="getList" clearable style="width: 150px">
        <el-option
          v-for="item in roleList"
          :key="item.id"
          :label="item.roleName"
          :value="item.id">
        </el-option>
      </el-select>
      <el-button size="small" icon="el-icon-search" type="primary" @click="getList">搜索</el-button>
      <el-select size="small" v-model="exportFields" placeholder="勾选导出字段" multiple>
        <el-option
          v-for="(item, i) in fieldList"
          :key="i"
          :label="item.label"
          :value="item">
        </el-option>
      </el-select>
      <el-button
        size="small"
        :loading="isExport"
        type="primary"
        icon="el-icon-download"
        @click="getAll">导出</el-button>
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
        prop="userName"
        label="名字">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="联系号码">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-button @click="authClick(scope.row.id, scope.row.mobile)" type="text" size="small">授权</el-button>
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
    <el-dialog title="授权登录" :visible.sync="authShow" :key="authId">
      <!-- <div class="form-item">
        <span>角色：</span>
        <el-select v-model="authRole" placeholder="请选择角色" size="small" style="width: 200px">
          <el-option
          v-for="item in roleList"
          :key="item.id"
          :label="item.roleName"
          :value="item.id"></el-option>
        </el-select>
      </div> -->
      <div class="form-item">
        <span>帐号：</span>
        <el-input v-model="authTel" disabled style="width: 200px" size="small"></el-input>
      </div>
      <div class="form-item">
        <span>密码：</span>
        <el-input v-model="authPwd" style="width: 200px" size="small"></el-input>
      </div>
      <div class="form-item">
        <span>可访问节点：</span>
        <el-tree
          :data="menuList"
          show-checkbox
          default-expand-all
          node-key="id"
          ref="tree"
          highlight-current
          :props="menuTreeProp">
        </el-tree>
      </div>
      <el-button @click="authSubmit" type="primary">开通</el-button>
    </el-dialog>
  </div>
</template>

<script>
import json2csv from '@/json2csv.js'
import listMixin from '@/mixins/list'
export default {
  mixins: [listMixin],
  data() {
    return {
      keyword: '',
      idField: 'id',
      editRoute: 'PersonEdit',
      apiName: 'user',
      deleteApi: '/delete',
      getListApi: '/getList',
      params: {
        roleId: ''
      },
      roleList: [],
      authShow: false,
      authRole: '',
      authId: '',
      authTel: '',
      authPwd: '',
      // roleList: [],
      isExport: false,
      fieldList: [
        {value:'userName', label: '人员名称'},
        {value:'gender', label: '性别'},
        {value:'age', label: '年龄'},
        {value:'birthday', label: '出生日期'},
        {value:'nation', label: '国籍'},
        {value:'address', label: '住址'},
        {value:'idCardNum', label: '身份证号'},
        {value:'mobile', label: '联系号码'},
        {value:'issuingAuthority', label: '身份证颁发机关'},
        {value:'idCardValidityStartDate', label: '身份证有效期开始日期'},
        {value:'idCardValidityEndDate', label: '身份证有效期截止日期'},
        {value:'qualificationLicenseNum', label: '从业资格证号'},
        {value:'qualificationCertificateTypeName', label: '从业资格证类型名称'},
        {value:'qualificationValidityStartDate', label: '从业资格证有效期开始日期'},
        {value:'qualificationValidityEndDate', label: '从业资格证有效期结束日期'},
        {value:'qualificationFirstDate', label: '从业资格证初次领证日期'},
        {value:'driverFirstDate', label: '驾驶证初次领证日期'},
        {value:'driverType', label: '准驾车型'},
        {value:'driverValidityStartDate', label: '驾驶证有效期开始日期'},
        {value:'driverValidityEndDate', label: '驾驶证有效期结束日期'},
        {value:'driverIssuingAuthority', label: '驾驶证签发机关'},
      ],
      exportFields: [],
      menuTreeProp: {
        label: 'menuName'
      },
      menuList: []
    }
  },
  mounted() {
    this.getList()
    this.getRoleList()
    // this.getRoleList()
    this.getMenuList()
  },
  methods: {
    async getMenuList() {
      let {data} = await this.$http({
        url: 'menus/getMenusAll',
        params:{
          companyId: sessionStorage.getItem('companyId'),
          // userId: sessionStorage.getItem('userId')
        }
      })
      if (data.code == 0) {
        this.menuList = data.data[0] && data.data[0].children
      }
    },
    async getAll() {
      this.isExport = true
      let {data} = await this.$http({
        url: 'user/getList',
        params: {
          companyId: sessionStorage.getItem('companyId'),
          // userId: sessionStorage.getItem('userId'),
          roleId: this.params.roleId,
          keyword: this.keyword
        }
      })
      if (data.code == 0) {
        this.isExport = false
        this.exportCsv(data.data)
      } else {
        this.$message(data.message)
      }
    },
    exportCsv(data) {
      json2csv.setDataConver({
        data: data,
        fileName: '人员导出表',
        columns: {
          title: this.exportFields.map(i => {
            return i.label
          }),
          key: this.exportFields.map(i => {
            return i.value
          }),
        }
      })
    },
    async authSubmit() {
      // if (this.authRole === '') {
      //   this.$message.error('请选择角色')
      //   return false
      // }
      if (this.authTel === '') {
        this.$message.error('请填写该用户的手机号码作为登录账号')
        return false
      }
      let {data} = await this.$http({
        method: 'post',
        url: 'auth/register',
        data: {
          password: this.authPwd,
          // roleId: this.authRole,
          id: this.authId,
          // userName: this.authTel,
          menuIds: this.$refs.tree.getCheckedKeys()
        }
      })
      if (data.code == 0) {
        this.$message({
          message: '开通成功！',
          type: 'success'
        })
        this.authShow = false
      } else {
        this.$message.error(data.msg)
      }
    },
    authClick(id, tel) {
      this.authTel = tel
      this.authId = id
      this.authShow = true
    },
    // async getRoleList() {
    //   let {data} = await this.$http({
    //     url: 'role/getList',
    //     params: {
    //       companyId: sessionStorage.getItem('companyId'),
    //       // userId: sessionStorage.getItem('userId')
    //     }
    //   })
    //   if (data.code == 0) {
    //     this.roleList = data.data
    //   }
    // },
    async getRoleList() {
      let {data} = await this.$http({
        url: 'role/getList',
        params: {
          companyId: sessionStorage.getItem('companyId'),
          // userId: sessionStorage.getItem('userId')
        }
      })
      if (data.code == 0) {
        this.roleList = data.data
      }
    }
  }
}
</script>
<style>
.form-item {
  margin: 10px 0;
}
</style>
