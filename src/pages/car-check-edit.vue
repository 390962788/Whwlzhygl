<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="120px" size="medium">
      <el-form-item label="汽车门检项目" prop="carCheckContentId">
        <el-select v-model="formData.carCheckContentId" placeholder="请选择">
          <el-option v-for="item in contentList" :key="item.id" :label="item.content" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="检查结果" prop="result">
        <el-checkbox v-model="formData.result" true-label="合格" false-label="不合格"/>
      </el-form-item>
      <el-form-item label="检查日期" prop="checkDate">
        <el-date-picker v-model="formData.checkDate" type="date" value-format="yyyy-MM-dd"></el-date-picker>
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
        carCheckContentId: '',
        result: '',
        carCheckRecordId: this.sid
      },
      contentList: [],
      rules: {},
      apiName: 'carCheckRecordDetail/',
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
        url: 'carCheckContent/getList',
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
        url: 'carCheckRecordDetail/get/' + this.id
      })
      if (data.code == 0) {
        this.formData = data.data
        this.formData.id = this.id
        this.formData.carCheckRecordId = this.sid
      }
    }
  }
}
</script>
