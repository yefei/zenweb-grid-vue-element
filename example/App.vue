<template>
  <div id="app">
    <h1>zenweb-grid-vue 自动表格演示</h1>
    <el-row :gutter="20" style="margin-bottom:10px">
      <el-col :span="16"><el-input v-model="url" placeholder="输入表格接口地址"></el-input></el-col>
      <el-col :span="8">
        <el-button type="primary" @click="getData">打开表格</el-button>
        <el-button type="success" @click="refreshData">刷新表格</el-button>
      </el-col>
    </el-row>
    <zen-grid-render ref="grid" :data="data" @getData="getData" v-loading="loading">
      <template #filter-append>
        <el-button size="small" type="primary">添加</el-button>
      </template>
      <template #column-append>
        <el-table-column label="操作" width="90">
          <template slot-scope="{row}">
            <el-link type="primary" @click="() => edit(row)">编辑</el-link>&nbsp;
            <el-link type="danger" @click="() => del(row)">删除</el-link>
          </template>
        </el-table-column>
      </template>
      <template #footer-prepend>测试</template>
      <template #footer-append>测试</template>
    </zen-grid-render>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      url: 'http://127.0.0.1:7001/company/list/grid',
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
        console.log(e)
        this.$message.error('数据加载错误');
      }).finally(() => {
        this.loading = false;
      });
    },
    refreshData() {
      // 刷新演示, 保持当前表格筛选和分页状态，并重新载入数据
      this.$refs.grid.getData();
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
