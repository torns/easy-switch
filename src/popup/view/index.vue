<template>
  <div class="easy-switch">
    <img @click="handleClick" class="setting" src="'./../../assets/set.png" alt="set" />
    <button @click="handleVerifyCode">验证码</button>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import { sendMessageToContentScript } from './../../libs/utils/index';
export default defineComponent({
  name: 'EasySwitch',
  setup() {
    const handleClick = () => {
      window.open(chrome.extension.getURL('/libs/views/options.html'));
    };
    const handleVerifyCode = () => {
      sendMessageToContentScript({
        key: 'clickUser',
        info: {
          name: 'yyy',
          password: 123456,
        },
      });
    };
    return {
      handleClick,
      handleVerifyCode,
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
