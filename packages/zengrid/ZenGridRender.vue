<template>
  <div>
    <div v-if="haveFilter || $slots['filter-prepend'] || $slots['filter-append']" class="zen-grid-filter-header">
      <slot name="filter-prepend" />
      <div class="zen-grid-filter-form">
        <template v-if="haveFilter">
          <zen-grid-filter-field
            v-for="key of filter.layout"
            :key="key"
            :field="filter.fields[key]"
            :size="filterSize || 'small'"
            v-model="filters[key]"
            @input="handleFilter"
          />
        </template>
      </div>
      <slot name="filter-append" />
    </div>
    <el-table
      class="zen-grid-table"
      :data="list"
      v-on="$listeners"
      @sort-change="sortChange"
      :size="size"
      :header-cell-style="{background:'#FCFCFC',color:'#999999'}"
      :default-sort="defaultSort">
      <slot name="column-prepend" />
      <el-table-column v-if="!columns" />
      <template v-for="col of columns">
        <slot :name="`column-by-${col.key}`" v-bind:col="col">
          <el-table-column
            :key="col.key"
            :prop="col.key"
            :label="col.label || col.key"
            :sortable="col.sortable"
            :width="col.width"
            :min-width="col.minWidth"
            :align="col.align"
          />
        </slot>
      </template>
      <slot name="column-append" />
    </el-table>
    <div class="zen-grid-footer">
      <slot name="footer-prepend" />
      <el-pagination
        v-if="page"
        class="zen-grid-pagination"
        :current-page="currentPage"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
        :page-size="pageSize"
        @current-change="getData"
        @size-change="handleSizeChange"
      />
      <div v-else class="zen-grid-pagination" />
      <slot name="footer-append" />
    </div>
  </div>
</template>

<style>
.zen-grid-table .caret-wrapper {
  height: 22px;
}
.zen-grid-table .sort-caret.ascending {
  top:0;
}
.zen-grid-table .sort-caret.descending {
  bottom: 0;
}
.zen-grid-table {
  border-top: 1px solid #EBEEF5;
}
.zen-grid-loading {
  text-align: center;
  line-height: 300px;
}
.zen-grid-filter-header {
  margin-bottom: 12px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.zen-grid-filter-form {
  flex-grow: 1;
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
.zen-grid-footer {
  display: flex;
  margin-top: 12px;
  justify-content: space-between;
  align-items: center;
}
.zen-grid-pagination {
  flex-grow: 1;
  text-align: right;
}
.zen-grid-pagination .el-pagination {
  padding: 0;
}
</style>

<script>
let getDataDelay = 0;
let getDataTimer = 0;

// includes=filter,columns,page,data

export default {
  name: 'zen-grid-render',
  props: ['data', 'size', 'filterSize'],
  data() {
    return {
      pageSize: 10,
      currentPage: 1,
      sort: null,
      filters: {},
      filter: null,
      columns: null,
      page: null,
      list: [],
    }
  },
  watch: {
    data() {
      if (this.data.filter) this.filter = this.data.filter;
      if (this.data.columns) this.columns = this.data.columns;
      if (this.data.page) this.page = this.data.page;
      if (this.data.data) this.list = this.data.data;
    }
  },
  computed: {
    /**
     * 是否有过滤项
     */
    haveFilter() {
      return this.filter && this.filter.layout && this.filter.layout.length > 0;
    },
    defaultSort() {
      if (this.page && this.page.order) {
        const isDesc = this.page.order.startsWith('-');
        return { prop: isDesc ? this.page.order.slice(1) : this.page.order, order: isDesc ? 'descending' : 'ascending' };
      }
      return {};
    },
  },
  methods: {
    getData(page) {
      this.currentPage = page || 1;
      const includes = ['data', 'page'];
      if (!this.filter) includes.push('filter');
      if (!this.columns) includes.push('columns');
      const params = {
        limit: this.pageSize,
        offset: (this.pageSize * (page - 1)) || 0,
        order: this.sort,
        includes: includes.join(','),
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
