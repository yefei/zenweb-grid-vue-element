import ZenGridRender from './ZenGridRender.vue';

/**
 * @param {import('vue')} Vue
 */
function install(Vue, opts = {}) {
  Vue.component('zen-grid-render', ZenGridRender);
}

export default {
  install,
};
