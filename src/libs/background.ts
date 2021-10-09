import 'babel-polyfill';
import { IsurlExait, getCurrentTabId, sendMessageToContentScript, getStoreKey, setStore } from './utils/index';
import { SystemType } from './../source/type/storeType';
chrome.runtime.onMessage.addListener(async (data, sender, sendResponse) => {
  if (data.key === 'pageLoad') {
    const { systemList } = await getStoreKey<{ systemList: Array<SystemType> }>(['systemList']);
    let currectSystem = null;
    systemList.forEach((system) => {
      if (IsurlExait(data.info.url, system.urls)) {
        currectSystem = system;
      }
    });
    const currentTabId = await getCurrentTabId();
    setStore({ currectSystem: currectSystem });
    setStore({ currentTabId: currentTabId });
    sendResponse();
  }
});
