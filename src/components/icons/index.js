import Vue from 'vue'
import IconSvg from './IconSvg'

Vue.component('svg-icon', IconSvg)

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)
