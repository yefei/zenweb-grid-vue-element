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
        v-for="(c, index) of field.choices"
        :key="index"
        @click="input(c.value)"
        :class="{ checked: value && value.includes(c.value) }"
      >{{c.label}}</li>
    </el-scrollbar>
    <div class="zen-grid-filter-select-footer">
      <el-button size="mini" type="primary" @click="ok()">确定</el-button>
      <el-button size="mini" @click="clear()">取消</el-button>
    </div>
    <span slot="reference" class="filter-item">
      <span>{{field.label}}</span>
      <b v-for="v of value" :key="v">{{field.choices.find(i => i.value == v).label}}</b>
      <i class="el-icon-arrow-down el-icon--right"></i>
    </span>
  </el-popover>
</template>

<script>
export default {
  props: ['field', 'value', 'size'],
  data() {
    return {
      show: false,
      selected: [],
    }
  },
  methods: {
    ok() {
      this.show = false;
    },
    clear() {
      this.show = false;
      this.$emit('input', []);
    },
    input(value) {
      const v = new Set(this.value);
      v.has(value) ? v.delete(value) : v.add(value);
      this.$emit('input', Array.from(v));
    },
  }
}
</script>
