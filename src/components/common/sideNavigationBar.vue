<template>
  <div>
    <el-menu :default-openeds="['1', '2']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>审核中心</template>
        <el-menu-item-group>
          <!--<template slot="title">审核中心</template>-->
          <el-menu-item index="1-1" @click="toBusinessList(0)">未审核</el-menu-item>
          <el-menu-item index="1-2" @click="toBusinessList(1)">已审核</el-menu-item>
        </el-menu-item-group>
        <!--<el-menu-item-group title="发布文章管理">-->
        <!--<el-menu-item index="1-3" @click="jumpToAddArticle">发布文章</el-menu-item>-->
        <!--<el-menu-item index="1-4" @click="jumpToAddCourse">发布课程</el-menu-item>-->
        <!--</el-menu-item-group>-->
        <!--<el-submenu index="1-4">-->
        <!--<template slot="title">发布文章</template>-->
        <!--<el-menu-item index="1-4-1">发布课程</el-menu-item>-->
        <!--</el-submenu>-->
      </el-submenu>
      <!--<el-submenu index="2">-->
      <!--<template slot="title"><i class="el-icon-menu"></i>新闻管理</template>-->
      <!--<el-menu-item-group>-->
      <!--<template slot="title">新闻管理</template>-->
      <!--<el-menu-item index="2-1" @click="jumpToNewsList">新闻列表</el-menu-item>-->
      <!--<el-menu-item index="2-2" @click="jumpToAddNews">发布新闻</el-menu-item>-->
      <!--</el-menu-item-group>-->
      <!--&lt;!&ndash;<el-menu-item-group title="分组2">&ndash;&gt;-->
      <!--&lt;!&ndash;<el-menu-item index="2-3">选项3</el-menu-item>&ndash;&gt;-->
      <!--&lt;!&ndash;</el-menu-item-group>&ndash;&gt;-->
      <!--&lt;!&ndash;<el-submenu index="2-4">&ndash;&gt;-->
      <!--&lt;!&ndash;<template slot="title">选项4</template>&ndash;&gt;-->
      <!--&lt;!&ndash;<el-menu-item index="2-4-1">选项4-1</el-menu-item>&ndash;&gt;-->
      <!--&lt;!&ndash;</el-submenu>&ndash;&gt;-->
      <!--</el-submenu>-->
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'SideNavigationBar',
    data() {
      return {
        status: 0,
      }
    },
    methods: {
      toBusinessList(status) {
        console.log(status)
        this.status = status
        this.$router.push(
          {
            path: '/businessList',
            name: 'businessList',
            params: {
              status: status
            }
          }
        )
      },
      toBusinessdetails(){
        this.$router.push(
          {
            path: '/businessDetails',
            name: 'businessDetails',

          }
        )
      }

    }
  }
</script>

<style scoped>

</style>
