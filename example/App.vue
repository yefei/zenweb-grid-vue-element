<template>
  <div id="app">
    <h1>zenweb-grid-vue 自动表格演示</h1>
    <el-row :gutter="20" style="margin-bottom:10px">
      <el-col :span="16"><el-input v-model="url" placeholder="输入表格接口地址"></el-input></el-col>
      <el-col :span="8"><el-button type="primary" @click="getData">打开表格</el-button></el-col>
    </el-row>
    <zen-grid-render :data="data" @getData="getData" v-loading="loading">
      <template #filter-append>
        <el-button type="primary" size="mini">添加</el-button>
      </template>
      <template #table-column-append>
        <el-table-column label="操作">
          <template slot-scope="{row}">
            <el-link type="primary" @click="() => edit(row)">编辑</el-link>&nbsp;
            <el-link type="danger" @click="() => del(row)">删除</el-link>
          </template>
        </el-table-column>
      </template>
    </zen-grid-render>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      url: 'http://localhost:7003/app/android/version/list',
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
    edit(row) {
      this.$alert(`编辑数据：${row.id}`);
    },
    del(row) {
      this.$alert(`删除数据：${row.id}`);
    },
  }
}
</script>
