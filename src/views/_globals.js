import Vue from 'vue'
import {getNameByUrlOrPath} from '../utils/StringUtils'

const requireComponent = require.context(
  // 组件模块目录
  '.',
  // 是否遍历子文件夹
  true,
  // Only include .vue files
  /\.vue$/
)

// 遍历匹配的文件
requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName);
  const componentName = getNameByUrlOrPath(fileName);
  // 注册为全局组件
  Vue.component(componentName, componentConfig.default || componentConfig)
})
