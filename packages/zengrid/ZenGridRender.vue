<template>
  <div>
    <el-table :data="data.data">
      <el-table-column
        v-for="col of data.columns"
        :key="col.prop"
        :prop="col.prop"
        :width="col.width"
        :label="col.label">
      </el-table-column>
    </el-table>
    <el-pagination :current-page="currentPage" background layout="prev, pager, next" :total="data.total" :page-size="pageSize" @current-change="getList" />
  </div>
</template>

<script>
export default {
  name: 'zen-grid-render',
  props: ['data', 'pageSize'],
  data() {
    return {
      currentPage: 1,
    }
  },
  created() {
  },
  methods: {
    getList(page) {
      this.currentPage = page || 1;
      const params = {
        limit: this.pageSize,
        offset: (this.pageSize * (page - 1)) || 0,
      }
      this.$emit('getList', params);
    }
  }
}
</script>
