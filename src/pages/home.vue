<template>
  <div class="home-wrap">
    <div class="sec">
      <div class="logo">
        <el-button @click="$router.push({name: 'Home'})">此处为LOGO</el-button>
      </div>
      <div class="right">
        <user-info></user-info>
      </div>
    </div>
    <el-card class="sec">
      <div slot="header" class="clearfix">
        <span>通知公告</span>
        <router-link to="/notice">
          <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
        </router-link>
      </div>
      <el-table
        
        :show-header="false"
        :data="tableData0"
        style="width: 100%;height: 200px;overflow-y:auto">
        <el-table-column
          prop="noticeTitle">
        </el-table-column>
        <el-table-column
          width="150px"
          :formatter="timeformat"
          prop="noticeDate">
        </el-table-column>
      </el-table>
    </el-card>
    <div class="ov">
      <el-card class="sec half-row">
        <div slot="header" class="clearfix">
          <span>证件到期</span>
          <router-link to="/person">
            <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
          </router-link>
        </div>
        <el-table
          :show-header="false"
          :data="tableData1"
          style="width: 100%;height: 200px;overflow-y:auto">
          <el-table-column
            prop="title">
          </el-table-column>
          <el-table-column
            width="280px"
            prop="contents">
          </el-table-column>
          <el-table-column
            :formatter="timeformat"
            prop="licenseEndDate">
          </el-table-column>
        </el-table>
      </el-card>
      <el-card class="sec half-row">
        <div slot="header" class="clearfix">
          <span>电子路单</span>
          <router-link to="/order">
            <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
          </router-link>
        </div>
        <el-table
        
          :show-header="false"
          :data="tableData2"
          style="width: 100%;height: 200px;overflow-y:auto">
          <el-table-column
            prop="goodsName">
          </el-table-column>
          <el-table-column
            prop="orderNum">
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <el-card class="sec half-row">
      <div slot="header" class="clearfix">
        <span>违章信息</span>
        <router-link to="/illegal">
          <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
        </router-link>
      </div>
      <el-table
      
        :show-header="false"
        :data="tableData3"
        style="width: 100%;height: 200px;overflow-y:auto">
        <el-table-column
          prop="plateNum">
        </el-table-column>
        <el-table-column
          prop="regulationTime">
        </el-table-column>
      </el-table>
    </el-card>
    <div class="sec half-row">
      <e-charts :options="options1"></e-charts>
    </div>
  </div>
</template>
<script>
// import ECharts from 'vue-echarts/components/ECharts.vue'
// import 'echarts/lib/chart/pie'
// import 'echarts/lib/component/tooltip'
// import 'echarts/lib/component/title'
import UserInfo from './user-info'
import timeformat from '@/mixins/timeformat'
import login from '@/mixins/login'
export default {
  mixins: [timeformat, login],
  components: {
    UserInfo,
    ECharts: async () => {
      await import ('echarts/lib/chart/pie')
      await import ('echarts/lib/component/tooltip')
      await import ('echarts/lib/component/title')
      return import('vue-echarts/components/ECharts.vue')
    }
  },
  data() {
    return {
      tableData0: [],
      tableData1: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
      apiList: ['getNotices', 'getLicenseEndDates', 'getOrders', 'getRegulationRecords', 'getCars'],
      options1: {
        title: {
          text: '车辆分布饼状图'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: {
            name:'车辆分布',
            type:'pie',
            radius : '55%',
            center: ['50%', '50%'],
            data: [],
            roseType: 'radius',
            label: {
                normal: {
                    textStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    }
                }
            },
            labelLine: {
                normal: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                }
            },
            itemStyle: {
                normal: {
                    color: '#c23531',
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
                return Math.random() * 200;
            }
        }
      }
    }
  },
  mounted() {
    this.getList(0)
    this.getList(1)
    this.getList(2)
    this.getList(3)
    this.getList(4)
  },
  methods: {
    async getList(index) {
      let {data} = await this.$http({
        url: 'index/' + this.apiList[index],
        params: {
          companyId: sessionStorage.getItem('companyId')
        }
      })
      if (data.code == 0) {
        if (index == 4) {
          this.options1.series.data = data.data.map(item => {
            return {
              name: item.type,
              value: item.count
            }
          }).sort(function (a, b) { return a.value - b.value; })
        } else {
          this['tableData'+index] = data.data
        }
      }
    }
  }
}
</script>
<style scoped>
.home-wrap{
  padding: 0 1%;
}
.ov{
  overflow: hidden;
}
.half-row{
  width: 48%;
  float: left;
  box-sizing: border-box;
  min-height: 340px;
}
.sec{
  margin: 1%;
  overflow: hidden;
}
.logo{
  float: left;
}
.right{
  float: right;
}
</style>
