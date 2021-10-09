<template>
  <div class="easy-switch">
    <div class="system-header">
      <div class="system-left"></div>
      <div class="system-title">{{ isDev ? '无匹配平台' : system.title }}</div>
      <img @click="handleClick" class="system-right" src="'./../../assets/set.png" alt="set" />
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane v-if="!isDev" label="用户库" name="user">
        <div class="user-list">
          <div @click="handleClickUser(user)" class="system-user" v-for="user in system.userList" :key="user.id">
            <span>{{ user.name }}</span>
            <span class="user-auth">{{ user.note }}</span>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="平台库" name="system">
        <div class="user-list">
          <div @click="handleClickSystem(system)" class="system-user" v-for="system in systemList" :key="system.id">
            <span>{{ system.title }}</span>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { SystemType, UserType } from './../type/storeType';
import { sendMessageToContentScript, getStoreKey, getCurrentTabId, setStore } from './../../libs/utils/index';
export default defineComponent({
  name: 'EasySwitch',
  setup() {
    let system = ref({} as SystemType);
    let systemList = ref([] as SystemType[]);
    let isDev = ref(false);
    const activeName = ref('user');
    const handleClick = () => {
      window.open(chrome.extension.getURL('/libs/views/option.html'));
    };
    //初始化
    const init = async () => {
      let timer = setInterval(async () => {
        const localCurrentTabId = await getCurrentTabId();
        const { currectSystem, currentTabId } = await getStoreKey<{ currectSystem: SystemType; currentTabId: number }>([
          'currectSystem',
          'currentTabId',
        ]);
        if (currectSystem === null) {
          const store = await getStoreKey<{ systemList: Array<SystemType> }>(['systemList']);
          systemList.value = store.systemList;
          clearInterval(timer);
          renderDev();
          return;
        }
        if (currectSystem) {
          const store = await getStoreKey<{ systemList: Array<SystemType> }>(['systemList']);
          systemList.value = store.systemList;
          if (currentTabId === localCurrentTabId) {
            renderUser(currectSystem);
          } else {
            renderDev();
          }
          clearInterval(timer);
        }
      }, 100);
    };
    init();
    // 渲染平台
    const renderDev = async () => {
      isDev.value = true;
      activeName.value = 'system';
    };
    // 渲染用户
    const renderUser = (store: SystemType) => {
      isDev.value = false;
      activeName.value = 'user';
      system.value = store;
    };
    // 点击用户
    const handleClickUser = (user: UserType) => {
      sendMessageToContentScript({
        key: 'clickUser',
        info: {
          user,
          autoLogin: system.value.autoLogin,
          code: system.value.code ? system.value.code : 8888,
        },
      });
    };
    // 点击平台
    const handleClickSystem = (loaclSystem: SystemType) => {
      isDev.value = false;
      activeName.value = 'user';
      system.value = loaclSystem;
    };
    return {
      handleClick,
      system,
      systemList,
      isDev,
      activeName,
      handleClickSystem,
      handleClickUser,
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
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .system-user {
    height: 35px;
    line-height: 35px;
    background-color: #f4f4f4;
    box-shadow: 0 0 3px #ccc;
    font-size: 14px;
    padding: 2px 8px;
    cursor: pointer;
    color: #333;
    margin: 5px;
  }
  .user-auth {
    font-size: 12px;
    color: #dd6161;
  }
  .system-user:hover {
    background-color: rgb(108, 169, 226);
    color: #fff;
  }
}
</style>
