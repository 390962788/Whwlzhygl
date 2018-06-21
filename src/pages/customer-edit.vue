<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="100px" size="medium">
      <el-form-item label="客户名称" prop="customerName">
        <el-input v-model="formData.customerName"></el-input>
      </el-form-item>
      <el-form-item label="客户地址" prop="customerAddress">
        <el-input v-model="formData.customerAddress"></el-input>
      </el-form-item>
          <el-form-item label="发货方联系人" prop="linkmanName">
            <el-input v-model="formData.linkmanName"></el-input>
          </el-form-item>
          <el-form-item label="发货方号码" prop="linkmanMobile">
            <el-input v-model="formData.linkmanMobile"></el-input>
          </el-form-item>
          <el-form-item label="发货地址" prop="sendAddrIds">
            <china-city :cityarr.sync="formData.sendAddrIds"></china-city>
          </el-form-item>
          <el-form-item label="详细地址" prop="sendAddress">
            <el-input v-model="formData.sendAddress"></el-input>
          </el-form-item>
          <el-form-item label="收货方联系人" prop="receiveName">
            <el-input v-model="formData.receiveName"></el-input>
          </el-form-item>
          <el-form-item label="收货方号码" prop="receiveMobile">
            <el-input v-model="formData.receiveMobile"></el-input>
          </el-form-item>
          <el-form-item label="收货地址" prop="receiveAddrIds">
            <china-city :cityarr.sync="formData.receiveAddrIds"></china-city>
          </el-form-item>
          <el-form-item label="详细地址" prop="receiveAddress">
            <el-input v-model="formData.receiveAddress"></el-input>
          </el-form-item>
      <el-form-item label="合同图片" prop="contractPath">
        <img-upload
          :path.sync="formData.contractPath">
        </img-upload>
      </el-form-item>
      <el-form-item label="营业执照图片" prop="bizLicensePath">
        <img-upload
          :path.sync="formData.bizLicensePath">
        </img-upload>
      </el-form-item>
      <el-form-item label="其他附件" prop="accessoryNames">
        <img-upload
          :path.sync="formData.accessoryNames">
        </img-upload>
      </el-form-item>
      <el-dialog :visible.sync="dialogVisible">
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
import ChinaCity from '@/components/china-city'
export default {
  mixins: [uploadMixin, saveMixin],
  components: {
    ChinaCity
  },
  data() {
    return {
      id: parseInt(this.$route.query.id),
      formData: {
        companyId: sessionStorage.getItem('companyId'),
        customerAddress: '',
        customerName: '',
        linkmanMobile: '',
        linkmanName: '',
        receiveAddress: '',
        sendAddress: '',
        accessoryNames: '',
        contractPath: '',
        sendAddrIds: '[]',
        receiveAddrIds: '[]',
        bizLicensePath: ''
      },
      rules: {},
      apiName: 'customer/',
      addApi: 'add',
      updateApi: 'update'
    }
  },
  mounted() {
    this.id && this.getDetail()
  },
  methods: {
    async getDetail() {
      let {data} = await this.$http({
        url: 'customer/get/' + this.id
      })
      if (data.code == 0) {
        this.formData = data.data
        this.formData.id = this.id
      }
    }
  }
}
</script>
