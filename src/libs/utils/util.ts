export const IsurlExait = (url: string, keys: Array<string>) => {
  let isExist = false;
  keys.forEach((val) => {
    if (url.indexOf(val) >= 0) {
      isExist = true;
    }
  });
  return isExist;
};

// 生成随机码
export const createRandomCode = (len = 6) => {
  const charset = `0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`;
  const maxLen = charset.length;
  let ret = '';
  for (let i = 0; i < len; i++) {
    const randomIndex = Math.floor(Math.random() * maxLen);
    ret += charset[randomIndex];
  }
  return ret;
};

// 生成下载文件
export const loadFile = (fileName: string, content: string) => {
  let aLink = document.createElement('a');
  let blob = new Blob([content], {
    type: 'text/plain',
  });
  aLink.download = fileName;
  aLink.href = URL.createObjectURL(blob);
  aLink.click();
  URL.revokeObjectURL(blob.toString());
};

export const createTips = function (message: string, type = 'success') {
  const tips = document.createElement('div');
  tips.className = `globl-tips ${type}`;
  tips.innerText = message;
  document.body.appendChild(tips);
  setTimeout(() => {
    document.body.removeChild(tips);
  }, 3000);
};
