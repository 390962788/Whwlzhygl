export default {
  data() {
    return {
      target: sessionStorage.getItem('personTypeId') == 5 ? 1 : (sessionStorage.getItem('personTypeId') == 4 && -1)
    }
  },
  methods: {
    reform() {
      if (this.target == 1) {
        this.$prompt('填写整改情况', '整改').then(({value}) => {
          this.postReform(value)
        })
      } else {
        this.$confirm('是否通过审核', '审核', {
          confirmButtonText: '通过',
          cancelButtonText: '驳回',
          type: 'warning'
        }).then(() => {
          this.target = 2
          this.postReform('')
        }).catch(() => {
          this.target = 0
          this.postReform('')
        })
      }
    },
    async postReform(msg) {
      // this.formData.userId = sessionStorage.getItem('userId')
      let {data} = await this.$http({
        method: 'post',
        url: this.apiName + (this.id ? this.updateApi : this.addApi),
        data: {
          id: this.id,
          status: this.target,
          reformDetail: msg
        }
      })
      if (data.code == 0) {
        this.$message({
          message: '保存成功！',
          type: 'success'
        })
        this.$emit('save-ok')
      } else {
        this.$message.error(data.msg)
      }
    }
  }
}