<template>
  <div class="easy-switch">
    <img @click="handleClick" class="setting" src="'./../../assets/set.png" alt="set" />
  </div>
</template>
<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'EasySwitch',
  setup() {
    const handleClick = () => {
      window.open(chrome.extension.getURL('/libs//views/options.html'));
    };
    return {
      handleClick,
    };
  },
});
</script>
<style lang="less" scoped>
.easy-switch {
  position: relative;
  width: 600px;
  .setting {
    position: absolute;
    right: 15px;
    top: 15px;
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
}
</style>
