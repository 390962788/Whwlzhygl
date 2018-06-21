export default {
  mounted() {
    let key = sessionStorage.getItem('token')
    if (key == null || key == '') {
      this.$router.push({
        name: 'Login'
      })
      return false
    }
  }
}