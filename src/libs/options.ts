import { createRandomCode, createTips, loadFile } from './utils/index';
import { InputHTMLAttributes } from '@vue/runtime-dom';
let storage = {
  pageInfoList: [],
  userlist: {},
};
let userlist: {
  [key: string]: any;
  auth: string;
  id: string;
  name: string;
  passWord: string;
  sort: number;
}; // 用户列表
let pageInfoList: {
  id: string;
  key: string;
  title: string;
  urls: string[];
}[] = []; //平台列表
window.onload = () => {};

const systemContentEle = document.querySelector('.option-content');
const createSystemOption = function () {
  let options = ``;
  if (pageInfoList.length === 0) {
    options = `<div class="system-option">
      <div class="option-title"><span>平台信息</span><span key='sys_add' class='operate-btn'>添加</span></div></div>`;
  }
  pageInfoList.forEach((sys) => {
    let urlTemplate = '';
    sys.urls.forEach((x) => {
      urlTemplate += `<span class='url-item'>${x}</span>`;
    });

    let template = `<div class="system-option">
            <div class="option-title"><span>平台信息</span><span key='sys_add' class='operate-btn'>添加</span></div>
            <div class="system-info system-users-head">
            <div class="system-title">名称</div>
            <div class="system-url">平台url</div>
            <div class="system-key">storageKey</div>
            <div class="operate-con">
              操作
            </div>
         </div>
            <div class="system-info">
              <div class="system-title">${sys.title}</div>
              <div class="system-url">${urlTemplate}</div>
              <div class="system-key">${sys.key}</div>
              <div class="operate-con">
                <div key='sys_editor_key' sys_editor_key='${sys.id}' class='operate-btn'>编辑</div>
                <div key='sys_delete' delete_key='${sys.key}' class='operate-btn operate-btn-error'>删除</div>
              </div>
           </div>`;
    let userTemplate = `<div class="system-users system-users-head">
      <div class="users-id">ID</div>
      <div class="users-name">账号</div>
      <div class="user-password">密码</div>
      <div class="user-auth">备注</div>
      <div class="user-sort">排序</div>
      <div class="operate-con">
       操作
      </div>
    </div>`;
    if (userlist[sys.key] && userlist[sys.key].length > 0) {
      userlist[sys.key]
        .sort((a: any, b: any) => a.sort - b.sort)
        .forEach((user: any) => {
          userTemplate += `<div class="system-users">
              <div class="users-id">${user.id}</div>
              <div class="users-name">${user.name}</div>
              <div class="user-password">******</div>
              <div class="user-auth">${user.auth}</div>
              <div class="user-sort">${user.sort}</div>
              <div class="operate-con">
                <div key='user_editor_key' push_key='${sys.key}' user_editor_key='${user.id}' class='operate-btn'>编辑</div>
                <div key='user_delete' delete_key='${sys.key}' delete_id='${user.id}' class='operate-btn operate-btn-error'>删除</div>
              </div>
            </div>`;
        });
    }
    template += `<div class="option-title-user">用户库<span key='user_add' push_key='${sys.key}' class='operate-btn'>添加</span></div>`;
    template = template + userTemplate + `</div>`;
    options += template;
  });
  console.log(options);
  return options;
};
let editorEle: HTMLElement | undefined = undefined;
chrome.storage.local.get(storage, function (val) {
  userlist = val.userlist;
  pageInfoList = val.pageInfoList;
  console.log(val);
  const eleOptions = createSystemOption();
  console.log(systemContentEle);
  if (systemContentEle) {
    systemContentEle.innerHTML = eleOptions;
  }
});
const sysEditorConfig = [
  {
    inputName: 'sys_name',
    name: '平台名称',
    placeholder: '请输入名称',
    type: 'text',
  },
  {
    inputName: 'sys_url',
    name: '平台url',
    placeholder: '多个地址用英文逗号隔开',
    type: 'text',
  },
  {
    inputName: 'sys_key',
    name: 'key',
    placeholder: '用作storageKey',
    type: 'text',
  },
];
const userEditorConfig = [
  {
    inputName: 'user_name',
    name: '用户名',
    placeholder: '请输入用户名',
    type: 'text',
  },
  {
    inputName: 'user_password',
    name: '密码',
    placeholder: '请输入密码',
    type: 'text',
  },
  {
    inputName: 'user_auth',
    name: '备注',
    placeholder: '请输入',
    type: 'text',
  },
  {
    inputName: 'user_sort',
    name: '排序',
    placeholder: '默认99',
    type: 'number',
  },
];
/**
 *
 * @param {String} type 编辑器类型user sys
 * @param {Object} info 编辑信息 默认为空
 * @param {String} push_key userlist标识
 */
