<template>
  <span class="headerSearch">
    <i class="el-icon-search icon" @click="toggleSearchMode"></i>
    <el-autocomplete :value="value" :class="['autocomplete', {show: searchMode}]"
      ref="autocomplete" :fetch-suggestions="fetchSugesstions" :select-when-unmatched="true"
      v-bind="$attrs" @input="onSearchInput"
      @select="onSearchSelect"></el-autocomplete>
  </span>
</template>

<script>
import { Autocomplete } from 'element-ui'

export default {
  name: 'HeaderSearch',
  componentName: 'HeaderSearch',
  components: {
    [Autocomplete.name]: Autocomplete
  },
  props: {
    fetchSugesstions: Function
  },
  data () {
    return {
      searchMode: false,
      value: ''
    }
  },
  methods: {
    toggleSearchMode () {
      this.searchMode = !this.searchMode
      this.$nextTick(() => {
        if (this.searchMode) {
          const ref = this.$refs.autocomplete
          setTimeout(() => {
            ref.$refs.input.focus()
          }, 300)
        }
      })
    },
    onSearchSelect (item) {
      this.searchMode = true
      this.$emit('select', item.value)
    },
    onSearchInput (value) {
      this.value = value
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.headerSearch {
  .icon {
    cursor: pointer;
    font-size: 16px;
  }
  .autocomplete {
    transition: width 0.3s, margin-left 0.3s;
    width: 0;
    background: transparent;
    border-radius: 0;
    /deep/ .el-input {
      .el-input__inner {
        border: 0;
        background: transparent;
        color: #fff;
        border-radius: 0;
        padding-left: 0;
        padding-right: 0;
        box-shadow: none !important;
        border-bottom: 1px solid #d9d9d9;
      }
    }
    &.show {
      width: 210px;
      margin-left: 8px;
    }
  }
}
.el-autocomplete {
  .el-input {
    width: 0;
    padding: 0;
  }
}
</style>
