<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="120px" :inline="true">
      <div class="order-row">
        <el-form-item label="路单单号" prop="orderNum">
          <el-input v-model="formData.orderNum" disabled></el-input>
        </el-form-item>
      </div>
      <div class="order-row">
        <el-form-item label="客户" prop="customerId">
          <el-select v-model="formData.customerId" filterable @change="cusChange">
            <el-option
              v-for="item in customerList"
              :key="item.id"
              :label="item.customerName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <el-form :model="cusData" ref="cusForm" v-if="formData.customerId" label-width="120px" :inline="true">
        <div class="order-row">
          <el-form-item label="发货方联系人" prop="linkmanName">
            <el-input v-model="cusData.linkmanName"></el-input>
          </el-form-item>
          <el-form-item label="发货方号码" prop="linkmanMobile">
            <el-input v-model="cusData.linkmanMobile"></el-input>
          </el-form-item>
          <el-form-item label="发货地址" prop="sendAddrIds">
            <china-city :cityarr.sync="cusData.sendAddrIds"></china-city>
          </el-form-item>
          <el-form-item label="详细地址" prop="sendAddress">
            <el-input v-model="cusData.sendAddress"></el-input>
          </el-form-item>
        </div>
        <div class="order-row">
          <el-form-item label="收货方联系人" prop="receiveName">
            <el-input v-model="cusData.receiveName"></el-input>
          </el-form-item>
          <el-form-item label="收货方号码" prop="receiveMobile">
            <el-input v-model="cusData.receiveMobile"></el-input>
          </el-form-item>
          <el-form-item label="收货地址" prop="receiveAddrIds">
            <china-city :cityarr.sync="cusData.receiveAddrIds"></china-city>
          </el-form-item>
          <el-form-item label="详细地址" prop="receiveAddress">
            <el-input v-model="cusData.receiveAddress"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div class="order-row">
        <el-form-item label="头车车辆" prop="carId">
          <el-select v-model="formData.carId" @change="carChange" filterable placeholder="输入车牌号筛选">
            <el-option
              v-for="item in carList"
              :key="item.id"
              :label="item.carPlateNum"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="挂车车辆" prop="trailerId">
          <el-select v-model="formData.trailerId" filterable placeholder="输入车牌号筛选">
            <el-option
              v-for="item in carList"
              :key="item.id"
              :label="item.carPlateNum"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="order-row">
        <el-form-item label="货物" prop="goodsId">
          <el-select v-model="formData.goodsId" filterable placeholder="输入货物筛选">
            <el-option
              v-for="item in goodsList"
              :key="item.id"
              :label="item.goodsName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="货物重量" prop="goodsWeight">
          <el-input v-model="formData.goodsWeight"></el-input>
        </el-form-item>
      </div>
      <div class="order-row">
        <people-select
          v-if="formData.driverId"
          label="驾驶员"
          :type="1"
          :pid.sync="formData.driverId"
          :idCardNum.sync="formData.driverIdCardNum"
          :mobile.sync="formData.driverMobile"
          :quaLicNum.sync="formData.driverQuaLicNum"
        ></people-select>
      </div>
      <div class="order-row">
        <people-select
          v-if="formData.escortId"
          label="押运员"
          :type="2"
          :pid.sync="formData.escortId"
          :idCardNum.sync="formData.escortIdCardNum"
          :mobile.sync="formData.escortMobile"
          :quaLicNum.sync="formData.escortQuaLicNum"
        ></people-select>
      </div>
      <div class="order-row">
        <el-form-item label="装货日期" prop="loadingTime">
          <el-date-picker v-model="formData.loadingTime" type="date" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
        </el-form-item>
        <el-form-item label="托运日期" prop="transportDate">
          <el-date-picker v-model="formData.transportDate" type="date" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
        </el-form-item>
        <el-form-item label="卸货日期" prop="unloadingTime">
          <el-date-picker v-model="formData.unloadingTime" type="date" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
        </el-form-item>
      </div>
      <div class="order-row">
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" :loading="posting">保存</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
import saveMixin from '@/mixins/saveform'
import ChinaCity from '@/components/china-city'
import PeopleSelect from '@/components/people-select'
export default {
  mixins: [saveMixin],
  components: {
    ChinaCity,
    PeopleSelect
  },
  data() {
    return {
      id: parseInt(this.$route.query.id),
      apiName: 'order/',
      addApi: 'add',
      updateApi: 'update',
      formData: {
        companyId: sessionStorage.getItem('companyId'),
        carId: '',
        trailerId: '',
        driverId: '',
        escortId: '',
        driverIdCardNum: '',
        driverMobile: '',
        driverQuaLicNum: '',
        escortIdCardNum: '',
        escortMobile: '',
        escortQuaLicNum: '',
        loadingTime:new Date(),
        transportDate:new Date(),
        unloadingTime:new Date()
      },
      cusData: {
        linkmanName: '',
        linkmanMobile: '',
        sendAddrIds: '[]',
        sendAddress: '',
        receiveName: '',
        receiveMobile: '',
        receiveAddrIds: '[]',
        receiveAddress: ''
      },
      customerList: [],
      carList: [],
      goodsList: [],
      rules: {}
    }
  },
  mounted() {
    this.id ? this.getDetail() : this.getOrderNum()
    this.getCustomerList()
    this.getCarList()
    this.getGoodsList()
  },
  methods: {
    async carChange() {
      console.log(this.formData.carId)
      let {data} = await this.$http({
        url: 'car/get/' + this.formData.carId
      })
      if (data.code == 0) {
        this.formData.trailerId = data.data.trailerId
        this.formData.driverId = data.data.driverId
        this.formData.escortId = data.data.escortId
      }
    },
    async cusSave() {
      let {data} = await this.$http({
        method: 'post',
        url: 'customer/update',
        data: this.cusData
      })
      if (data.code != 0) {
        this.$message.error(data.msg)
      }
    },
    beforePost() {
      this.cusSave()
    },
    async getGoodsList() {
      let {data} = await this.$http({
        url: '/goods/getList'
      })
      if (data.code == 0) {
        this.goodsList = data.data
      }
    },
    async getCarList() {
      let {data} = await this.$http({
        url: '/car/getList'
      })
      if (data.code == 0) {
        this.carList = data.data
      }
    },
    async getOrderNum() {
      let {data} = await this.$http({
        url: 'order/getOrderNum',
        params: {
          companyId: sessionStorage.getItem('companyId')
        }
      })
      if (data.code == 0) {
        this.formData.orderNum = data.data
      }
    },
    async getCustomerList() {
      let {data} = await this.$http({
        url: 'customer/getList',
        params: {
          companyId: sessionStorage.getItem('companyId')
        }
      })
      if (data.code == 0) {
        this.customerList = data.data
      }
    },
    async cusChange() {
      let {data} = await this.$http({
        url: 'customer/get/' + this.formData.customerId
      })
      if (data.code == 0) {
        this.cusData = data.data
      }
    },
    async getDetail() {
      let {data} = await this.$http({
        url: 'order/get/' + this.id
      })
      if (data.code == 0) {
        this.formData = data.data
        this.formData.customerId && this.cusChange()
      }
    }
  }
}
</script>
<style>
.el-form--inline .el-form-item__content{
  width: 200px;
}
.order-row .el-date-editor.el-input{
  width: 200px;
}
/* .order-row{
  border-top: 1px solid #aaa;
  padding-top: 10px;
} */
</style>
