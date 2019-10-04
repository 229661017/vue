<template>
  <!--左侧菜单栏-->
  <el-scrollbar class="left-scrollbar" style="height: 100%">
    <el-aside class="left-aside" width="auto">
      <el-menu
        default-active="$route.path"
        :class="aside.className"
        @open="handleOpen"
        @close="handleClose"
        :unique-opened="aside.isUniqueOpened"
        :collapse="aside.isCollapse"
        router
      >
        <!-- 一级菜单 -->
        <template v-for="(item,seq) in openMenu" >
          <!-- 判断有子菜单 -->
          <el-submenu v-if="item.child && item.child.length" :index="''+seq" :key="''+seq">
            <template slot="title"><i :class="item.css"></i><span>{{item.name}}</span></template>
            <!-- 二级菜单 -->
            <template v-for="(itemChild,seqChild) in item.child">
              <!-- 判断有子菜单 -->
              <el-submenu v-if="itemChild.child && itemChild.child.length" :index="''+seq+seqChild" :key="''+seq+seqChild">
                <template slot="title"><i :class="itemChild.css"></i><span>{{itemChild.name}}</span></template>
                <!-- 三级菜单 -->
                <el-menu-item v-for="itemChild_Child in itemChild.child" :index="itemChild_Child.href" :key="itemChild_Child.href">
                  <i :class="itemChild_Child.css"></i>
                  <span slot="title">{{itemChild_Child.name}}</span>
                </el-menu-item>
              </el-submenu>
              <!-- 判断无子菜单 -->
              <el-menu-item v-else :index="itemChild.href" :key="itemChild.href">
                <i :class="itemChild.css"></i><span slot="title">{{itemChild.name}}</span>
              </el-menu-item>
            </template>
          </el-submenu>
          <!-- 判断无子菜单 -->
          <el-menu-item v-else :index="item.href" :key="item.href">
            <i :class="item.css"></i>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-aside>
  </el-scrollbar>
</template>

<script>
export default {
  name: 'LeftAside',
  data: function () {
    return {
      // 左侧菜单
      aside: {
        className: 'left-sidebar',
        isCollapse: false, // 是否水平折叠收起菜单
        isUniqueOpened: false // 是否只保持一个子菜单的展开
      }
    }
  },
  methods: {
    toggleAsideCollapse () {
      this.aside.isCollapse = !this.aside.isCollapse;
    },
    handleOpen (key, keyPath) {},
    handleClose (key, keyPath) {}
  },
  computed: {
    openMenu () {
      return this.$store.state.menuArrays;
    }
  }
}
</script>

<style scoped>
  /* 左侧菜单栏 */
  .left-aside {
    text-align: left;
    height: 100%;
    width: 10px;
  }
  .left-aside .el-submenu i {
    margin-right: 10px;
  }
  .left-aside .el-menu-item i {
    margin-right: 10px;
  }
  /* 左侧底部横向滚动条隐藏*/
  .left-scrollbar >>> .el-scrollbar__wrap {
    overflow-x: hidden;
  }
</style>
