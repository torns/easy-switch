export const formItem = [
  {
    label: '名称',
    type: 'input',
    key: 'title',
    placeholder: '请输入名称',
    belong: 'system',
  },
  {
    label: 'urls',
    key: 'urls',
    type: 'input',
    placeholder: '多个用英文逗号分隔',
    belong: 'system',
  },
  {
    label: '自动登录',
    key: 'autoLogin',
    type: 'switch',
    placeholder: '',
    belong: 'system',
  },
  {
    label: '验证码',
    key: 'code',
    type: 'input',
    placeholder: '请输入验证码',
    belong: 'system',
  },
  {
    label: '排序',
    key: 'sort',
    type: 'number',
    placeholder: '',
    belong: 'system',
  },
  {
    label: '用户名',
    key: 'name',
    type: 'input',
    placeholder: '请输入用户名',
    belong: 'user',
  },
  {
    label: '密码',
    key: 'password',
    type: 'password',
    placeholder: '请输入密码',
    belong: 'user',
  },
  {
    label: '备注',
    key: 'note',
    type: 'input',
    placeholder: '给账号加个备注',
    belong: 'user',
  },
  {
    label: '排序',
    key: 'sort',
    type: 'number',
    placeholder: '',
    belong: 'user',
  },
];
export const systemFormRules = {
  title: [
    {
      required: true,
      message: '平台名称必填',
      trigger: 'blur',
    },
  ],
  urls: {
    required: true,
    message: '平台地址必填',
    trigger: 'blur',
  },
  name: {
    required: true,
    message: '用户名必填',
    trigger: 'blur',
  },
  password: {
    required: true,
    message: '用户密码必填',
    trigger: 'blur',
  },
  sort: [
    {
      type: 'number',
      message: '仅输入数字',
      trigger: 'blur',
    },
  ],
};
