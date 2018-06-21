<template>
  <div>
    <el-dropdown split-button @command="handleCommand">
      帐号：{{mobile}}
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <router-link to="admin">
      <el-button>进入系统</el-button>
    </router-link>
  </div>
</template>
<script>
export default {
  data() {
    return {
      mobile: sessionStorage.getItem('mobile'),
    }
  },
  methods: {
    handleCommand(c) {
      if (c == 'logout') {
        this.logout()
      }
    },
    logout() {
      sessionStorage.setItem('token','')
      sessionStorage.removeItem('companyId','')
      sessionStorage.removeItem('mobile','')
      this.$router.push({
        name: 'Login'
      })
    }
  }
}
</script>
