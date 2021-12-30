<template>
  <span class="filter-item" @click="select">
    <el-date-picker
      ref="date"
      type="daterange"
      value-format="yyyy-MM-dd"
      style="width:0;position:relative;opacity:0;padding:0;overflow:hidden;border:0"
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
              picker.$emit('pick', [new Date(), new Date()]);
            }
          },
          {
            text: '昨日',
            onClick(picker) {
              const d = new Date();
              d.setTime(d.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', [d, d]);
            }
          },
          {
            text: '最近7天',
            onClick(picker) {
              const d = new Date();
              d.setTime(d.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [d, new Date()]);
            }
          },
          {
            text: '最近30天',
            onClick(picker) {
              const d = new Date();
              d.setTime(d.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [d, new Date()]);
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
    <span v-if="text"><b>{{text}}</b></span>
    <span v-else-if="value">
      <b>{{value[0]}}</b><span v-if="value[0] !== value[1]">至<b style="margin-left:0">{{value[1]}}</b></span>
    </span>
    <i class="el-icon-arrow-down el-icon--right"></i>
  </span>
</template>
<style>
.a {
  overflow: hidden;
}
</style>

<script>
import { formatDate } from 'element-ui/src/utils/date-util.js';

export default {
  props: ['field', 'value', 'size'],
  computed: {
    text() {
      if (this.value) {
        if (this.value[0] === this.value[1]) {
          const d = new Date();
          if (this.value[0] === formatDate(d)) {
            return '今日';
          }
          d.setTime(d.getTime() - 3600 * 1000 * 24);
          if (this.value[0] === formatDate(d)) {
            return '昨日';
          }
        }
        const d = new Date();
        if (this.value[1] === formatDate(d)) {
          const days = Math.floor((d.getTime() - new Date(this.value[0]).getTime()) / (3600 * 1000 * 24));
          if (days) {
            return `最近${days}天`;
          }
        }
      }
      return '';
    }
  },
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
