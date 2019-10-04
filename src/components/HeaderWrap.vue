<template>
  <el-row :gutter="10" class="top-header">
    <el-col class="top-header-left" :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
      <div style="width: fit-content;">
        <router-link to="/" class="title">
          <span>后台管理系统</span>
        </router-link>
      </div>
    </el-col>
    <el-col class="top-header-center" :xs="8" :sm="12" :md="16" :lg="18" :xl="22">
      <div>
        &nbsp;
      </div>
    </el-col>
    <el-col class="top-header-right" :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
      <!--皮肤-->
      <theme></theme>
      <el-dropdown trigger="click"  @command="handleCommand">
        <span class="el-dropdown-link">
          管理员<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout">
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
import theme from './Theme'
export default {
  components: {
    theme
  },
  name: 'TopHeader',
  methods: {
    handleCommand (command) {
      switch (command) {
        case 'logout' :
          this.logout();
          break;
      }
    },
    // 用户退出
    logout () {
      this.$store.commit('logout');
    }
  }
}
</script>

<style scoped>
  /* header 样式 */
  .top-header {
    height: 60px;
    line-height: 60px;
    margin:0px;
    /*border: 1px solid red;*/
  }
  /* 头部标题样式 */
  .top-header .title {
    display: inline-block;
    text-decoration: none;
    font-size: 22px;
    height: inherit;
    line-height: inherit;
  }
  .top-header .top-header-right {
    text-align: right;
    padding-right: 0px;
  }
  .el-popper[x-placement^="bottom"] {
    margin-top: 0px !important;
  }
</style>
