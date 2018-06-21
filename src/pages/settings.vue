<template>
  <div>
    <div class="form-title">门检检查项管理</div>
    <div class="form-block">
      <tag-mgr apiName="carCheckContent"></tag-mgr>
    </div>
    <div class="form-title">隐患排查检查项管理</div>
    <div class="form-block">
      <tag-mgr apiName="hiddenDangerCheckContent"></tag-mgr>
    </div>
    <div class="form-title">二级维护项管理</div>
    <div class="form-block">
      <tag-mgr apiName="maintenanceContent"></tag-mgr>
    </div>
  </div>
</template>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>

<script>
import tagMgr from '@/components/tagManager'
export default {
  components: {
    tagMgr
  }
}
</script>