<template>
  <div id="app">
    <el-container>
      <el-aside width="200px">
        <v-side></v-side>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import vSide from './components/common/sideNavigationBar'
  export default {
    name: 'App',
    components: {
      vSide
    }
  }
</script>

<style>

</style>
