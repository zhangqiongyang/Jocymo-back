<template>
  <div>
    <div class="businessInfo">
      <h1 class="title">商家信息</h1>
      <div class="infoItem">
        <span class="itemLabel">商家LOGO：</span>
        <a v-if="merchantInfo.merchant_logo_url && merchantInfo.merchant_logo_url.constructor===Array" target="_blank" :href="merchantInfo.merchant_logo_url[0].pic_url">
          <img v-if="merchantInfo.merchant_logo_url && merchantInfo.merchant_logo_url.constructor===Array" class="businessImg" :src="merchantInfo.merchant_logo_url[0].pic_url" alt="">
        </a>
      </div>

      <div class="infoItem">
        <span class="itemLabel">商家名称：</span>
        {{merchantInfo.merchant_name}}
      </div>
      <div class="infoItem">
        <span class="itemLabel">商家主营：</span>
        {{merchantInfo.merchant_operation}}
      </div>
      <div class="infoItem">
        <span class="itemLabel">商家电话：</span>
        {{merchantInfo.merchant_mobile}}
      </div>
      <div class="infoItem">
        <span class="itemLabel">商家分类：</span>
        {{merchantInfo.merchant_classify_name}}
      </div>
      <div class="infoItem">
        <span class="itemLabel">商家地址：</span>
        {{merchantInfo.merchant_address}}
      </div>
      <div class="infoItem">
        <span class="itemLabel">商家介绍：</span>
        {{merchantInfo.merchant_introduce}}
      </div>

      <div class="infoItem">
        <span class="itemLabel">商家广告轮播图：</span>
        <div class="imgBoxBox">
          <div class="imgBox" v-for="item in merchantInfo.merchant_pic_url">
            <a target="_blank" :href="item.pic_url">
              <img class="businessImg" :src="item.pic_url"/>
            </a>
          </div>
        </div>

      </div>
      <div class="infoItem">
        <span class="itemLabel">商家资质：</span>
        <div class="imgBoxBox">
          <div class="imgBox" v-for="item in merchantInfo.merchant_aptiude_url">
            <a target="_blank" :href="item.pic_url">
              <img class="businessImg" :src="item.pic_url"/>
            </a>
          </div>
        </div>

      </div>
      <div v-if="isPass == 0" class="submitBtn" @click="submit(merchantInfo.merchant_id)">通过</div>
      <div v-else class="submitBtnNo">通过</div>

    </div>

    <!--<div :hidden="!isMasking" class="masking">-->
      <!--<img :src="merchantInfo.merchant_aptiude_url[0].pic_url" alt="">-->
    <!--</div>-->
  </div>

</template>

<script>
  import {getBussinessInfo, uploadAudit} from '../../api'

  export default {
    name: "businessDetails",
    data() {
      return {
        merchantInfo: '',
        // log_url:[],
        isPass: '',
        isMasking:false,
      }
    },
    created() {
      // 获取路由带来得参数
      this.getParams()
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
        let merchant_id = this.$route.params.merchant_id
        this.merchant_id = merchant_id
        this.isPass = this.$route.params.isPass
        console.log(this.isPass)
        // 查询商家信息
        this.getBussinessInfoRequest(merchant_id)
      },
      // 查询商家信息
      getBussinessInfoRequest(params) {
        getBussinessInfo({
          merchant_id: params ? params : this.merchant_id
        })
          .then(res => {
            console.log('--------------获取到商家信息了-----------')
            console.log(res)
            if (res.data.errorCode == 1 && res.status == 200) {
              this.merchantInfo = res.data.data
            }
          })
      },
      //通过审核
      submit(id) {
        console.log(id)
        // 提交审核接口
        this.uploadAuditRequest(id)
      },

      // 提交审核接口
      uploadAuditRequest(params) {
        uploadAudit({
          merchant_id: params ? params : this.merchant_id
        })
          .then(res => {
            console.log('-----------审核结果已上传------------')
            console.log(res)
            if (res.data.errorCode == 1 && res.status == 200) {
              console.log('-----------审核通过------------')
              this.open()
              this.$router.history.go(-1)
            }
          })
      },
      // 中间顶部的提示框
      open() {
        this.$message({
          message: '审核成功',
          type: 'success'
        })
      },
    }
  }
</script>

<style scoped>
  .businessInfo {
    width: 1200px;
    margin: 0 auto;
  }

  .title {
    text-align: center;
  }

  .infoItem {
    padding: 20px 0;
  }

  .itemLabel {
    width: 130px;
    display: inline-block;
  }

  .imgBoxBox {
    display: inline-block;
    width: 1060px;
  }

  .imgBox {
    display: inline-block;
    margin-left: 20px;
    margin-top: 20px;
  }

  .businessImg {
    width: 300px;
  }

  .submitBtn {
    width: 350px;
    height: 40px;
    background: #FF6901;
    border-radius: 8px;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    margin: 30px auto;
  }

  .submitBtnNo {
    width: 350px;
    height: 40px;
    background: #F6F6F6;
    border-radius: 8px;
    color: #999;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    margin: 30px auto;
  }

  .masking {
    width: 100%;
    height: 100%;
    margin: auto 0;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .masking img {
    transform: translate(-50%, -50%);
  }
</style>
