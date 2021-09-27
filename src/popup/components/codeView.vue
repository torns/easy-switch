<template>
  <json-viewer :value="code" copyable sort />
</template>
<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'CodeView',
  props: {
    code: {
      type: Object,
      required: true,
    },
  },
});
</script>
<style lang="less">
/deep/ .jv-container.boxed:hover {
  box-shadow: none;
}
</style>
