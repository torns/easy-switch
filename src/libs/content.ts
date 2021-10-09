import { InputHTMLAttributes } from '@vue/runtime-dom';
import { UserType } from '../source/type/storeType';
const autoInput = (userInfo: { user: UserType; autoLogin: boolean; code: number }) => {
  let userInputEle = document.querySelector('input[placeholder*="用户"]');
  if (!userInputEle) {
    userInputEle = document.querySelector('input[placeholder*="账户"]');
  }
  const passWordInputEle = document.querySelector('input[placeholder*="密码"]');
  const validateInputEle = document.querySelector('input[placeholder*="验证码"]');
  const loginEle = document.querySelector('.login-btn');
  if (userInputEle && passWordInputEle) {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('input', false, true);
    (userInputEle as InputHTMLAttributes).value = userInfo.user.name;
    (passWordInputEle as InputHTMLAttributes).value = userInfo.user.password;
    userInputEle.dispatchEvent(event);
    passWordInputEle.dispatchEvent(event);
    if (userInfo.autoLogin && validateInputEle && loginEle) {
      (validateInputEle as InputHTMLAttributes).value = userInfo.code;
      validateInputEle.dispatchEvent(event);
      const clickEvent = document.createEvent('HTMLEvents');
      clickEvent.initEvent('click', false, true);
      loginEle.dispatchEvent(clickEvent);
    }
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
