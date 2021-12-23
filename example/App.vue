<template>
  <div id="app">
    <h1>zenweb-grid-vue 自动表格演示</h1>
    <el-row :gutter="20" style="margin-bottom:10px">
      <el-col :span="16"><el-input v-model="url" placeholder="输入表格接口地址"></el-input></el-col>
      <el-col :span="8"><el-button type="primary" @click="getData">打开表格</el-button></el-col>
    </el-row>
    <zen-grid-render :data="data" @getData="getData" v-loading="loading">
      <template #id="a">
        ID {{a}}
      </template>
    </zen-grid-render>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      url: 'http://localhost:7001/grid',
      data: null,
      loading: true,
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData(params) {
      this.loading = true;
      this.$api.get(this.url, { params }).then(r => {
        this.data = r;
      }, e => {
        this.$message.error('数据加载错误');
      }).finally(() => {
        this.loading = false;
      });
    },
  }
}
</script>
