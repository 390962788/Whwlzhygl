<template>
  <div>
    <el-dialog title="登录管理后台系统" :visible="true" width="400px" :show-close="false" center>
      <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="100px" size="medium">
        <el-form-item label="用户名" prop="mobile">
          <el-input v-model="formData.mobile"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="formData.password"></el-input>
        </el-form-item>
        <el-button type="success" @click="submitForm('ruleForm')" :loading="posting">登录</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      posting: false,
      formData: {
        mobile: '',
        password: ''
      },
      rules: {
        mobile: {required: true, message: '请输入用户名'},
        password: {required: true, message: '请输入密码'}
      }
    }
  },
  methods: {
    async postForm() {
      this.posting = true
      let {data} = await this.$http({
        method: 'post',
        url: 'login',
        data: this.formData
      })
      if (data.code == 0) {
        // sessionStorage.removeItem('token')
        // sessionStorage.removeItem('companyId')
        // sessionStorage.removeItem('mobile')
        // sessionStorage.removeItem('personTypeId')
        this.$http.defaults.headers.common['Authorization'] = 'whwlzhygl ' + data.data.token
        sessionStorage.setItem('token', data.data.token)
        // sessionStorage.setItem('userId', data.data.userId)
        sessionStorage.setItem('personTypeId', data.data.personTypeId)
        sessionStorage.setItem('companyId', data.data.companyId)
        sessionStorage.setItem('mobile', this.formData.mobile)
        this.$router.push({
          name: 'Home'
        })
      } else {
        this.$message.error(data.msg)
      }
      this.posting = false
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.postForm()
        }
      })
    }
  }
}
</script>
<style scoped>
.el-form{
  text-align: center;
}
</style>
