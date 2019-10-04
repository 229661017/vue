<template>
  <el-dropdown @command="changeTheme">
        <span class="">
          <svg-icon class="" icon-class="pifu" />
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
import IconSvg from './icons/IconSvg';
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

</style>
