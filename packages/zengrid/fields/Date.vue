<template>
  <span class="filter-item" @click="select">
    <el-date-picker
      ref="date"
      class="date-select"
      type="date"
      value-format="yyyy-MM-dd"
      style="width:0;position:relative;opacity:0"
      :size="size"
      :value="value"
      @input="input"
      :editable="false"
      :clearable="false"
      :prefix-icon="null"
      :picker-options="{
        shortcuts: [
          {
            text: '今日',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          },
          {
            text: '昨日',
            onClick(picker) {
              const d = new Date();
              d.setTime(d.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', d);
            }
          },
          {
            text: '取消选择',
            onClick(picker) {
              picker.$emit('pick', null);
            }
          },
        ]
      }"
    />
    <span>{{field.label}}</span>
    <b v-if="value !== undefined">{{value}}</b>
    <i class="el-icon-arrow-down el-icon--right"></i>
  </span>
</template>

<script>
export default {
  props: ['field', 'value', 'size'],
  methods: {
    input(value) {
      this.$emit('input', value);
    },
    select() {
      this.$refs.date.focus();
    }
  }
}
</script>
