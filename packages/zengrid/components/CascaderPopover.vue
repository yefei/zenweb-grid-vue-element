<template>
  <el-popover
    v-model="show"
    popper-class="zen-grid-filter-popover"
    placement="right-start"
    transition="none"
    trigger="hover">
    <el-scrollbar
      tag="ul"
      wrap-class="el-select-dropdown__wrap"
      view-class="el-select-dropdown__list"
    >
      <li
        class="el-dropdown-menu__item"
        v-for="(c, index) of choices.filter(i => i.parent == parent)"
        :key="index"
        @click="!c.unselectable && input(c.value)"
        :class="{ checked: value == c.value }"
      >
        <cascader-popover
          v-if="choices.findIndex(i => i.parent === c.value) > -1"
          :choices="choices"
          :parent="c.value"
          :value="value"
          @input="input"
        >
          {{c.label}}
        </cascader-popover>
        <span v-else>{{c.label}}</span>
      </li>
    </el-scrollbar>
    <div class="item" slot="reference">
      <span><slot></slot></span>
      <i class="el-icon-arrow-right el-icon--right"></i>
    </div>
  </el-popover>
</template>

<style scoped>
.item {
  display: flex;
  align-items: center;
}
.item > span {
  flex-grow: 1;
}
</style>

<script>
export default {
  props: ['choices', 'value', 'parent'],
  data() {
    return {
      show: false,
    }
  },
  methods: {
    input(value) {
      this.show = false;
      this.$emit('input', value);
    },
  }
}
</script>
