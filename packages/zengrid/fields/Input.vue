<template>
  <el-input
    v-model="localValue"
    :maxlength="field.validate && field.validate.maxLength"
    :minlength="field.validate && field.validate.minLength"
    :show-word-limit="field.validate && field.validate.maxLength > 0"
    :placeholder="field.placeholder || field.label"
    clearable
    :size="size"
    @change="input"
    suffix-icon="el-icon-search"
    style="width:200px;"
  />
</template>

<script>
export default {
  props: ['field', 'value', 'size'],
  data() {
    return {
      localValue: '',
    }
  },
  watch: {
    value() {
      this.localValue = this.value;
    }
  },
  methods: {
    input() {
      this.$emit('input', this.localValue);
    }
  }
}
</script>