const createEditor = function (type: string, info: { [key: string]: any }, push_key?: string) {
  const config = type === 'sys' ? sysEditorConfig : userEditorConfig;
  const parent = document.body;
  if (editorEle) parent.removeChild(editorEle);
  editorEle = document.createElement('div');
  editorEle.className = 'editor';
  let editorContent = '';
  config.forEach((x) => {
    const value = info[x.inputName] || '';
    editorContent += `<div class="editor-item">
                        <div class="editor-title">${x.name}：</div>
                        <div class="editor-input">
                          <input type='${x.type}' id='${x.inputName}' value='${value}' placeholder='${x.placeholder}'  class="editor-input-text"/>
                        </div>
                        </div>`;
  });
  editorContent += `<div class="editor-btn">
                      <div key='editor_sure' editor_type='${type}' editor_id='${info.id}' push_key='${push_key}' class="operate-btn">确认</div>
                      <div key='editor_cancel' editor_type='${type}' class="operate-btn operate-btn-info">取消</div>
                      </div>`;
  editorEle.innerHTML = editorContent;
  parent.appendChild(editorEle);
};
if (systemContentEle) {
  systemContentEle.addEventListener('click', (e: Event) => {
    if (editorEle) return;
    if (!e.target) return;
    let keyCode = (e.target as HTMLElement).getAttribute('key');
    if (!keyCode) return;
    if (keyCode === 'sys_add') {
      createEditor('sys', {});
    }
    if (keyCode === 'user_add') {
      let push_key = (e.target as HTMLElement).getAttribute('push_key');
      createEditor('user', {}, push_key as string);
    }
    if (keyCode === 'user_delete') {
      let delete_id = (e.target as HTMLElement).getAttribute('delete_id');
      let delete_key = (e.target as HTMLElement).getAttribute('delete_key');
      for (let i = 0; i < userlist[delete_key as string].length; i++) {
        if (userlist[delete_key as string][i].id == delete_id) {
          userlist[delete_key as string].splice(i, 1);
          const eleOptions = createSystemOption();
          (systemContentEle as HTMLElement).innerHTML = eleOptions;
          chrome.storage.local.set({ userlist: userlist });
        }
      }
    }
    if (keyCode === 'user_editor_key') {
      let editor_key = (e.target as HTMLElement).getAttribute('user_editor_key');
      let push_key = (e.target as HTMLElement).getAttribute('push_key');
      if (!push_key) return;
      let info = {};
      userlist[push_key].forEach((x: any) => {
        if (x.id == editor_key) {
          info = {
            id: x.id,
            user_name: x.name,
            user_password: x.passWord,
            user_auth: x.auth,
            user_sort: x.sort,
          };
        }
      });
      createEditor('user', info, push_key);
    }
    if (keyCode === 'sys_delete') {
      let delete_key = (e.target as HTMLElement).getAttribute('delete_key');
      for (let i = 0; i < pageInfoList.length; i++) {
        if (pageInfoList[i].key === delete_key) {
          pageInfoList.splice(i, 1);
          userlist[delete_key] = [];
          const eleOptions = createSystemOption();
          (systemContentEle as HTMLElement).innerHTML = eleOptions;
          chrome.storage.local.set({ pageInfoList: pageInfoList });
          chrome.storage.local.set({ userlist: userlist });
        }
      }
    }
    if (keyCode === 'sys_editor_key') {
      let editor_key = (e.target as HTMLElement).getAttribute('sys_editor_key');
      let info = {};
      pageInfoList.forEach((x) => {
        if (x.id == editor_key) {
          info = {
            id: x.id,
            sys_name: x.title,
            sys_url: x.urls,
            sys_key: x.key,
          };
        }
      });
      createEditor('sys', info);
    }
  });
}

