<template>
  <el-dropdown trigger="click" @command="changeTheme">
    <span class="" style="">
      <svg-icon icon-class="svgIcon" icon-id="skin" />
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="science-blue">
        深空蓝
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import '../assets/theme/blue/css/skin.css'
import {addClass, removeClass} from '../utils/CssClass'
import IconSvg from './SvgIcon';
export default {
  name: 'Theme',
  components: {IconSvg},
  data: function () {
    return {
      defaultTheme: 'science-blue',
      currentTheme: ''
    }
  },
  created: function () {
    if (this.defaultTheme) {
      this.changeTheme(this.defaultTheme);
    }
  },
  methods: {
    changeTheme (command) {
      if (command === this.currentTheme) {
        return;
      }
      removeClass(document.body, this.currentTheme);
      this.currentTheme = command;
      addClass(document.body, this.currentTheme);
      console.log('chang theme to ' + command);
    },
    selectTheme (index) {
      console.log(index);
    }
  }
}
</script>

<style scoped>
.svgIcon {
    font-size: 18px;
    margin: 0px 15px;
    display: inline-block;
}
.el-popper[x-placement^="bottom"] {
    margin-top: 0px !important;
}
</style>
