<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="120px" size="medium">
      <el-form-item label="二级维护项" prop="maintenanceContentId">
        <el-select v-model="formData.maintenanceContentId" placeholder="请选择">
          <el-option v-for="item in contentList" :key="item.id" :label="item.content" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" :loading="posting">保存</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import saveMixin from '@/mixins/saveform'
export default {
  mixins: [saveMixin],
  data() {
    return {
      formData: {
        companyId:sessionStorage.getItem('companyId'),
        maintenanceContentId: '',
        maintenancePlanId: this.sid
      },
      contentList: [],
      rules: {},
      apiName: 'maintenancePlanDetail/',
      addApi: 'add',
      updateApi: 'update'
    }
  },
  props: {
    id: {
      type: Number
    },
    sid: {
      type: Number
    }
  },
  mounted() {
    this.id && this.getDetail()
    this.getContentList()
  },
  methods: {
    async getContentList() {
      let {data} = await this.$http({
        url: 'maintenanceContent/getList',
        params:{
          companyId:sessionStorage.getItem('companyId')
        }
      })
      if (data.code == 0) {
        this.contentList = data.data
      }
    },
    async getDetail() {
      let {data} = await this.$http({
        url: 'maintenancePlanDetail/get/' +this.id
      })
      if (data.code == 0) {
        this.formData = data.data
        this.formData.id = this.id
        this.formData.maintenancePlanId = this.sid
      }
    }
  }
}
</script>
