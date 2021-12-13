<template>
  <div>
    <el-table :data="data.data" @sort-change="sortChange" size="small" :highlight-current-row="true">
      <el-table-column
        v-for="col of data.columns"
        :key="col.prop"
        v-bind="col">
      </el-table-column>
    </el-table>
    <el-pagination
      class="zen-grid-pagination"
      :current-page="currentPage"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="data.total"
      :page-size="pageSize"
      @current-change="getData"
      @size-change="handleSizeChange"
      />
  </div>
</template>

<style>
.zen-grid-pagination {
  margin-top: 5px;
  text-align: right;
}
</style>

<script>
export default {
  name: 'zen-grid-render',
  props: ['data'],
  data() {
    return {
      pageSize: 10,
      currentPage: 1,
      sort: null,
    }
  },
  created() {
  },
  methods: {
    getData(page) {
      this.currentPage = page || 1;
      const params = {
        limit: this.pageSize,
        offset: (this.pageSize * (page - 1)) || 0,
        order: this.sort,
      }
      this.$emit('getData', params);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData();
    },
    sortChange({ prop, order }) {
      this.sort = order ? (order === 'descending' ? `-${prop}` : prop) : null;
      this.getData();
    },
  }
}
</script>
