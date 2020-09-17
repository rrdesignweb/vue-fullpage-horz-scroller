import VueFullPageHorzScroller from './src/components/VueFullPageHorzScroller.vue'

// Export components
const Components = {
  VueFullPageHorzScroller
}

const VueFullPageHorzScrollerPlugin = {
  install (Vue) {
    Object.keys(Components).forEach((name) => {
      Vue.component(name, Components[name])
    })
  }
}

// Export as a plugin
export default VueFullPageHorzScrollerPlugin

// Export as individual components
export {
  VueFullPageHorzScroller
}
