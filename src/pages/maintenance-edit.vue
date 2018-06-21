<template>
  <div>
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="150px" size="medium">
      <el-form-item label="附件照片名称" prop="accessoryNames">
        <img-upload
          :path.sync="formData.accessoryNames">
        </img-upload>
      </el-form-item>
      <el-form-item label="维修类型" prop="maintenanceType">
        <el-radio-group v-model="formData.maintenanceType">
          <el-radio :label="0">车载设备维修</el-radio>
          <el-radio :label="1">车辆维修</el-radio>
        </el-radio-group>
      </el-form-item>
       <el-form-item label="计划维护开始日期" prop="maintenanceStartDate">
        <el-date-picker v-model="formData.maintenanceStartDate" type="date" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
      </el-form-item>
      <el-form-item label="计划维护截止日期" prop="maintenanceEndDate">
        <el-date-picker v-model="formData.maintenanceEndDate" type="date" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
      </el-form-item>
      <el-form-item label="实际维护开始日期" prop="actualStartDate">
        <el-date-picker v-model="formData.actualStartDate" type="date" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
      </el-form-item>
      <el-form-item label="实际维护结束日期" prop="actualEndDate">
        <el-date-picker v-model="formData.actualEndDate" type="date" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
      </el-form-item>
      
      <el-form-item label="维护的车辆" prop="carId">
        <el-select v-model="formData.carId" filterable placeholder="输入车牌号筛选">
          <el-option
            v-for="item in carList"
            :key="item.id"
            :label="item.carPlateNum"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="确认人" prop="confirmPerson">
        <el-input v-model="formData.confirmPerson"></el-input>
      </el-form-item>
      <el-form-item label="此次维护里程" prop="currentMaintenanceMileage">
        <el-input v-model="formData.currentMaintenanceMileage"></el-input>
      </el-form-item>
      <el-form-item label="上一次维护里程" prop="lastMaintenanceMileage">
        <el-input v-model="formData.lastMaintenanceMileage"></el-input>
      </el-form-item>
     
      <el-form-item label="维修人" prop="maintenancePerson">
        <el-input v-model="formData.maintenancePerson"></el-input>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" :loading="posting">保存</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <div v-if="id">
      <h3>二级维护计划详情列表：</h3>
      <maintenance-detail-list :id="id"></maintenance-detail-list>
    </div>
  </div>
</template>
<script>
import MaintenanceDetailList from "./maintenance-detail";
import saveMixin from "@/mixins/saveform";
import uploadMixin from "@/mixins/upload";
export default {
  mixins: [uploadMixin, saveMixin],
  components: {
    MaintenanceDetailList
  },
  data() {
    return {
      id: parseInt(this.$route.query.id),
      formData: {
        accessoryNames: "",
        carId: "",
        companyId: sessionStorage.getItem("companyId"),
        confirmPerson: "",
        currentMaintenanceMileage: 0,
        deviceMaintenanceId: 1,
        lastMaintenanceMileage: 0,
        maintenancePerson: "",
        maintenanceType: ""
      },
      rules: {},
      apiName: "maintenancePlan/",
      addApi: "add",
      updateApi: "update",
      carList: []
    };
  },
  mounted() {
    this.id && this.getDetail();
    //this.getCarTeamList()
    this.getCarList();
  },
  methods: {
    async getCarList() {
      let { data } = await this.$http({
        url: "/car/getList",
        params: {
          companyId: sessionStorage.getItem("companyId")
        }
      });
      if (data.code == 0) {
        this.carList = data.data;
      }
    },
    async getDetail() {
      let { data } = await this.$http({
        url: "maintenancePlan/get/" + this.id
      });
      if (data.code == 0) {
        this.formData = data.data;
        this.formData.id = this.id;
        this.getCarName();
      }
    }
  }
};
</script>
