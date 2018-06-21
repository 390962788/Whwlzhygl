<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="120px" size="medium">
      <el-form-item label="驾驶员" prop="driverId">
        <el-select v-model="formData.driverId" filterable placeholder="请选择">
          <el-option v-for="item in userList" :key="item.userId" :label="item.userName" :value="item.userId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="押运员" prop="escortId">
        <el-select v-model="formData.escortId" filterable placeholder="请选择">
          <el-option v-for="item in userList" :key="item.userId" :label="item.userName" :value="item.userId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="头车车牌号" prop="carId">
        <el-select v-model="formData.carId" filterable placeholder="可输入车牌号筛选" @visible-change="getCarList">
          <el-option v-for="item in carList" :key="item.carId" :label="item.plateNum" :value="item.carId"></el-option>
        </el-select>
        <el-select v-model="carTeamId" placeholder="选择车队筛选" clearable>
          <el-option v-for="item in carTeamList" :key="item.carTeamId" :label="item.teamName" :value="item.carTeamId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="挂车车牌号" prop="trailerId">
        <el-select v-model="formData.trailerId" filterable placeholder="可输入车牌号筛选" @visible-change="getCarList2">
          <el-option v-for="item in carList2" :key="item.carId" :label="item.plateNum" :value="item.carId"></el-option>
        </el-select>
        <el-select v-model="carTeamId2" placeholder="选择车队筛选" clearable>
          <el-option v-for="item in carTeamList" :key="item.carTeamId" :label="item.teamName" :value="item.carTeamId"></el-option>
        </el-select>
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
        driverId: '',
        escortId: '',
        orderId: this.sid
      },
      userList: [],
      rules: {},
      apiName: 'orderDetail/',
      addApi: 'add',
      updateApi: 'update',
      carTeamList: [],
      carList: [],
      carList2: [],
      carTeamId: '',
      carTeamId2: ''
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
    this.getuserList()
    this.getCarTeamList()
    this.getCarList()
    this.getCarList2()
    this.id && this.getDetail()
  },
  methods: {
    async getCarList(tid) {
      let {data} = await this.$http({
        url: 'car/getList',
        params: {
          carTeamId: this.carTeamId
        }
      })
      if (data.code == 0) {
        this.carList = data.data
      }
    },
    async getCarList2() {
      let {data} = await this.$http({
        url: 'car/getList',
        params: {
          carTeamId: this.carTeamId2
        }
      })
      if (data.code == 0) {
        this.carList2 = data.data
      }
    },
    async getCarTeamList() {
      let {data} = await this.$http({
        url: '/carTeam/getList',
        params: {
          companyId: sessionStorage.getItem('companyId')
        }
      })
      if (data.code == 0) {
        this.carTeamList = data.data
      }
    },
    async getuserList() {
      let {data} = await this.$http({
        url: 'user/getList',
        params:{
          companyId:sessionStorage.getItem('companyId')
        }
      })
      if (data.code == 0) {
        this.userList = data.data
      }
    },
    async getDetail() {
      let {data} = await this.$http({
        url: 'orderDetail/get/' + this.id
      })
      if (data.code == 0) {
        this.formData = data.data
        this.formData.id = this.id
        this.formData.orderId = this.sid
      }
    }
  }
}
</script>
