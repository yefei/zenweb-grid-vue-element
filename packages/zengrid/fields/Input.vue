<template>
  <el-input
    :value="value"
    @input="input"
    :maxlength="field.validate && field.validate.maxLength"
    :minlength="field.validate && field.validate.minLength"
    :show-word-limit="field.validate && field.validate.maxLength > 0"
    :placeholder="field.placeholder || field.label"
    clearable
    :size="size"
    suffix-icon="el-icon-search"
    style="width:200px;"
  />
</template>

<script>
import basic from './basic';
export default basic();
</script>
