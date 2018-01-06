import Vue from 'vue'
import Router from 'vue-router'
import Notice from '@/pages/notice'
import NoticeEdit from '@/pages/notice-edit'
import Accident from '@/pages/accident'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Notice
    }, {
      path: '/notice',
      name: 'Notice',
      component: Notice
    }, {
      path: '/notice-edit',
      name: 'NoticeEdit',
      component: NoticeEdit
    }, {
      path: '/accident',
      name: 'Accident',
      component: Accident
    }
  ]
})
