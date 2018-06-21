import moment from 'moment'
export default {
  methods: {
    timeformat(row, col, val) {
      if(val != null && val != ''){
        return moment(val).format('YYYY-MM-DD')
      } else {
        return '';
      }
    }
  }
}