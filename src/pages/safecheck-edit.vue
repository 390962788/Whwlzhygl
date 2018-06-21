<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="100px" size="medium">
      <el-form-item label="主题" prop="recordTitle">
        <el-input v-model="formData.recordTitle"></el-input>
      </el-form-item>
      <el-form-item label="检查日期" prop="checkDate">
        <el-date-picker v-model="formData.checkDate" type="datetime" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" :loading="posting">保存</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <div v-if="id">
      <h3>安全监督检查记录详情</h3>
      <safe-detail-list :id="id"></safe-detail-list>
    </div>
  </div>
</template>
<script>
import SafeDetailList from './safedetail'
import saveMixin from '@/mixins/saveform'
export default {
  mixins: [saveMixin],
  components: {
    SafeDetailList
  },
  data() {
    return {
      id: parseInt(this.$route.query.id),
      formData: {
        companyId: sessionStorage.getItem('companyId'),
        recordTitle: '',
        accessoryNames: ''
      },
      picsList: [],
      rules: {},
      apiName: 'safeCheckRecord/',
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
        url: 'safeCheckRecord/get/' + this.id
      })
      if (data.code == 0) {
        this.formData = data.data
        this.formData.id = this.id
      }
    }
  }
}
</script>
