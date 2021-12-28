# ZenWeb Grid Render for VUE Element UI

只需要一行代码即可完成数据表格渲染，所有表格项都由服务端返回，减轻前端重复工作。

template
```html
<zen-grid-render :data="data" @getData="getData" v-loading="loading">
  <template #filter-prepend>
    过滤器左侧插槽
  </template>
  <template #filter-append>
    过滤器右侧插槽
  </template>
  <template #column-prepend>
    <el-table-column>表格左侧列</el-table-column>
  </template>
  <!-- 自定义某一列渲染 -->
  <template #column-by-id>
    <el-table-column label="#" prop="id" />
  </template>
  <template #column-append>
    <el-table-column label="操作">
      <template slot-scope="{row}">
        <el-link type="primary" @click="() => edit(row)">编辑</el-link>&nbsp;
        <el-link type="danger" @click="() => del(row)">删除</el-link>
      </template>
    </el-table-column>
  </template>
  <template #footer-prepend>
    分页左侧插槽
  </template>
  <template #filter-append>
    分页右侧插槽
  </template>
</zen-grid-render>
```

script
```js
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
```

<template #column-by-*="col"> 的内部默认实现代码
```html
<el-table-column
  :key="col.key"
  :prop="col.key"
  :label="col.label || col.key"
  :sortable="col.sortable"
  :width="col.width"
  :min-width="col.minWidth"
  :align="col.align"
/>
```
