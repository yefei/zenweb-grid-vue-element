<template>
  <el-popover
    v-model="show"
    popper-class="zen-grid-filter-popover"
    placement="bottom"
    transition="el-zoom-in-top"
    trigger="click">
    <el-scrollbar
      tag="ul"
      wrap-class="el-select-dropdown__wrap"
      view-class="el-select-dropdown__list"
    >
      <li
        class="el-dropdown-menu__item"
        v-for="(c, index) of field.choices.filter(i => !i.parent)"
        :key="index"
        @click="!c.unselectable && input(c.value)"
        :class="{ checked: value == c.value }"
      >
        <cascader-popover
          v-if="field.choices.findIndex(i => i.parent === c.value) > -1"
          :choices="field.choices"
          :parent="c.value"
          :value="value"
          @input="input"
        >
          {{c.label}}
        </cascader-popover>
        <span v-else>{{c.label}}</span>
      </li>
    </el-scrollbar>
    <div class="zen-grid-filter-select-footer">
      <el-button size="mini" @click="input()">取消</el-button>
    </div>
    <span slot="reference" class="filter-item">
      <span>{{field.label}}</span>
      <b v-if="value !== undefined">{{field.choices.find(i => i.value == value).label}}</b>
      <i class="el-icon-arrow-down el-icon--right"></i>
    </span>
  </el-popover>
</template>

<script>
import CascaderPopover from '../components/CascaderPopover.vue';

export default {
  props: ['field', 'value'],
  components: {
    CascaderPopover,
  },
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
