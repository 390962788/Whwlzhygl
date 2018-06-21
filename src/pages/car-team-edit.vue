<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="150px" size="medium">
      <el-form-item label="车队名称" prop="teamName">
        <el-input v-model="formData.teamName"></el-input>
      </el-form-item>
      <!-- <el-form-item label="负责人名称" prop="principalName">
        <el-input v-model="formData.principalName"></el-input>
      </el-form-item>
      <el-form-item label="负责人联系号码" prop="principalMobile">
        <el-input v-model="formData.principalMobile"></el-input>
      </el-form-item> -->
      <el-form-item label="车队负责人" prop="userId">
          <el-select v-model="formData.userId" filterable>
            <el-option v-for="item in userList" :key="item.id" :label="item.userName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      
      <el-form-item label="车队安全责任状图片" prop="safeResponsibilityPath">
        <img-upload
          :path.sync="formData.safeResponsibilityPath">
        </img-upload>
      </el-form-item>
      <el-dialog :visible.sync="dialogVisible" append-to-body>
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" :loading="posting">保存</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import CarList from './car'
import saveMixin from '@/mixins/saveform'
import uploadMixin from '@/mixins/upload'
export default {
  mixins: [saveMixin, uploadMixin],
  data() {
    return {
      id: parseInt(this.$route.query.id),
      formData: {
        companyId: sessionStorage.getItem('companyId'),
        teamName: '',
        userId:'',
        // principalName: '',
        // principalMobile: '',
        safeResponsibilityPath: ''
      },
      userList:[],
      rules: {},
      apiName: 'carTeam/',
      addApi: 'add',
      updateApi: 'update'
    }
  },
  mounted() {
    this.id && this.getDetail()
    this.getUserList()
  },
  methods: {
    async getDetail() {
      let {data} = await this.$http({
        url: 'carTeam/get/' + this.id
      })
      if (data.code == 0) {
        this.formData = data.data
        this.formData.id = this.id
      }
    },
    async getUserList() {
      let {data} = await this.$http({
        url: 'user/getList',
        params: {
          roleId: 5,
          companyId:sessionStorage.getItem('companyId')
        }
      })
      if (data.code == 0) {
        this.userList = data.data
      }
    }
  }
}
</script>
