<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="100px" size="medium">
      <el-form-item label="电子路单" prop="orderId">
        <el-select v-model="formData.orderId" placeholder="请选择">
          <el-option v-for="item in orderIdList" :key="item.id" :label="item.orderNum" :value="item.id"></el-option>
        </el-select>
        <el-select v-model="carId" @change="getOrderList" filterable placeholder="选择车牌号筛选">
          <el-option
            v-for="item in carList"
            :key="item.id"
            :label="item.carPlateNum"
            :value="item.id">
          </el-option>
        </el-select>
        <el-date-picker v-model="loadingTime" type="date" @change="getOrderList" value-format="yyyy-MM-dd HH:mm" placeholder="选择时间筛选"></el-date-picker>
      </el-form-item>
      <el-form-item label="事故时间" prop="occurredTime">
        <el-date-picker v-model="formData.occurredTime" type="datetime" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
      </el-form-item>
      <el-form-item label="事故地点" prop="occurredAddress">
        <el-input v-model="formData.occurredAddress"></el-input>
      </el-form-item>
      <el-form-item label="天气状况" prop="weatherStatus">
        <el-input v-model="formData.weatherStatus"></el-input>
      </el-form-item>
      <el-form-item label="道路状况" prop="roadStatus">
        <el-input v-model="formData.roadStatus"></el-input>
      </el-form-item>
      <el-form-item label="死亡人数" prop="deathNum">
        <el-input-number v-model="formData.deathNum" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="失踪人数" prop="missingNum">
        <el-input-number v-model="formData.missingNum" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="受伤人数" prop="injuredNum">
        <el-input-number v-model="formData.injuredNum" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="事故描述" prop="description">
        <el-input v-model="formData.description"></el-input>
      </el-form-item>
      <el-form-item label="事故原因" prop="reason">
        <el-input v-model="formData.reason"></el-input>
      </el-form-item>
      <el-form-item label="统计人姓名" prop="statisticsPersonName">
        <el-input v-model="formData.statisticsPersonName"></el-input>
      </el-form-item>
      <el-form-item label="填表人姓名" prop="fillPersonName">
        <el-input v-model="formData.fillPersonName"></el-input>
      </el-form-item>
      <el-form-item label="填表人号码" prop="fillPersonMobile">
        <el-input v-model="formData.fillPersonMobile"></el-input>
      </el-form-item>
      <el-form-item label="报出时间" prop="submitDate">
        <el-date-picker v-model="formData.submitDate" type="datetime" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
      </el-form-item>
      <el-form-item label="单位负责人" prop="companyPrincipal">
        <el-input v-model="formData.companyPrincipal"></el-input>
      </el-form-item>
      <el-form-item label="事故责任" prop="accidentDutyId">
        <el-select v-model="formData.accidentDutyId" placeholder="请选择">
          <el-option v-for="item in dutyList" :key="item.id" :label="item.dutyName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="理赔金额" prop="claimAmount">
        <el-input v-model="formData.claimAmount"></el-input>
      </el-form-item>
      <el-form-item label="实际赔付" prop="actualAmount">
        <el-input v-model="formData.actualAmount"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="formData.remark"></el-input>
      </el-form-item>
      <el-form-item label="承运人责任险保单号" v-if="id" prop="ciNum">
        <el-input disabled v-model="formData.ciNum"></el-input>
      </el-form-item>
      <el-form-item label="交强险保单号" v-if="id" prop="tciNum">
        <el-input disabled v-model="formData.tciNum"></el-input>
      </el-form-item>
      <el-form-item label="商业险保单号" v-if="id" prop="ciNum">
        <el-input disabled v-model="formData.ciNum"></el-input>
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
import saveMixin from '@/mixins/saveform'
import reform from '@/mixins/reform'
export default {
  mixins: [saveMixin, reform],
  data() {
    return {
      id: parseInt(this.$route.query.id),
      orderIdList: [],
      dutyList: [],
      formData: {
        companyId: sessionStorage.getItem('companyId'),
        orderId: '',
        occurredTime: '',
        occurredAddress: '',
        weatherStatus: '',
        roadStatus: '',
        deathNum: '',
        missingNum: '',
        injuredNum: '',
        description: '',
        reason: '',
        statisticsPersonName: '',
        fillPersonName: '',
        fillPersonMobile: '',
        companyPrincipal: '',
        accidentDutyId: '',
        remark: '',
        claimAmount: '',
        actualAmount: ''
      },
      rules: {},
      carList: [],
      carId: '',
      loadingTime: null,
      apiName: 'accident/',
      addApi: 'add',
      updateApi: 'update'
    }
  },
  mounted() {
    this.getOrderList()
    this.getCarList()
    this.getDutyList()
    this.id && this.getDetail()
  },
  methods: {
    async getCarList() {
      let {data} = await this.$http({
        url: '/car/getList',
        params:{
          companyId:sessionStorage.getItem('companyId')
        }
      })
      if (data.code == 0) {
        this.carList = data.data
      }
    },
    async getDutyList() {
      let {data} = await this.$http({
        url: 'accidentDuty/getList',
        params:{
          companyId:sessionStorage.getItem('companyId')
        }
      })
      if (data.code == 0) {
        this.dutyList = data.data
      }
    },
    async getOrderList() {
      let {data} = await this.$http({
        url: 'order/getList',
        params: {
          companyId: sessionStorage.getItem('companyId'),
          currentPage: 1,
          size: 50,
          carId: this.carId,
          loadingTime: this.loadingTime
        }
      })
      if (data.code == 0) {
        this.orderIdList = data.data.list
      }
    },
    async getDetail() {
      let {data} = await this.$http({
        url: 'accident/get/' + this.id,
      })
      if (data.code == 0) {
        this.formData = data.data
        this.formData.accidentId = this.id
      }
    }
  }
}
</script>
