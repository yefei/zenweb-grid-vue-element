<template>
  <el-dropdown trigger="click" placement="bottom" :hide-on-click="false" @command="input">
    <span class="filter-item">
      <span>{{field.label}}</span>
      <b v-for="v of value" :key="v">{{field.choices.find(i => i.value == v).label}}</b>
      <i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="(c, index) of field.choices"
        :key="index"
        :command="c.value"
      ><i v-if="value && value.includes(c.value)" class="el-icon-check"></i>{{c.label}}</el-dropdown-item>
      <el-dropdown-item divided>取消</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  props: ['field', 'value'],
  methods: {
    input(value) {
      if (!value) {
        this.$emit('input', []);
        return;
      }
      const v = new Set(this.value);
      v.has(value) ? v.delete(value) : v.add(value);
      this.$emit('input', Array.from(v));
    }
  }
}
</script>
