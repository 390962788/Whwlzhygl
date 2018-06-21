export default {
  data() {
    return {
      page: 1,
      pageSize: 10,
      tableData: [],
      multipleSelection: [],
      loading: false
    }
  },
  methods: {
    async getList() {
      this.loading = true
      let params = {
        companyId: sessionStorage.getItem('companyId'),
        // userId: sessionStorage.getItem('userId'),
        currentPage: this.page,
        size: this.pageSize,
        keyword: this.keyword
      }
      Object.assign(params, this.params)
      let {data} = await this.$http({
        url: this.apiName + this.getListApi,
        params: params
      })
      if (data.code == 0) {
        this.tableData = data.data
      }
      this.loading = false
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val.map(i => {
        return i[this.idField]
      });
    },
    editClick(val) {
      console.log(val)
      this.$router.push({
        name: this.editRoute,
        query: {
          id: val
        }
      })
    },
    async delectClick(val) {
      if (val.length < 1) {
        this.$message.error('请选择要删除的记录')
        return false
      }
      let {data} = await this.$http({
        method: 'post',
        url: this.apiName + this.deleteApi,
        data: val
      })
      if (data.code == 0) {
        this.$message({
          message: '删除成功！',
          type: 'success'
        })
        this.getList()
      } else {
        this.$message.error(data.msg)
      }
    }
  }
}