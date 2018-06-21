<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="200px" size="medium">
      <div class="form-title">行驶证信息</div>
      <div class="form-block">
        <el-form-item label="车牌" prop="plateNum">
          <el-input v-model="formData.plateNum"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="formData.address"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-input v-model="formData.type"></el-input>
        </el-form-item>
        <el-form-item label="使用性质" prop="useProperty">
          <el-input v-model="formData.useProperty"></el-input>
        </el-form-item>
        <el-form-item label="品牌型号" prop="brand">
          <el-input v-model="formData.brand"></el-input>
        </el-form-item>
        <el-form-item label="车架号" prop="vin">
          <el-input v-model="formData.vin"></el-input>
        </el-form-item>
        <el-form-item label="整备重量" prop="approveWeight">
          <el-input v-model="formData.approveWeight"></el-input>
        </el-form-item>
        <el-form-item label="核载重量" prop="curbWeight">
          <el-input v-model="formData.curbWeight"></el-input>
        </el-form-item>
        <el-form-item label="发动机号" prop="engineNum">
          <el-input v-model="formData.engineNum"></el-input>
        </el-form-item>
        <el-form-item label="档案编号" prop="fileNumber">
          <el-input v-model="formData.fileNumber"></el-input>
        </el-form-item>
        <el-form-item label="发证日期" prop="issuingDate">
          <el-date-picker v-model="formData.issuingDate" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
        </el-form-item>
        <el-form-item label="所有人" prop="owner">
          <el-input v-model="formData.owner"></el-input>
        </el-form-item>
        <el-form-item label="载客人数" prop="peopleNumber">
          <el-input v-model="formData.peopleNumber"></el-input>
        </el-form-item>
        <el-form-item label="牵引重量" prop="pullWeight">
          <el-input v-model="formData.pullWeight"></el-input>
        </el-form-item>
        <el-form-item label="车辆行驶证注册日期" prop="registerDate">
          <el-date-picker v-model="formData.registerDate" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
        </el-form-item>
        <el-form-item label="尺寸" prop="size">
          <el-input v-model="formData.size"></el-input>
        </el-form-item>
        <el-form-item label="总重量" prop="totalWeight">
          <el-input v-model="formData.totalWeight"></el-input>
        </el-form-item>
        <el-form-item label="行驶证图片" prop="carDrivingLicensePath">
          <img-upload
            :uploadData="{fileType: 'CAR_DRIVING_LICENSE'}"
            @ocr="handleUpload1"
            :path.sync="formData.carDrivingLicensePath">
          </img-upload>
        </el-form-item>
        <el-form-item label="检验有效截止日期" prop="checkEndDate">
          <el-date-picker v-model="formData.checkEndDate" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
        </el-form-item>
      </div>
      <div class="form-title">保险信息</div>
      <div class="form-block">
        <el-form-item label="承运人责任险保单号" prop="cliNum">
          <el-input v-model="formData.cliNum"></el-input>
        </el-form-item>
        <el-form-item label="承运人责任险有效期开始日期" prop="cliValidityStartDate">
          <el-date-picker v-model="formData.cliValidityStartDate" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
        </el-form-item>
        <el-form-item label="承运人责任险有效期截止日期" prop="cliValidityEndDate">
          <el-date-picker v-model="formData.cliValidityEndDate" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
        </el-form-item>
        <el-form-item label="承运人责任险图片" prop="cliPath">
          <img-upload
            :path.sync="formData.cliPath">
          </img-upload>
        </el-form-item>
        <el-form-item label="交强险保单号" prop="tciNum">
          <el-input v-model="formData.tciNum"></el-input>
        </el-form-item>
        <el-form-item label="交强险有效截止日期" prop="tciValidityEndDate">
          <el-date-picker v-model="formData.tciValidityEndDate" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
        </el-form-item>
        <el-form-item label="交强险图片" prop="tciPath">
          <img-upload
            :path.sync="formData.tciPath">
          </img-upload>
        </el-form-item>
        <el-form-item label="商业险保单号" prop="ciNum">
          <el-input v-model="formData.ciNum"></el-input>
        </el-form-item>
        <el-form-item label="商业险有效截止日期" prop="ciValidityEndDate">
          <el-date-picker v-model="formData.ciValidityEndDate" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
        </el-form-item>
        <el-form-item label="商业险图片" prop="ciPath">
          <img-upload
            :path.sync="formData.ciPath">
          </img-upload>
        </el-form-item>
      </div>
      <div class="form-title">营运证信息</div>
      <div class="form-block">
        <el-form-item label="营运证号" prop="roadTransportNum">
          <el-input v-model="formData.roadTransportNum"></el-input>
        </el-form-item>
        <el-form-item label="营运证有效期开始日期" prop="roadTransportValidityStartDate">
          <el-date-picker v-model="formData.roadTransportValidityStartDate" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
        </el-form-item>
        <el-form-item label="营运证有效期截止日期" prop="roadTransportValidityEndDate">
          <el-date-picker v-model="formData.roadTransportValidityEndDate" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
        </el-form-item>
        <el-form-item label="营运证年审有效期" prop="motValidityEndDate">
          <el-date-picker v-model="formData.motValidityEndDate" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
        </el-form-item>
        <el-form-item label="营运证图片" prop="motPath">
          <img-upload
            :path.sync="formData.motPath">
          </img-upload>
        </el-form-item>

        <el-form-item label="道路经营许可经营范围" prop="bizScopeIds">
          <el-transfer
            v-model="formData.bizScopeIds"
            :right-default-checked="formData.bizScopeIds"
            :data="bizScopeList"
            :titles="['可选列表', '已选列表']"
            :props="{
              key: 'id',
              label: 'scopeName'
            }" />
        </el-form-item>
      </div>
      <div class="form-title">罐体信息</div>
      <div class="form-block">
        <el-form-item label="罐体检测有效期" prop="tankValidityEndDate">
          <el-date-picker v-model="formData.tankValidityEndDate" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
        </el-form-item>
        <el-form-item label="罐体检测报告" prop="tankReportPath">
          <img-upload
            :path.sync="formData.tankReportPath">
          </img-upload>
        </el-form-item>
      </div>
      <div class="form-title">技术等级信息</div>
      <div class="form-block">
        <el-form-item label="技术等级评定" prop="technicalGrade">
          <el-input v-model="formData.technicalGrade"></el-input>
        </el-form-item>
         <el-form-item label="技术等级评定有效期开始日期" prop="technicalGradeValidityStartDate">
          <el-date-picker v-model="formData.technicalGradeValidityStartDate" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
        </el-form-item>
        <el-form-item label="技术等级评定有效期截止日期" prop="technicalGradeValidityEndDate">
          <el-date-picker v-model="formData.technicalGradeValidityEndDate" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
        </el-form-item>
        <el-form-item label="技术等级证书图片" prop="technicalGradePath">
          <img-upload
            :path.sync="formData.technicalGradePath">
          </img-upload>
        </el-form-item>
      </div>
      <div class="form-title">挂车信息（挂车无需设置）</div>
      <div class="form-block">
        <el-form-item label="挂车" prop="trailerId">
          <el-select v-model="formData.trailerId" filterable>
            <el-option v-for="item in carList" :key="item.id" :label="item.carPlateNum" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="驾驶员" prop="driverId">
          <el-select v-model="formData.driverId" filterable>
            <el-option v-for="item in userList" :key="item.id" :label="item.userName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="押运员" prop="escortId">
          <el-select v-model="formData.escortId" filterable>
            <el-option v-for="item in userList2" :key="item.id" :label="item.userName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="form-title">其他信息</div>
      <div class="form-block">
        <el-form-item label="GPS安装证明图片" prop="gpsInstallPath">
          <img-upload
            :path.sync="formData.gpsInstallPath">
          </img-upload>
        </el-form-item>
        <el-form-item label="登记证书图片" prop="registerPath">
          <img-upload
            :path.sync="formData.registerPath">
          </img-upload>
        </el-form-item>
        <el-form-item label="营运状态" prop="statusId">
          <el-select v-model="formData.statusId">
            <el-option v-for="item in statusList" :key="item.id" :label="item.statusName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <el-dialog :visible.sync="dialogVisible" append-to-body>
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" :loading="posting">保存</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import uploadMixin from '@/mixins/upload'
import saveMixin from '@/mixins/saveform'
export default {
  mixins: [uploadMixin, saveMixin],
  data() {
    return {
      id: parseInt(this.$route.query.id),
      formData: {
        companyId:sessionStorage.getItem('companyId'),
        carTeamId: this.sid,
        plateNum: '',
        address: '',
        approveWeight: '',
        brand: '',
        carDrivingLicensePath: '',
        checkEndDate: '',
        cliPath: '',
        cliValidityEndDate: '',
        cliValidityStartDate: '',
        curbWeight: '',
        engineNum: '',
        fileNumber: '',
        gpsInstallPath: '',
        issuingDate: '',
        motPath: '',
        motValidityEndDate: '',
        owner: '',
        peopleNumber: '',
        pullWeight: '',
        registerDate: '',
        registerPath: '',
        roadTransportNum: '',
        roadTransportValidityEndDate: '',
        roadTransportValidityStartDate: '',
        size: '',
        tankValidityEndDate: '',
        tankReportPath: '',
        technicalGrade: '',
        technicalGradePath: '',
        technicalGradeValidityEndDate: '',
        technicalGradeValidityStartDate: '',
        totalWeight: '',
        type: '',
        useProperty: '',
        vin: '',
        tciNum: '',
        tciPath: '',
        tciValidityEndDate: '',
        ciNum: '',
        ciPath: '',
        ciValidityEndDate: '',
         bizScopeIds: []
      },
      rules: {},
      apiName: 'car/',
      addApi: 'add',
      updateApi: 'update',
      carList: [],
      userList: [],
      userList2: [],
      statusList: [],
      bizScopeList: [],
    }
  },
  mounted() {
    this.id && this.getDetail()
    this.getCarList()
    this.getuserList()
    this.getuserList2()
    this.getstatusList()
    this.getBizScopeList()
  },
  methods: {
    async getstatusList() {
      let {data} = await this.$http({url:'carStatus/getList',params:{companyId:sessionStorage.getItem('companyId')}})
      if (data.code == 0) {
        this.statusList = data.data
      }
    },
    async getBizScopeList() {
      let {data} = await this.$http({url:'bizScope/getList',params:{companyId:sessionStorage.getItem('companyId')}})
      if (data.code == 0) {
        this.bizScopeList = data.data
      }
    },
    async getCarList() {
      let {data} = await this.$http({
        url: 'car/getList',
        params: {
          carType: 1,
          companyId:sessionStorage.getItem('companyId')
        }
      })
      if (data.code == 0) {
        this.carList = data.data
      }
    },
    async getuserList() {
      let {data} = await this.$http({
        url: 'user/getList',
        params: {
          roleId: 1,
          companyId:sessionStorage.getItem('companyId')
        }
      })
      if (data.code == 0) {
        this.userList = data.data
      }
    },
    async getuserList2() {
      let {data} = await this.$http({
        url: 'user/getList',
        params: {
          roleId: 2,
          companyId:sessionStorage.getItem('companyId')
        }
      })
      if (data.code == 0) {
        this.userList2 = data.data
      }
    },
    handleUpload1(res) {
      if (res.car) {
        this.formData.address = res.car.address
        this.formData.brand = res.car.brand
        this.formData.engineNum = res.car.engineNum
        this.formData.issuingDate = res.car.issuingDate
        this.formData.owner = res.car.owner
        this.formData.plateNum = res.car.plateNum
        this.formData.registerDate = res.car.registerDate
        this.formData.type = res.car.type
        this.formData.useProperty = res.car.useProperty
        this.formData.vin = res.car.vin
      }
    },
    async getDetail() {
      let {data} = await this.$http({
        url: 'car/get/' + this.id
      })
      if (data.code == 0) {
        this.formData = data.data
        this.formData.id = this.id
        this.formData.carTeamId = this.sid
      }
    }
  }
}
</script>