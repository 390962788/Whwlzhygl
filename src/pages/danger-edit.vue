<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="200px" size="medium">
      <el-form-item label="主题" prop="title">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item :label="item.content" prop="id" v-for="item in dangeritemList" :key="item.id" v-if="item">
        <el-radio-group v-model="item.result">
          <el-radio :label="0">是</el-radio>
          <el-radio :label="1">否</el-radio>
        </el-radio-group>
        <img-upload
          v-if="item.result == 1"
          :path.sync="item.photoPath">
        </img-upload>
      </el-form-item>
      <el-form-item label="检查人" prop="userIds">
        <el-select
          v-model="formData.userIds"
          multiple
          filterable
          placeholder="请选择人员">
          <el-option
            v-for="item in userList"
            :key="item.id"
            :label="item.userName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="存在的问题" prop="existQuestion">
        <el-input v-model="formData.existQuestion"></el-input>
      </el-form-item>
      <el-form-item label="检查日期" prop="checkDate">
        <el-date-picker v-model="formData.checkDate" type="date" value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" v-if="target" @click="reform">整改</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')" :loading="posting">保存</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import ImgUpload from '@/components/img-upload'
import saveMixin from '@/mixins/saveform'
import reform from '@/mixins/reform'
export default {
  mixins: [saveMixin, reform],
  components: {
    ImgUpload
  },
  data() {
    return {
      id: parseInt(this.$route.query.id),
      dangeritemList: [],
      formData: {
        companyId: sessionStorage.getItem('companyId')
      },
      userList: [],
      rules: {},
      imageUrl: '',
      apiName: 'hiddenDangerCheckRecord/',
      addApi: 'add',
      updateApi: 'update'
    }
  },
  mounted() {
    this.id ? this.getDetail() : this.getDangerItemList()
    this.getUserList()
  },
  methods: {
    beforePost() {
      this.formData.details = this.dangeritemList
    },
    async getUserList() {
      let {data} = await this.$http({url:'user/getList',params:{companyId:sessionStorage.getItem('companyId')}})
      if (data.code == 0) {
        this.userList = data.data
      }
    },
    async getDangerItemList() {
      let {data} = await this.$http({
        url: 'hiddenDangerCheckDetail/getList',
        params:{
          companyId:sessionStorage.getItem('companyId')
        }
      })
      if (data.code == 0) {
        this.dangeritemList = data.data
        // for (let i;i < this.dangeritemList.length; i++){
        //   this.dangeritemList[i].result = null
        // }
      }
    },
    async getDetail() {
      let {data} = await this.$http({
        url: 'hiddenDangerCheckRecord/get/' + this.id
      })
      if (data.code == 0) {
        this.formData = data.data
        this.formData.id = this.id
        this.dangeritemList = this.formData.details
      }
    }
  }
}
</script>
