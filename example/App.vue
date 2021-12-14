<template>
  <div id="app">
    <h1>zenweb-grid-vue 自动表格演示</h1>
    <el-row :gutter="20">
      <el-col :span="16"><el-input v-model="url" placeholder="输入表格接口地址"></el-input></el-col>
      <el-col :span="8"><el-button type="primary" @click="open">打开表格</el-button></el-col>
    </el-row>

    <div style="margin-top:30px">
      只需要一行代码即可完成表格渲染，所有表格项都由服务端返回，减轻前端重复工作。
      <div class="code">
        &lt;zen-grid-api url="{{url}}" /&gt;
      </div>
    </div>

    <zen-grid-api v-if="url" :url="url" />
  </div>
</template>

<style>
.code {
  border-radius: 5px;
  margin: 20px 0;
  font-family: monospace;
}
</style>

<script>
import ZenGridApi from './ZenGridApi.vue';

export default {
  name: 'App',
  components: {
    ZenGridApi,
  },
  data() {
    return {
      url: 'http://localhost:7001/grid',
    }
  },
  methods: {
    open() {}
  }
}
</script>
