<template>
  <div class="listBox">
    <h1 class="title">审核中心</h1>
    <!--<div class="navBox">-->
    <!--<div :class="status==0?'navItem_active':'navItem'" @click="changeNav(0)">未审核</div>-->
    <!--<div :class="status==1?'navItem_active':'navItem'" @click="changeNav(1)">已通过</div>-->
    <!--</div>-->
    <div :hidden="status==0" class="merchantList">
      <div class="merchantItem" v-for="item in merchantList_reviewed" @click="toBussinessDetails(item.merchant_id,1)">
        <p>{{item.merchant_name}}</p>
      </div>
    </div>
    <div :hidden="status==1" class="merchantList">
      <div class="merchantItem" v-for="item in merchantList_unreviewed" @click="toBussinessDetails(item.merchant_id,0)">
        <p>{{item.merchant_name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {getAllBussiness} from '../../api'

  export default {
    name: "businessList",
    data() {
      return {
        status: 0,// 0为未审核 1为已审核
        merchantList_unreviewed: '',
        merchantList_reviewed: ''
      }
    },
    created() {
      // 获取路由带来得参数
      this.getParams()
      // 查询商家信息
      this.getAllBussinessRequest(0)
    },
    watch: {
      // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      // '$route': 'getParams'
      '$route'() {
        this.getParams()
      }
    },
    methods: {
      // 获取路由带来得参数
      getParams() {
        // 取到路由带过来的参数
        console.log(this.$route.params)
        let status = this.$route.params.status
        this.status = status
        // 查询商家信息
        this.getAllBussinessRequest(status)


      },
      // 切换审核类型
      changeNav(params) {
        console.log(params)
        this.status = params
        // 查询商家信息
        this.getAllBussinessRequest(params)
      },

      //跳转到商家详情
      toBussinessDetails(id,isPass) {
        console.log(id,isPass)
        this.$router.push({
          path: '/businessDetails',
          name: '/businessDetails',
          params: {
            merchant_id: id,
            isPass:isPass
          }
        })
      },

      // 查询商家信息
      getAllBussinessRequest(params) {
        getAllBussiness({status: params ? params : this.status})
          .then(res => {
            console.log('-------获取到商家信息了-------')
            console.log(res)
            if (res.data.errorCode == 1 && res.status == 200) {
              if (this.status == 0) {
                this.merchantList_unreviewed = res.data.data
              } else {
                this.merchantList_reviewed = res.data.data
              }
            }
          })
      }
    }
  }
</script>

<style scoped>
  .title {
    text-align: center;
  }

  .listBox {
    width: 1200px;
    margin: 0 auto;
  }

  .navBox {
    display: flex;
    flex-direction: row;

  }

  .navItem {
    flex: 1;
    display: flex;
    justify-content: center;
    height: 50px;
    align-items: center;
  }

  .navItem_active {
    flex: 1;
    display: flex;
    justify-content: center;
    height: 50px;
    align-items: center;
    border-bottom: 2px solid dodgerblue;
  }
</style>
