import Vue from 'vue'
import Router from 'vue-router'
import businessDetails from '@/components/pages/businessDetails'
import businessList from '@/components/pages/businessList'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/businessList'
    },
    {
      path: '/businessList/:status',
      name: 'businessList',
      component: businessList
    },
    {
      path:'/businessDetails/:merchant_id/:isPass',
      name:'/businessDetails',
      component:businessDetails
    }
  ]
})
