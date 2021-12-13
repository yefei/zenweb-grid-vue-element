<template>
  <div v-loading="loading">
    <zen-grid-render v-if="data" :data="data" @getData="getData" />
    <div v-else class="loading">正在载入数据</div>
  </div>
</template>

<style>
.loading {
  text-align: center;
  line-height: 300px;
}
</style>

<script>
export default {
  name: 'zen-grid-api',
  props: ['url'],
  data() {
    return {
      loading: true,
      data: null,
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
        this.loading = false;
      }, e => {
        this.$message.error('数据加载错误');
      });
    },
  }
}
</script>
