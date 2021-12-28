export default function () {
  return {
    props: ['field', 'value', 'size'],
    methods: {
      input(value) {
        this.$emit('input', value);
      }
    }
  }
}