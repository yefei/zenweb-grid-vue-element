<template>
  <el-dropdown trigger="click" @command="input">
    <span class="filter-item">
      <span>{{field.label}}</span>
      <b v-if="value !== undefined">{{field.choices.find(i => i.value == value).label}}</b>
      <i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="(c, index) of field.choices" :key="index" :command="c.value">{{c.label}}</el-dropdown-item>
      <el-dropdown-item divided>取消</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import basic from './basic';
export default basic();
</script>
