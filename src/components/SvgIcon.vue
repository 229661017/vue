<template>
  <svg :class="iconClassName" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
// import {addClass, removeClass} from '../utils/CssClass'
export default {
  name: 'icon-svg',
  props: {
    iconId: {
      type: String,
      required: true
    },
    iconClass: {
      type: String,
      required: false
    }
  },
  computed: {
    iconName () {
      return `#icon-${this.iconId}`
    },
    iconClassName () {
      if (this.iconClass) {
        return `svg-icon ${this.iconClass}`;
      }
      return 'svg-icon';
    }
  }
}
</script>

<style scoped lang="stylus">
  .svg-icon {
    width 1.5em
    height 1.5em
    vertical-align middle
    fill currentColor
    overflow hidden
  }
</style>
