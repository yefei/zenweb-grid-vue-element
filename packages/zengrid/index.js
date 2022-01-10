import ZenGridRender from './ZenGridRender.vue';

const fields = {};

const files = require.context('./fields', false, /\.vue$/);
files.keys().forEach(key => {
  const keyName = key.slice(2, -4);
  fields[keyName] = files(key).default;
});

const fieldRender = {
  functional: true,
  render(h, ctx) {
    let Field = fields[ctx.props.field.name || 'Input'];
    if (!Field) {
      Field = fields.Input;
      console.warn('未注册表单组件:', ctx.props.field.name);
    }
    let field = <Field {...ctx.data} />;
    if (ctx.props.error) {
      field = <div class="zen-filter-item-error">
        {field}
        <span class="zen-filter-item-error-message">{ctx.props.error}</span>
      </div>;
    }
    return <div class="zen-grid-filter-form-field">{field}</div>;
  }
};

/**
 * @param {import('vue')} Vue
 */
function install(Vue, opts = {}) {
  Object.assign(fields, opts.fields);
  Vue.component('zen-grid-filter-field', fieldRender);
  Vue.component('zen-grid-render', ZenGridRender);
}

export default {
  install,
};
