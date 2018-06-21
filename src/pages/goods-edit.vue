<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="100px" size="medium">
      <el-form-item label="货物名称" prop="goodsName">
        <el-input v-model="formData.goodsName"></el-input>
      </el-form-item>
      <el-form-item label="货物类别" prop="bizScopeId">
        <el-select v-model="formData.bizScopeId" placeholder="请选择">
          <el-option v-for="item in goodsTypeList" :key="item.id" :label="item.scopeName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="货物包装类型" prop="goodsPackage">
        <el-input v-model="formData.goodsPackage"></el-input>
      </el-form-item>
      <el-form-item label="计量单位" prop="unit">
        <el-input v-model="formData.unit"></el-input>
      </el-form-item>
      <el-form-item label="安全卡" prop="safeCardPath">
        <img-upload
          :path.sync="formData.safeCardPath">
        </img-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
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
        bizScopeId: '',
        goodsName: '',
        goodsPackage: '',
        safeCardPath: '',
        unit: ''
      },
      rules: {},
      apiName: 'goods/',
      addApi: 'add',
      updateApi: 'update',
      goodsTypeList: []
    }
  },
  mounted() {
    this.id && this.getDetail()
    this.getGoodsTypeList()
  },
  methods: {
    async getGoodsTypeList() {
      let {data} = await this.$http({url:'bizScope/getList',params:{companyId:sessionStorage.getItem('companyId')}})
      if (data.code == 0) {
        this.goodsTypeList = data.data
      }
    },
    async getDetail() {
      let {data} = await this.$http({
        url: 'goods/get/' + this.id
      })
      if (data.code == 0) {
        this.formData = data.data
        this.formData.id = this.id
      }
    }
  }
}
</script>
