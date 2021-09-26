import { IsurlExait, getCurrentTabId, sendMessageToContentScript } from './utils/index';
const userStoragelist = {
  test_sys: [
    {
      auth: '测试',
      id: 'NntBVSJKzWf',
      name: '测试',
      passWord: '123456',
    },
  ],
};
const pageStorageInfoList = [
  {
    id: 'sys_01',
    key: 'test_sys',
    title: '测试项目',
    urls: ['www.test.com'],
  },
];
let userlist: {
  [key: string]: any;
} = {};
let pageInfoList = [];
let pageInfo = new Map();
let isDev: undefined | boolean = undefined;
let storage = {
  pageInfoList: [],
  userlist: {},
};
chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
  if (data.key === 'pageLoad') {
    let page: any;
    if (IsurlExait(data.info.url, ['localhost'])) {
      isDev = true;
    } else {
      isDev = false;
    }
    chrome.storage.local.get(storage, function (val) {
      if (Object.keys(val.userlist).length === 0) {
        chrome.storage.local.set({ userlist: userStoragelist });
        userlist = userStoragelist;
      } else {
        userlist = val.userlist;
      }
      if (val.pageInfoList.length === 0) {
        chrome.storage.local.set({ pageInfoList: pageStorageInfoList });
        pageInfoList = pageStorageInfoList;
      } else {
        pageInfoList = val.pageInfoList;
      }
      pageInfoList.forEach((item: any) => {
        if (IsurlExait(data.info.url, item.urls)) {
          page = item;
        }
      });
      if (page) {
        let storage = {
          [page.key]: userlist[page.key],
        };
        chrome.storage.local.set(storage);
        getCurrentTabId().then((id) => {
          page.id = id;
          pageInfo.set(id, page);
        });
      }
    });
  }
});
function getPageInfo() {
  return new Promise((reslove, reject) => {
    try {
      chrome.storage.local.get(storage, async function (val) {
        userlist = val.userlist;
        pageInfoList = val.pageInfoList;
        let tabId = await getCurrentTabId();
        const page = pageInfo.get(tabId);
        if (page) {
          reslove({
            isDev: isDev,
            page,
            pageInfoList: val.pageInfoList,
            userlist: val.userlist[page.key],
          });
        } else {
          reslove({
            isDev: isDev,
            pageInfoList: val.pageInfoList,
            userlist: [],
            page: null,
          });
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}
chrome.contextMenus.create({
  title: '登录',
  onclick: async function () {
    let tabId = await getCurrentTabId();
    sendMessageToContentScript({
      key: 'clickUser',
      info: userlist[pageInfo.get(tabId).key][0],
    });
  },
});
