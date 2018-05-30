import GlobalHeader from './GlobalHeader'

/* istanbul ignore next */
GlobalHeader.install = function (Vue) {
  Vue.component(GlobalHeader.name, GlobalHeader)
}

export default GlobalHeader
