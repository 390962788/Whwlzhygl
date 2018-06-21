<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="120px">
      <el-form-item label="培训会议主题" prop="meetingTitle" required>
        <el-input v-model="formData.meetingTitle"></el-input>
      </el-form-item>
      <el-form-item label="会议类型" prop="typeId">
        <el-select v-model="formData.typeId">
          <el-option v-for="item in meetingTypeList" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="参加人员" prop="joinPerson">
        <el-input v-model="formData.joinPerson"></el-input>
      </el-form-item>
      <el-form-item label="参加地址" prop="joinAddress">
        <el-input v-model="formData.joinAddress"></el-input>
      </el-form-item>
      <el-form-item label="主持人" prop="compere">
        <el-input v-model="formData.compere"></el-input>
      </el-form-item>
      <el-form-item label="记录人" prop="recordPerson">
        <el-input v-model="formData.recordPerson"></el-input>
      </el-form-item>
      <el-form-item label="会议内容" prop="meetingContent">
        <el-input type="textarea" v-model="formData.meetingContent"></el-input>
      </el-form-item>
      <el-form-item label="会议时间" prop="meetingDate">
        <el-date-picker v-model="formData.meetingDate" type="datetime" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
      </el-form-item>
      <el-form-item label="签到" prop="signInIds">
        <el-checkbox-group v-model="formData.signInIds">
          <el-checkbox
            v-for="item in userList"
            :key="item.id"
            :label="item.id">
            {{item.userName}}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="附件" prop="pic">
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
        meetingTitle: '',
        joinPerson: '',
        joinAddress: '',
        compere: '',
        recordPerson: '',
        meetingContent: '',
        accessoryNames: '',
        signInIds: [],
        typeId: ''
      },
      rules: {},
      apiName: 'meeting/',
      addApi: 'add',
      updateApi: 'update',
      fileList: [],
      userList: [],
      meetingTypeList: []
    }
  },
  mounted() {
    this.getUserList()
    this.getMeetingTypeList()
    this.id && this.getDetail()
  },
  methods: {
    async getMeetingTypeList() {
      let {data} = await this.$http({url:'meetingType/getList',params:{
        companyId:sessionStorage.getItem('companyId')
      }})
      if (data.code == 0) {
        this.meetingTypeList = data.data
      }
    },
    async getUserList() {
      let {data} = await this.$http({url:'user/getList',params:{companyId:sessionStorage.getItem('companyId')}})
      if (data.code == 0) {
        this.userList = data.data
      }
    },
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
    async getDetail() {
      let {data} = await this.$http({
        url: 'meeting/get/' + this.id
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
