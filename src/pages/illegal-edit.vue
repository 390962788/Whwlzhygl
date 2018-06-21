<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="100px" size="medium">
      <el-form-item label="违章驾驶人" prop="regulationPerson">
        <el-input v-model="formData.regulationPerson"></el-input>
      </el-form-item>
      <el-form-item label="违章车辆" prop="carId">
        <el-select v-model="formData.carId" filterable placeholder="输入车牌号筛选">
          <el-option
            v-for="item in carList"
            :key="item.id"
            :label="item.carPlateNum"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="违章时间" prop="regulationTime">
        <el-date-picker v-model="formData.regulationTime" type="datetime" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
      </el-form-item>
      <el-form-item label="违章地址" prop="regulationAddress">
        <el-input v-model="formData.regulationAddress"></el-input>
      </el-form-item>
      <el-form-item label="该记录状态" prop="recordStatus">
        <el-radio-group v-model="formData.recordStatus">
          <el-radio :label="0">已处理</el-radio>
          <el-radio :label="1">未处理</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="违章类型" prop="regulationType">
        <el-radio-group v-model="formData.regulationType">
          <el-radio :label="0">交通违法</el-radio>
          <el-radio :label="1">不安全行为</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="附件照片名称" prop="accessoryNames">
        <img-upload
          :path.sync="formData.accessoryNames">
        </img-upload>
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
import uploadMixin from '@/mixins/upload'
export default {
  mixins: [uploadMixin, saveMixin, reform],
  data() {
    return {
      id: parseInt(this.$route.query.id),
      formData: {
        companyId: sessionStorage.getItem('companyId'),
        regulationPerson: '',
        carId: '',
        regulationTime: '',
        regulationAddress: '',
        recordStatus: '',
        accessoryNames: '',
        regulationType: ''
      },
      carList: [],
      rules: {},
      apiName: 'regulationRecord/',
      addApi: 'add',
      updateApi: 'update'
    }
  },
  mounted() {
    this.id && this.getDetail()
    this.getCarList()
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
    async getDetail() {
      let {data} = await this.$http({
        url: 'regulationRecord/get/' + this.id
      })
      if (data.code == 0) {
        this.formData = data.data
        this.formData.id = this.id
      }
    }
  }
}
</script>
