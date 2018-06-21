<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="180px">
      <div class="form-title">基本信息</div>
      <div class="form-block">
        <el-input v-model="formData.companyId" v-show="false"></el-input>
        <el-form-item label="人员名称" prop="userName">
          <el-input v-model="formData.userName"></el-input>
        </el-form-item>
        <el-form-item label="人员类型" prop="roleId">
          <el-select v-model="formData.roleId" placeholder="请选择">
            <el-option v-for="item in roleList" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系号码" prop="mobile">
          <el-input v-model="formData.mobile"></el-input>
        </el-form-item>
        <el-form-item label="人员状态" prop="status">
          <el-select v-model="formData.status" placeholder="请选择">
            <el-option v-for="item in userStatusList" :key="item.id" :label="item.userStatusName" :value="item.id"></el-option>
          </el-select>
          <!-- <el-select v-model="formData.status" placeholder="请选择">
            <el-option label="在职" :value="0"></el-option>
            <el-option label="离职" :value="1"></el-option>
          </el-select> -->
        </el-form-item>
      </div>
      <div class="form-title">身份证信息</div>
      <div class="form-block">
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="formData.gender">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="formData.age"></el-input>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthday">
          <el-date-picker v-model="formData.birthday" type="date" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
        </el-form-item>
        <el-form-item label="民族" prop="nation">
          <el-input v-model="formData.nation"></el-input>
        </el-form-item>
        <el-form-item label="发证机关" prop="issuingAuthority">
          <el-input v-model="formData.issuingAuthority"></el-input>
        </el-form-item>
        <el-form-item label="身份证有效期开始日期" prop="idCardValidityStartDate">
          <el-date-picker v-model="formData.idCardValidityStartDate" type="date" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
        </el-form-item>
        <el-form-item label="身份证有效期截止日期" prop="idCardValidityEndDate">
          <el-date-picker v-model="formData.idCardValidityEndDate" type="date" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
        </el-form-item>
        <el-form-item label="身份证号" prop="idCardNum">
          <el-input v-model="formData.idCardNum"></el-input>
        </el-form-item>
        <el-form-item label="身份证地址" prop="address">
          <el-input v-model="formData.address"></el-input>
        </el-form-item>
        <el-form-item label="身份证正面" prop="idCardPath0">
          <img-upload
            :uploadData="{fileType: 'ID_CARD0'}"
            @ocr="handleUpload1"
            :path.sync="formData.idCardPath0">
          </img-upload>
        </el-form-item>
        <el-form-item label="身份证反面" prop="idCardPath1">
          <img-upload
            :uploadData="{fileType: 'ID_CARD1'}"
            @ocr="handleUpload2"
            :path.sync="formData.idCardPath1">
          </img-upload>
        </el-form-item>
      </div>
      <div class="form-title">从业资格证信息</div>
      <div class="form-block">
        <el-form-item label="从业资格证类型" prop="qualificationCertificateTypeId">
          <el-select v-model="formData.qualificationCertificateTypeId" placeholder="请选择">
            <el-option v-for="item in qualificationCertificateTypeList" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="从业资格证号" prop="qualificationLicenseNum">
          <el-input v-model="formData.qualificationLicenseNum"></el-input>
        </el-form-item>
        <el-form-item label="从业资格证初次领证日期" prop="qualificationFirstDate">
          <el-date-picker v-model="formData.qualificationFirstDate" type="date" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
        </el-form-item>
        <el-form-item label="从业资格证有效期开始日期" prop="qualificationValidityStartDate">
          <el-date-picker v-model="formData.qualificationValidityStartDate" type="date" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
        </el-form-item>
        <el-form-item label="从业资格证有效期截止日期" prop="qualificationValidityEndDate">
          <el-date-picker v-model="formData.qualificationValidityEndDate" type="date" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
        </el-form-item>
        
        <el-form-item label="从业资格证图片" prop="qualificationLicensePath">
          <img-upload
            :path.sync="formData.qualificationLicensePath">
          </img-upload>
        </el-form-item>
      </div>
      <div class="form-title">驾驶证信息</div>
      <div class="form-block">
        <el-form-item label="驾驶证图片" prop="driverLicensePath">
          <img-upload
            :uploadData="{fileType: 'DRIVER_LICENSE'}"
            @ocr="handleUpload3"
            :path.sync="formData.driverLicensePath">
          </img-upload>
        </el-form-item>
        <el-form-item label="驾驶证初次领证日期" prop="driverFirstDate">
          <el-date-picker v-model="formData.driverFirstDate" type="date" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
        </el-form-item>
        <el-form-item label="驾驶证发证机关" prop="driverIssuingAuthority">
          <el-input v-model="formData.driverIssuingAuthority"></el-input>
        </el-form-item>
        <el-form-item label="准驾车型" prop="driverType">
          <el-input v-model="formData.driverType"></el-input>
        </el-form-item>
        <el-form-item label="驾驶证有效期开始日期" prop="driverValidityStartDate">
          <el-date-picker v-model="formData.driverValidityStartDate" type="date" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
        </el-form-item>
        <el-form-item label="驾驶证有效期结束日期" prop="driverValidityEndDate">
          <el-date-picker v-model="formData.driverValidityEndDate" type="date" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
        </el-form-item>
        
      </div>
      <el-dialog :visible.sync="dialogVisible" append-to-body>
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import saveMixin from '@/mixins/saveform'
import uploadMixin from '@/mixins/upload'
export default {
  mixins: [uploadMixin, saveMixin],
  data() {
    return {
      id: parseInt(this.$route.query.id),
      formData: {
        userName: '',
        roleId: '',
        gender: '',
        age: '',
        birthday: '',
        nation: '',
        address: '',
        idCardNum: '',
        mobile: '',
        idCardPath0: '',
        idCardPath1: '',
        issuingAuthority: '',
        qualificationLicenseNum: '',
        qualificationCertificateTypeName: '',
        qualificationLicensePath: '',
        driverLicensePath: '',
        driverIssuingAuthority: '',
        driverType: '',
        companyId:sessionStorage.getItem('companyId')
      },
      rules: {},
      apiName: 'user/',
      addApi: 'add',
      updateApi: 'update',
      roleList: [],
      userStatusList:[],
      qualificationCertificateTypeList: []
    }
  },
  mounted() {
    this.getRoleList()
    this.getStatusList()
    this.getQualificationCertificateTypeList()
    this.id && this.getDetail()
  },
  methods: {
    async getQualificationCertificateTypeList() {
      let {data} = await this.$http({
        url:'qualificationCertificateType/getList',
        params:{
          companyId:sessionStorage.getItem('companyId')
        }
      })
      if (data.code == 0) {
        this.qualificationCertificateTypeList = data.data
      }
    },
    async getStatusList() {
      let {data} = await this.$http({
        url:'userStatus/getList',
        params:{
          companyId:sessionStorage.getItem('companyId')
        }
      })
      if (data.code == 0) {
        this.userStatusList = data.data
      }
    },
    async getRoleList() {
      let {data} = await this.$http({
        url:'role/getList',
        params:{
          companyId:sessionStorage.getItem('companyId')
        }
      })
      if (data.code == 0) {
        this.roleList = data.data
      }
    },
    handleUpload1(res) {
      if (res.user) {
        this.formData.address = res.user.address
        this.formData.birthday = res.user.birthday
        this.formData.gender = res.user.gender
        this.formData.idCardNum = res.user.idCardNum
        this.formData.nation = res.user.nation
        this.formData.userName = res.user.userName
      }
    },
    handleUpload2(res) {
      if (res.user) {
        this.formData.idCardValidityEndDate = res.user.idCardValidityEndDate
        this.formData.idCardValidityStartDate = res.user.idCardValidityStartDate
        this.formData.issuingAuthority = res.user.issuingAuthority
      }
    },
    handleUpload3(res) {
      if (res.user) {
        this.formData.driverFirstDate = res.user.driverFirstDate
        this.formData.driverIssuingAuthority = res.user.driverIssuingAuthority
        this.formData.driverType = res.user.driverType
        this.formData.driverValidityEndDate = res.user.driverValidityEndDate
        this.formData.driverValidityStartDate = res.user.driverValidityStartDate
      }
    },
    async getDetail() {
      let {data} = await this.$http({
        url: 'user/get/' + this.id
      })
      if (data.code == 0) {
        this.formData = data.data
        this.formData.id = this.id
      }
    }
  }
}
</script>
