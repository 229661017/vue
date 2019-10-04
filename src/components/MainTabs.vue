<template>
  <el-tabs class="el-main-tabs"
           v-model="activeIndex"
           type="border-card"
           closable
           v-if="openTab.length"
           @tab-click='tabClick'
           @tab-remove='tabRemove'
  >
    <el-tab-pane
      :key="item.name"
      v-for="(item) in openTab"
      :name="item.route"
    >
      <span slot="label">
        <i v-if="item.css" :class="item.css"></i>
        {{item.title}}
      </span>
      <el-scrollbar>
        <router-view></router-view>
      </el-scrollbar>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: 'MainTabs',
  methods: {
    // tab标签点击时，切换相应的路由
    tabClick (tab) {
      this.$router.push({path: this.activeIndex});
    },
    // 移除tab标签
    tabRemove (targetName) {
      // 首页不删
      if (targetName === '/' | targetName === '/index') {
        return;
      }
      this.$store.commit('delete_tabs', targetName);
      if (this.activeIndex === targetName) {
        // 设置当前激活的路由
        if (this.openTab && this.openTab.length >= 1) {
          this.$store.commit('set_active_index', this.openTab[this.openTab.length - 1].route);
          this.$router.push({path: this.activeIndex});
        } else {
          this.$router.push({path: '/'});
        }
      }
    }
  },
  mounted () {
    // 刷新时以当前路由做为tab加入tabs
    // 当前路由不是首页时，添加首页以及另一页到store里，并设置激活状态
    // 当当前路由是首页时，添加首页到store，并设置激活状态
    this.$store.state.openTab = [];
    if (this.$route.path !== '/' && this.$route.path !== '/index') {
      // console.log('刷新时，当前页不是首页.....');
      this.$store.commit('add_tabs', { route: '/index', name: 'index' });
      this.$store.commit('add_tabs', { route: this.$route.path, name: this.$route.name });
      this.$store.commit('set_active_index', this.$route.path);
    } else {
      // console.log('刷新时，当前页为首页..........');
      this.$store.commit('add_tabs', {route: '/index', name: 'index', title: '首页'});
      this.$store.commit('set_active_index', '/index');
      this.$router.push('/');
    }
  },
  computed: {
    openTab () {
      return this.$store.state.openTab;
    },
    activeIndex: {
      get () {
        // console.log('activeIndex get:' + this.$store.state.activeIndex);
        return this.$store.state.activeIndex;
      },
      set (val) {
        // console.log('activeIndex set:' + val);
        this.$store.commit('set_active_index', val);
      }
    }
  },
  watch: {
    '$route' (to, from) {
      // 判断路由是否已经打开
      // 已经打开的 ，将其置为active
      // 未打开的，将其放入队列里
      let flag = false;
      for (let item of this.openTab) {
        // console.log('item.name', item.name)
        // console.log('to.name', to.name)
        if (item.name === to.name) {
          // console.log('to.path', to.path);
          this.$store.commit('set_active_index', to.path)
          flag = true;
          break;
        }
      }

      if (!flag) {
        // console.log(to);
        this.$store.commit('add_tabs', {route: to.path, name: to.name});
        this.$store.commit('set_active_index', to.path);
      }
    }
  }
}
</script>

<style scoped>
  .el-main-tabs {
    height: 100%;
  }
  .el-main-tabs >>> .el-tabs__header{
    height: 39px;
  }
  .el-main-tabs >>> .el-tabs__content{
    flex-grow: 1;
    padding: 0px 0px;
    height: calc( 100% - 39px - 2px );
  }
  .el-main-tabs .el-tabs__nav .el-tabs__item {
    border-radius: 10px;
    margin: 0px 5px;
  }
  .el-main-tabs .el-tab-pane {
    height: 100%;
  }
  .el-main-tabs .el-tab-pane .el-scrollbar {
    height: 100%;
  }
  .el-main-tabs .el-tab-pane >>> .el-scrollbar__wrap {
    overflow-x: hidden;
  }
</style>
