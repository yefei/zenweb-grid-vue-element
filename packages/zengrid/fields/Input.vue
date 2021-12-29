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
    style="width:200px;margin-right:10px;"
  />
</template>

<script>
import basic from './basic';
export default basic();
</script>
