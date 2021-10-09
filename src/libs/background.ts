import 'babel-polyfill';
import { IsurlExait, getCurrentTabId, sendMessageToContentScript, getStoreKey, setStore } from './utils/index';
import { SystemType } from './../source/type/storeType';
const systemStorageInfoList = [
  {
    id: 'sys_01',
    title: '测试项目',
    urls: ['www.test.com', 'www.test1.com'],
    autoLogin: true,
    showUser: true,
    code: '1234',
    sort: 1,
    userList: [
      {
        note: '测试',
        id: 'NntBVSJKzWf',
        name: '测试',
        password: '123456',
        sort: 1,
      },
      {
        note: '测试2',
        id: 'NntBVSJKzsf',
        name: '测试2',
        password: '123456',
        sort: 2,
      },
    ],
  },
];
setStore({ systemList: systemStorageInfoList });
chrome.runtime.onMessage.addListener(async (data, sender, sendResponse) => {
  if (data.key === 'pageLoad') {
    const { systemList } = await getStoreKey<{ systemList: Array<SystemType> }>(['systemList']);
    systemList.forEach((system) => {
      if (IsurlExait(data.info.url, system.urls)) {
        setStore({ currectSystem: system });
      } else {
        setStore({ currectSystem: null });
      }
    });
    sendResponse();
  }
});