document.addEventListener('click', (e) => {
  let keyCode = (e.target as HTMLElement).getAttribute('key');
  if (keyCode === 'editor_cancel') {
    if (editorEle) {
      document.body.removeChild(editorEle);
      editorEle = undefined;
    }
  }
  if (keyCode === 'editor_sure') {
    let editorType = (e.target as HTMLElement).getAttribute('editor_type');
    let editor_id = (e.target as HTMLElement).getAttribute('editor_id');
    let push_key = (e.target as HTMLElement).getAttribute('push_key');
    if (editorType === 'sys') {
      const sys_name_value = (document.querySelector('#sys_name') as InputHTMLAttributes)?.value;
      const sys_url_value = (document.querySelector('#sys_url') as InputHTMLAttributes)?.value;
      const sys_key_value = (document.querySelector('#sys_key') as InputHTMLAttributes)?.value;
      if (!sys_name_value || !sys_url_value || !sys_key_value) {
        createTips('平台名称，平台url，平台key不能为空！', 'error');
        return;
      }
      if (editor_id && editor_id !== 'undefined') {
        pageInfoList.forEach((val) => {
          if (val.id == editor_id) {
            val.title = sys_name_value;
            val.key = sys_key_value;
            val.urls = sys_url_value.split(',');
          }
        });
      } else {
        const exit = pageInfoList.find((x) => {
          return x.key === sys_key_value;
        });
        if (exit) {
          createTips('平台key已经存在', 'error');
          (document.querySelector('#sys_key') as InputHTMLAttributes).value = '';
          return;
        }
        pageInfoList.unshift({
          id: createRandomCode(11),
          title: sys_name_value,
          key: sys_key_value,
          urls: sys_url_value.split(','),
        });
      }
      const eleOptions = createSystemOption();
      (systemContentEle as HTMLElement).innerHTML = eleOptions;
      chrome.storage.local.set({ pageInfoList: pageInfoList });
      (document.querySelector('#sys_name') as InputHTMLAttributes).value = '';
      (document.querySelector('#sys_url') as InputHTMLAttributes).value = '';
      (document.querySelector('#sys_key') as InputHTMLAttributes).value = '';
      if (editorEle) {
        document.body.removeChild(editorEle);
        editorEle = undefined;
      }
    }
    if (editorType === 'user') {
      const user_name_value = (document.querySelector('#user_name') as InputHTMLAttributes).value;
      const user_auth_value = (document.querySelector('#user_auth') as InputHTMLAttributes).value;
      const user_sort_value = (document.querySelector('#user_sort') as InputHTMLAttributes).value;
      const user_password_value = (document.querySelector('#user_password') as InputHTMLAttributes).value;
      if (!user_name_value || !user_password_value) {
        createTips('账户，密码不能为空！', 'error');
        return;
      }
      if (!push_key) return;
      if (editor_id && editor_id !== 'undefined') {
        userlist[push_key].forEach((val: any) => {
          if (val.id == editor_id) {
            val.name = user_name_value;
            val.passWord = user_password_value;
            val.auth = user_auth_value || '-';
            val.sort = Number(user_sort_value) || 99;
          }
        });
      } else {
        if (!userlist[push_key]) {
          userlist[push_key] = [];
        }
        userlist[push_key].unshift({
          id: createRandomCode(11),
          name: user_name_value,
          passWord: user_password_value,
          auth: user_auth_value || '-',
          sort: Number(user_sort_value) || 99,
        });
      }
      const eleOptions = createSystemOption();
      (systemContentEle as HTMLElement).innerHTML = eleOptions;
      chrome.storage.local.set({ userlist: userlist });
      if (editorEle) {
        document.body.removeChild(editorEle);
        editorEle = undefined;
      }
    }
  }
});

const importFileEle = document.querySelector('.importFile');
const exportEle = document.querySelector('.export');
if (importFileEle) {
  importFileEle.addEventListener('change', (e: Event) => {
    if (!e.target) return;
    const file = (e.target as any).files[0];
    (e.target as InputHTMLAttributes).value = '';
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function (data: any) {
      let config;
      try {
        config = JSON.parse(data.target.result as string);
      } catch (error) {
        createTips('请使用本插件导出配置文件', 'error');
        return;
      }

      if (!config.key || config.key !== 'EasySwitch') {
        createTips('请使用本插件导出配置文件', 'error');
        return;
      }
      if (config.userlist) {
        userlist = config.userlist;
        chrome.storage.local.set({ userlist: config.userlist });
      }
      if (config.pageInfoList) {
        pageInfoList = config.pageInfoList;
        chrome.storage.local.set({ pageInfoList: config.pageInfoList });
      }
      const eleOptions = createSystemOption();
      (systemContentEle as HTMLElement).innerHTML = eleOptions;
      createTips('导入成功');
    };
  });
}
if (exportEle) {
  exportEle.addEventListener('click', () => {
    chrome.storage.local.get(storage, function (val) {
      const data = {
        key: 'EasySwitch',
        version: '1.0.1',
        userlist: val.userlist,
        pageInfoList: val.pageInfoList,
      };
      loadFile('config.json', JSON.stringify(data));
    });
  });
}
