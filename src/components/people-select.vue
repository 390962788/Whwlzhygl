<template>
  <div>
    <el-form-item :label="label" prop="driverId">
      <el-select v-model="xpid" filterable placeholder="可输入姓名筛选" @change="userChange">
        <el-option v-for="item in userList" :key="item.id" :label="item.userName" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="身份证号" prop="driverIdCardNum">
      <el-input v-model="xidCardNum" @change="$emit('update:idCardNum', xidCardNum)"></el-input>
    </el-form-item>
    <el-form-item label="手机号码" prop="driverMobile">
      <el-input v-model="xmobile" @change="$emit('update:mobile', xmobile)"></el-input>
    </el-form-item>
    <el-form-item label="从业资格证号" prop="driverQuaLicNum">
      <el-input v-model="xquaLicNum" @change="$emit('update:quaLicNum', xquaLicNum)"></el-input>
    </el-form-item>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userList: [],
      xpid: this.pid,
      xidCardNum: this.idCardNum,
      xmobile: this.mobile,
      xquaLicNum: this.quaLicNum,
    }
  },
  props: 
    [
      'label',
      'role',
      'pid',
      'idCardNum',
      'mobile',
      'quaLicNum'
    ],
  mounted() {
    this.getUserList()
    this.xpid && this.userChange()
  },
  methods: {
    async getUserList() {
      let {data} = await this.$http({
        url: 'user/getList',
        params: {
          roleId: this.role
        }
      })
      if (data.code == 0) {
        this.userList = data.data
      }
    },
    async userChange() {
      let {data} = await this.$http({
        url: 'user/get/' + this.xpid
      })
      if (data.code == 0) {
        this.xidCardNum = data.data.idCardNum
        this.xmobile = data.data.mobile
        this.xquaLicNum = data.data.qualificationLicenseNum
        this.$emit('update:pid', this.xpid)
      }
    }
  }
}
</script>
