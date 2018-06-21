<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="150px" size="medium">
      <el-form-item label="车辆维修安全合同" prop="maintenanceContractPath">
        <img-upload
          :path.sync="formData.maintenanceContractPath">
        </img-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" :loading="posting">保存</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <h3>二级维修计划：</h3>
    <maintenance-list :id="id"></maintenance-list>
  </div>
</template>
<script>
import MaintenanceList from './maintenance'
import saveMixin from '@/mixins/saveform'
import uploadMixin from '@/mixins/upload'
export default {
  mixins: [uploadMixin, saveMixin],
  components: {
    MaintenanceList
  },
  data() {
    return {
      id: 1,
      formData: {
        companyId: sessionStorage.getItem('companyId'),
        maintenanceContractPath: ''
      },
      rules: {},
      apiName: 'deviceMaintenance/',
      addApi: 'add',
      updateApi: 'update'
    }
  },
  mounted() {
    this.id && this.getDetail()
  },
  methods: {
    async getDetail() {
      let {data} = await this.$http({
        url: 'deviceMaintenance/get/' + this.id
      })
      if (data.code == 0) {
        this.formData = data.data
        this.formData.id = this.id
      }
    }
  }
}
</script>
