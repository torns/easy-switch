/**
 * 兼容EasySwitch 导入
 */
export const compatibleImport = (config: any) => {
  const result = config.pageInfoList.map((x: any) => {
    const userList = config.userlist[x.key];
    const dealWithUserList = userList.map((val: any) => {
      return {
        id: val.id,
        name: val.name,
        note: val.auth,
        password: val.passWord,
        sort: val.sort,
      };
    });
    return {
      id: x.id,
      autoLogin: false,
      showUser: false,
      code: '1234',
      sort: x.sort ? x.sort : 99,
      urls: x.urls,
      title: x.title,
      userList: dealWithUserList,
    };
  });
  console.log(result);
  return result;
};
