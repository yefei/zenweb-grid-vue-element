<template>
  <div>
    <div v-if="data.filter.layout && data.filter.layout.length" class="zen-grid-filter-header">
      <zen-grid-filter-field
        v-for="key of data.filter.layout"
        :key="key"
        :field="data.filter.fields[key]"
        v-model="filters[key]"
        @input="handleFilter"
      />
    </div>
    <el-table
      ref="grid"
      :data="data.data"
      @sort-change="sortChange"
      size="small"
      :default-sort="defaultSort"
      :highlight-current-row="true">
      <el-table-column
        v-for="col of data.columns"
        :key="col.key"
        :prop="col.key"
        :label="col.label || col.key"
        :sortable="col.sortable"
        >
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
.zen-grid-filter-header {
  padding: 7px 5px;
  background: #f4f4f5;
  font-size: 14px;
}
.zen-grid-filter-header .filter-item {
  cursor: pointer;
  padding: 3px 5px;
  border-radius: 2px;
  margin-right: 10px;
}
.zen-grid-filter-header .filter-item:hover {
  background-color: rgba(0,0,0,.1);
}
.zen-grid-filter-header .filter-item * {
  color: rgba(32,45,64,.6);
}
.zen-grid-filter-header .filter-item b {
  margin-left: 5px;
  color: #333;
}
.zen-grid-pagination {
  margin-top: 5px;
  text-align: right;
}
</style>

<script>
// v-bind="col"

let getDataDelay = 0;
let getDataTimer = 0;

export default {
  name: 'zen-grid-render',
  props: ['data'],
  data() {
    return {
      pageSize: 10,
      currentPage: 1,
      sort: null,
      filters: {},
    }
  },
  computed: {
    defaultSort() {
      if (this.data.order) {
        const isDesc = this.data.order.startsWith('-');
        return { prop: isDesc ? this.data.order.slice(1) : this.data.order, order: isDesc ? 'descending' : 'ascending' };
      }
      return null;
    },
  },
  methods: {
    getData(page) {
      this.currentPage = page || 1;
      const params = {
        limit: this.pageSize,
        offset: (this.pageSize * (page - 1)) || 0,
        order: this.sort,
        ...this.filters,
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
    handleFilter() {
      let la = Date.now() - getDataDelay;
      // 延迟获取，防止获取频率过高
      if (la > 500) {
        getDataDelay = Date.now();
        this.getData();
      } else {
        clearTimeout(getDataTimer);
        getDataTimer = setTimeout(() => this.handleFilter(), la);
      }
    },
  }
}
</script>
