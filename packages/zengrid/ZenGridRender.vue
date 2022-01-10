<template>
  <div>
    <div v-if="haveFilter || $slots['filter-prepend'] || $slots['filter-append']" class="zen-grid-filter-header">
      <slot name="filter-prepend" />
      <div class="zen-grid-filter-form">
        <template v-if="haveFilter">
          <zen-grid-filter-field
            v-for="key of filterForm.layout"
            :key="key"
            :field="filterForm.fields[key]"
            :size="filterSize || 'small'"
            :error="filterErrors && filterErrors[key]"
            v-model="filterData[key]"
            @input="handleFilter"
          />
        </template>
      </div>
      <slot name="filter-append" />
    </div>
    <el-table
      v-if="columns"
      class="zen-grid-table"
      :data="list"
      v-on="$listeners"
      @sort-change="sortChange"
      :size="size"
      :header-cell-style="{background:'#FCFCFC',color:'#999999'}"
      :default-sort="defaultSort">
      <slot name="column-prepend" />
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
    <div v-else class="zen-grid-table-loading">正在载入表格</div>
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
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
}
.zen-grid-filter-form-field {
  margin-right: 20px;
}
.zen-grid-table-loading {
  text-align: center;
  padding: 30px 0;
  border-top: 1px solid #EBEEF5;
  border-bottom: 1px solid #EBEEF5;
  color: #999;
  font-size: 14px;
}
.zen-grid-filter-header .filter-item {
  display: block;
  cursor: pointer;
  padding: 3px 5px;
  border-radius: 2px;
  user-select: none;
  white-space: nowrap;
}
.zen-grid-filter-popover {
  padding: 0;
}
.zen-grid-filter-select-footer {
  padding: 5px;
  border-top: 1px solid #EBEEF5;
  display: flex;
}
.zen-grid-filter-select-footer > * {
  flex-grow: 1;
}
.zen-grid-filter-select-footer .el-button+.el-button {
  margin-left: 5px;
}
.el-dropdown-menu__item.checked {
  font-weight: bold;
  color: #409EFF;
}
.zen-grid-filter-header .filter-item:hover {
  background-color: rgba(0,0,0,.04);
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
.zen-filter-item-error {
  border-radius: 5px;
  background-color: #fef0f0;
  display: flex;
  flex-direction: column;
}
.zen-filter-item-error-message {
  display: block;
  color: #f56c6c;
  font-size: 12px;
  padding: 0 5px;
  padding-bottom: 3px;
}
</style>

<script>
let getDataDelay = 0;
let getDataTimer = 0;

export default {
  name: 'zen-grid-render',
  props: ['data', 'size', 'filterSize'],
  data() {
    return {
      currentPage: 1,
      sort: null,
      filterData: {},
      filterForm: null,
      filterErrors: null,
      columns: null,
      page: null,
      list: [],
    }
  },
  watch: {
    data() {
      this.filterData = this.data.filterData;
      this.filterErrors = this.data.filterErrors;
      if (this.data.filterForm) this.filterForm = this.data.filterForm;
      if (this.data.columns) this.columns = this.data.columns;
      if (this.data.page) {
        this.page = this.data.page;
        this.currentPage = Math.floor(this.data.page.offset / this.data.page.limit) + 1;
      }
      if (this.data.data) this.list = this.data.data;
    }
  },
  computed: {
    /**
     * 是否有过滤项
     */
    haveFilter() {
      return this.filterForm && this.filterForm.layout.length > 0;
    },
    defaultSort() {
      if (this.page && this.page.order) {
        const isDesc = this.page.order.startsWith('-');
        return { prop: isDesc ? this.page.order.slice(1) : this.page.order, order: isDesc ? 'descending' : 'ascending' };
      }
      return {};
    },
    pageSize() {
      return this.page ? this.page.limit : 10;
    }
  },
  methods: {
    getData(currentPage) {
      if (currentPage) this.currentPage = currentPage;
      const includes = ['data', 'page'];
      if (!this.filterForm) includes.push('filter');
      if (!this.columns) includes.push('columns');
      const params = {
        limit: this.pageSize,
        offset: (this.pageSize * (this.currentPage - 1)) || 0,
        order: this.sort,
        includes: includes.join(','),
        ...this.filterData,
      }
      this.$emit('getData', params);
    },
    handleSizeChange(val) {
      this.page.limit = val;
      this.getData(1);
    },
    sortChange({ prop, order }) {
      this.sort = order ? (order === 'descending' ? `-${prop}` : prop) : null;
      this.getData(1);
    },
    handleFilter() {
      let la = Date.now() - getDataDelay;
      // 延迟获取，防止获取频率过高
      if (la > 500) {
        getDataDelay = Date.now();
        this.getData(1);
      } else {
        clearTimeout(getDataTimer);
        getDataTimer = setTimeout(() => this.handleFilter(), la);
      }
    },
  }
}
</script>
