export default {
  data() {
    return {
      posting: false
    }
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async postForm() {
      this.posting = true
      // this.formData.userId = sessionStorage.getItem('userId')
      let {data} = await this.$http({
        method: 'post',
        url: this.apiName + (this.id ? this.updateApi : this.addApi),
        data: this.formData
      })
      if (data.code == 0) {
        this.$message({
          message: '保存成功！',
          type: 'success'
        })
        this.$emit('save-ok')
        this.$router.back()
      } else {
        this.$message.error(data.msg)
      }
      this.posting = false
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.beforePost && this.beforePost()
          this.postForm()
        } else {
          this.$message.error('错了哦，这是一条错误消息')
          return false;
        }
      });
    }
  }
}