<template>
  <div class="easy-switch">
    <div class="system-header">
      <div class="system-left"></div>
      <div class="system-title">暂无</div>
      <img @click="handleClick" class="system-right" src="'./../../assets/set.png" alt="set" />
    </div>
    <div class="menu-title">用户库</div>
    <div class="user-list">
      <el-button size="mini" plain>Plain</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, render } from 'vue';
import { UserType, SystemType } from './../type/storeType';
import { sendMessageToContentScript, getStoreKey } from './../../libs/utils/index';
export default defineComponent({
  name: 'EasySwitch',
  setup() {
    let userList = ref([] as UserType[]);
    let systemList = ref([] as SystemType[]);
    let systemInfo = undefined;
    const autoLogin = ref(true);
    const handleClick = () => {
      window.open(chrome.extension.getURL('/libs/views/option.html'));
    };

    const init = async () => {
      const store = await getStoreKey<{
        userList: Array<UserType>;
        systemList: Array<SystemType>;
      }>(['userList', 'systemList']);
      userList.value = store.userList;
      systemList.value = store.systemList;
      console.log(store);
      let timer = setInterval(async () => {
        const { currectSystem } = await getStoreKey<{ currectSystem: SystemType }>(['currectSystem']);
        console.log(currectSystem);
        if (currectSystem === null) {
          clearInterval(timer);
          return;
        }
        if (currectSystem) {
          systemInfo = currectSystem;
          renderUser(systemList.value);
          return;
        }
        renderDev(userList.value);
      }, 100);
    };
    init();
    const renderDev = (store: any) => {
      console.log(store);
    };
    const renderUser = (store: any) => {
      console.log(store);
    };
    return {
      handleClick,
      autoLogin,
    };
  },
});
</script>
<style lang="less" scoped>
.easy-switch {
  padding: 5px 10px;
  width: 300px;
  .system-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .system-right {
      width: 16px;
      height: 16px;
      cursor: pointer;
    }
    .system-title {
      text-align: center;
      font-size: 18px;
    }
  }
  .menu-title {
    font-weight: 600;
    font-size: 16px;
  }
  .user-list {
    margin-top: 10px;
  }
}
</style>
