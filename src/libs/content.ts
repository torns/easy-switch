import { InputHTMLAttributes } from '@vue/runtime-dom';
import { createWorker } from 'tesseract.js';
const autoInput = (user: any) => {
  let userInputEle = document.querySelector('input[placeholder*="用户名"]');
  let verifyCodeEle = document.querySelector('img[alt*="验证码"]');
  let code = '';
  if (!userInputEle) {
    userInputEle = document.querySelector('input[placeholder*="账户"]');
  }
  if (!verifyCodeEle) {
    verifyCodeEle = document.querySelector('.verify-code');
  }
  if (verifyCodeEle) {
    const worker = createWorker({
      logger: (m) => console.log(m),
    });
    (async () => {
      await worker.load();
      await worker.setParameters({
        tessedit_char_whitelist: '0123456789',
      });
      const {
        data: { text },
      } = await worker.recognize(verifyCodeEle as HTMLImageElement);
      console.log('验证码：' + text);
      code = text;
      await worker.terminate();
    })();
  }

  const passWordInputEle = document.querySelector('input[placeholder*="密码"]');
  const validateInputEle = document.querySelector('input[placeholder*="验证码"]');
  const loginEle = document.querySelector('.login-btn');
  if (userInputEle && passWordInputEle) {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('input', false, true);
    (userInputEle as InputHTMLAttributes).value = user.name;
    (passWordInputEle as InputHTMLAttributes).value = user.passWord;
    (validateInputEle as InputHTMLAttributes).value = code;
    userInputEle.dispatchEvent(event);
    passWordInputEle.dispatchEvent(event);
    // validateInputEle.dispatchEvent(event);
    // 无需验证码自动登录
    // const clickEvent = document.createEvent('HTMLEvents');
    // clickEvent.initEvent('click', false, true);
    // if (loginEle.fireEvent) {
    //   console.log(loginEle.fireEvent);
    //   loginEle.fireEvent('onclick');
    // } else {
    //   loginEle.dispatchEvent(clickEvent);
    // }
  } else {
    alert('不处于登录页面');
  }
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.key === 'clickUser') {
    autoInput(request.info);
    sendResponse();
  }
});

(function pageLoad() {
  chrome.runtime.sendMessage({
    key: 'pageLoad',
    info: {
      url: window.location.href,
    },
  });
})();
