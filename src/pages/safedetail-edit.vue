<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="160px" size="medium">
      <el-form-item label="检查内容" prop="checkContent">
        <el-input v-model="formData.checkContent"></el-input>
      </el-form-item>
      <el-form-item label="检查人" prop="checkPerson">
        <el-input v-model="formData.checkPerson"></el-input>
      </el-form-item>
      <el-form-item label="检查到的问题" prop="checkQuestion">
        <el-input v-model="formData.checkQuestion"></el-input>
      </el-form-item>
      <el-form-item label="受检单位" prop="checkUnitId">
        <el-select v-model="formData.checkUnitId" placeholder="请选择">
          <el-option v-for="item in checkUnitList" :key="item.id" :label="item.unitName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="检查内容照片图片" prop="contentPath">
        <img-upload
          class="small"
          :path.sync="formData.contentPath">
        </img-upload>
      </el-form-item>
      <el-form-item label="检查到的问题照片图片" prop="questionPath">
        <img-upload
          class="small"
          :path.sync="formData.questionPath">
        </img-upload>
      </el-form-item>
      <el-form-item label="整改后的照片图片" prop="reformPath">
        <img-upload
          class="small"
          :path.sync="formData.reformPath">
        </img-upload>
      </el-form-item>
      <el-form-item label="整改结果" prop="reformResult">
        <el-input v-model="formData.reformResult"></el-input>
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
import uploadMixin from '@/mixins/upload'
import saveMixin from '@/mixins/saveform'
export default {
  mixins: [uploadMixin, saveMixin],
  data() {
    return {
      formData: {
        checkContent: '',
        checkPerson: '',
        checkQuestion: '',
        checkUnitId: '',
        contentPath: '',
        questionPath: '',
        reformPath: '',
        reformResult: '',
        safeCheckRecordId: this.sid
      },
      rules: {},
      checkUnitList: [],
      apiName: 'safeCheckRecordDetail/',
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
    this.getCheckUnitList()
  },
  methods: {
    async getDetail() {
      let {data} = await this.$http({
        url: 'safeCheckRecordDetail/get/' + this.id
      })
      if (data.code == 0) {
        this.formData = data.data
        this.formData.id = this.id
        this.formData.safeCheckRecordId = this.sid
      }
    },
    async getCheckUnitList() {
      let {data} = await this.$http({
        url: 'checkUnit/getList',
        params:{
          companyId:sessionStorage.getItem('companyId')
        }
      })
      if (data.code == 0) {
        this.checkUnitList = data.data
      }
    },
  }
}
</script>
<style>
.small .el-upload-list--picture-card .el-upload-list__item,.small .el-upload--picture-card {
  width: 72px;
  height: 72px;
  line-height: 81px;
}
</style>
