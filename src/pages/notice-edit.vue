<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="通知标题" prop="noticeTitle" required>
        <el-input v-model="formData.noticeTitle"></el-input>
      </el-form-item>
      <el-form-item label="通知内容" prop="noticeContent">
        <el-input type="textarea" v-model="formData.noticeContent"></el-input>
      </el-form-item>
      <el-form-item label="通知类型" prop="noticeTypeId">
        <el-select v-model="formData.noticeTypeId" placeholder="请选择类型">
          <el-option v-for="item in typeList" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="通知时间" prop="noticeDate">
        <el-date-picker v-model="formData.noticeDate" type="datetime" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
      </el-form-item>
      <el-form-item label="通知附件" prop="pic">
        <el-upload
          :action="$baseURL + 'accessory/addAccessory'"
          :file-list="fileList"
          :on-success="handleUpload"
          :on-remove="handleRemove">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import saveMixin from '@/mixins/saveform'
import uploadMixin from '@/mixins/upload'
export default {
  mixins: [uploadMixin, saveMixin],
  data() {
    return {
      id: parseInt(this.$route.query.id),
      formData: {
        companyId: sessionStorage.getItem('companyId'),
        noticeContent: '',
        noticeTitle: '',
        noticeTypeId: ''
      },
      rules: {},
      apiName: 'notice/',
      addApi: 'add',
      updateApi: 'update',
      typeList: [],
      fileList: []
    }
  },
  mounted() {
    this.id && this.getDetail()
    this.getTypeList()
  },
  methods: {
    handleRemove(file, list) {
      this.fileList = list
    },
    handleUpload(res) {
      if (res.code == 0) {
        this.fileList.push({name: res.data.accessoryName, url: this.$baseURL + res.data.accessoryName})
      }
    },
    beforePost() {
      this.formData.accessoryNames = this.joinPicIntoString(this.fileList)
    },
    async getTypeList() {
      let {data} = await this.$http({
        url: 'noticeType/getList',
        params:{
          companyId:sessionStorage.getItem('companyId')
        }
      })
      if (data.code == 0) {
        this.typeList = data.data
      }
    },
    async getDetail() {
      let {data} = await this.$http({
        url: 'notice/get/' + this.id
      })
      if (data.code == 0) {
        this.formData = data.data
        this.formData.id = this.id
        this.fileList = this.pushPicInitList(this.formData.accessoryNames)
      }
    }
  }
}
</script>
