// 获取当前选项卡ID
export const getCurrentTabId = () => {
  return new Promise((reslove, reject) => {
    try {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        reslove(tabs.length ? tabs[0].id : null);
      });
    } catch (error) {
      reject(error);
    }
  });
};
