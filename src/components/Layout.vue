<template>
  <el-container>
    <!--顶部头-->
    <el-header>
      <header-wrap></header-wrap>
    </el-header>

    <el-container>
      <!--左侧侧边栏-->
      <left-aside></left-aside>
      <!--右侧主模块-->
      <el-container>
        <el-main>
          <!--主区域-顶部tabs-->
          <main-tabs></main-tabs>
        </el-main>
        <!--底部版权栏-->
        <el-footer>
          <footer-wrap></footer-wrap>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import headerWrap from './HeaderWrap'
import leftAside from './LeftAside' // 左侧菜单栏
import mainTabs from './MainTabs' // 主内容区域顶部tabs
import footerWrap from './FooterWrap'
export default {
  components: {
    headerWrap,
    mainTabs,
    leftAside,
    footerWrap
  },
  data: function () {
    return {
    }
  },
  methods: {
  },
  computed: {
  },
  mounted () {
  }

}

</script>
<style scoped>
  /* 外层容器高度 */
  .el-container {
    height: 100%;
  }
  /* 主要内容区域 */
  .el-main {
    height: 100%;
    padding: 0px;
    overflow-y: hidden;
  }
  /* footer 样式 */
  .el-footer {
    padding: 0px;
    height: 30px !important;
  }
</style>
