<template>
  <div class="option">
    <div class="option-header">
      <el-button type="primary" @click="createOrEditor('add', 'system', null, null)" size="mini">添加平台</el-button>
      <el-button type="primary" size="mini">导入</el-button>
      <el-button type="primary" size="mini">导出</el-button>
    </div>
    <div class="option-content">
      <div class="option-content-title">
        <span class="option-content-text">平台信息 </span>
        <el-alert closable title="自动登录存在验证码时，会随机填充或启用配置" type="warning" show-icon> </el-alert>
      </div>
      <div v-if="systemList.length > 0" class="option-content-table">
        <div class="table-header">
          <div class="table-column w15">名称</div>
          <div class="table-column w20">平台url</div>
          <div class="table-column w15">自动登录</div>
          <div class="table-column w15">显示用户库</div>
          <div class="table-column w35">操作</div>
        </div>
        <div v-for="system in systemList" :key="system" class="table-content">
          <div class="table-content-system">
            <div class="table-column w15">{{ system.title }}</div>
            <div class="table-column w20">
              <a class="system-url" v-for="url in system.urls" :key="url" :href="url">{{ url }}</a>
            </div>
            <div class="table-column w15">
              <el-switch v-model="system.autoLogin" active-color="#13ce66" />
            </div>
            <div class="table-column w15">
              <el-switch v-model="system.showUser" active-color="#13ce66" />
            </div>
            <div class="table-column w35">
              <el-button plain type="primary" @click="createOrEditor('add', 'user', system, null)" size="mini">添加用户</el-button>
              <el-button plain type="primary" @click="createOrEditor('edit', 'system', system, null)" size="mini">编辑</el-button>
              <el-button plain type="danger" @click="deleteSystem(system)" size="mini">删除</el-button>
              <el-button plain type="warning" size="mini">导入</el-button>
              <el-button plain type="warning" size="mini">导出</el-button>
            </div>
          </div>
          <div v-if="system.showUser && system.userList.length > 0" class="table-content-user">
            <div class="table-content-user-header">
              <div class="table-column w20">账号</div>
              <div class="table-column w20">密码</div>
              <div class="table-column w20">备注</div>
              <div class="table-column w20">排序</div>
              <div class="table-column w20">操作</div>
            </div>
            <div v-for="user in system.userList" :key="user" class="table-content-user-content">
              <div class="table-column w20">{{ user.name }}</div>
              <div class="table-column w20">******</div>
              <div class="table-column w20">{{ user.note }}</div>
              <div class="table-column w20">{{ user.sort }}</div>
              <div class="table-column w20">
                <el-button plain type="primary" @click="createOrEditor('edit', 'user', system, user)" size="mini">编辑</el-button>
                <el-button plain type="danger" @click="deleteUser(system, user)" size="mini">删除</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-drawer v-model="drawer" :before-close="resetForm" :title="drawerTitle" direction="rtl">
      <el-form size="mini" label-width="80px" ref="editorFormRef" :model="editorForm" :rules="systemFormRules">
        <el-form-item v-for="form in renderForm" :key="form.key" :label="form.label" :prop="form.key">
          <el-input v-if="form.type === 'input'" v-model="editorForm[form.key]"></el-input>
          <el-input-number v-if="form.type === 'number'" :min="0" :max="999" v-model="editorForm[form.key]" />
          <el-input style="height: 28px" v-if="form.type === 'password'" show-password v-model="editorForm[form.key]"></el-input>
          <el-switch v-if="form.type === 'switch'" style="height: 28px" v-model="editorForm[form.key]" active-color="#13ce66" />
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="submitForm()">保存</el-button>
          <el-button size="mini" @click="resetForm()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, ComputedRef, Ref } from 'vue';
import { getStoreKey, setStore, createRandomCode } from './../../libs/utils/index';
import { formItem, systemFormRules } from '../libs/formConfig';
import { SystemType, UserType } from './../type/storeType';
import { ElMessage, ElMessageBox } from 'element-plus';
export default defineComponent({
  name: 'Option',
  setup() {
    const systemList = ref<Array<SystemType>>([]);
    const init = async () => {
      const store = await getStoreKey<{ systemList: Array<SystemType> }>(['systemList']);
      systemList.value = store.systemList;
    };
    init();
    const drawer = ref(false);
    const drawerTitle = ref('');
    const editorFormRef = ref<null | ComputedRef>(null);
    const initEditorSystemFormData = () => {
      return {
        id: undefined,
        title: undefined,
        urls: undefined,
        sort: 0,
        code: undefined,
        autoLogin: false,
      };
    };
    const initinitEditorUserFormData = () => {
      return {
        belongId: undefined,
        id: undefined,
        name: undefined,
        password: undefined,
        note: undefined,
        sort: 0,
      };
    };
    let editorForm: Ref<any> = ref(undefined);
    const renderForm = ref<any>([]);
    const localInputType = ref<string | undefined>(undefined);
    const localFormType = ref<string | undefined>(undefined);
    // 编辑，添加
    const createOrEditor = (formType: string, inputType: string, systemInfo: SystemType, userInfo: UserType) => {
      localInputType.value = inputType;
      localFormType.value = formType;
      if (formType === 'add' && inputType === 'user') {
        renderForm.value = formItem.filter((x) => x.belong === 'user');
        editorForm.value = initinitEditorUserFormData();
        if (systemInfo) editorForm.value.belongId = systemInfo.id;
        drawerTitle.value = '添加用户';
      }
      if (formType === 'edit' && inputType === 'user') {
        renderForm.value = formItem.filter((x) => x.belong === 'user');
        editorForm.value = initinitEditorUserFormData();
        if (systemInfo) editorForm.value.belongId = systemInfo.id;
        if (userInfo) {
          editorForm.value.id = userInfo.id;
          editorForm.value.name = userInfo.name;
          editorForm.value.password = userInfo.password;
          editorForm.value.note = userInfo.note;
          editorForm.value.sort = Number(userInfo.sort);
        }
        drawerTitle.value = '编辑用户';
      }
      if (formType === 'add' && inputType === 'system') {
        renderForm.value = formItem.filter((x) => x.belong === 'system');
        editorForm.value = initEditorSystemFormData();
        drawerTitle.value = '添加平台';
      }
      if (formType === 'edit' && inputType === 'system') {
        renderForm.value = formItem.filter((x) => x.belong === 'system');
        editorForm.value = initEditorSystemFormData();
        if (systemInfo) {
          editorForm.value.id = systemInfo.id;
          editorForm.value.title = systemInfo.title;
          editorForm.value.urls = systemInfo.urls.join(',');
          editorForm.value.autoLogin = systemInfo.autoLogin;
          editorForm.value.code = systemInfo.code;
          editorForm.value.sort = Number(systemInfo.sort);
        }
        drawerTitle.value = '编辑平台';
      }
      drawer.value = true;
    };
    // 创建平台
    const handleCreateSystem = (rst: boolean, systemList: Array<SystemType>) => {
      if (rst) {
        ElMessage({
          message: '该平台已经存在',
          type: 'error',
        });
      } else {
        systemList.push({
          id: createRandomCode(16),
          title: editorForm.value.title,
          urls: editorForm.value.urls.split(','),
          autoLogin: editorForm.value.autoLogin,
          code: editorForm.value.code,
          sort: 99,
          showUser: true,
          userList: [],
        });
        setStore({
          systemList: systemList,
        }).then(() => {
          ElMessage({
            message: '保存成功',
            type: 'success',
          });
          drawer.value = false;
          init();
        });
      }
    };
    // 编辑平台
    const handleEditorSystem = (rst: boolean, systemList: Array<SystemType>) => {
      if (!rst) {
        ElMessage({
          message: '编辑平台不存在',
          type: 'error',
        });
      } else {
        systemList.forEach((val: SystemType) => {
          if (val.id === editorForm.value.id) {
            val.title = editorForm.value.title;
            val.urls = editorForm.value.urls.split(',');
            val.autoLogin = editorForm.value.autoLogin;
            val.code = editorForm.value.code;
          }
        });
        setStore({ systemList: systemList }).then(() => {
          ElMessage({
            message: '保存成功',
            type: 'success',
          });
          drawer.value = false;
          init();
        });
      }
    };
    // 创建用户
    const handleCreateUser = (rst: boolean, systemList: Array<SystemType>) => {
      if (rst) {
        ElMessage({
          message: '该用户已经存在',
          type: 'error',
        });
      } else {
        systemList.forEach((system) => {
          if (system.id === editorForm.value.belongId) {
            system.userList.push({
              id: createRandomCode(16),
              name: editorForm.value.name,
              password: editorForm.value.password,
              sort: editorForm.value.sort,
              note: editorForm.value.note,
            });
          }
        });
        setStore({
          systemList: systemList,
        }).then(() => {
          ElMessage({
            message: '保存成功',
            type: 'success',
          });
          drawer.value = false;
          init();
        });
      }
    };
    // 编辑用户
    const handleEditorUser = (rst: boolean, systemList: Array<SystemType>) => {
      if (!rst) {
        ElMessage({
          message: '该用户不存在',
          type: 'error',
        });
      } else {
        systemList.forEach((system) => {
          if (system.id === editorForm.value.belongId) {
            system.userList.forEach((user) => {
              if (user.id === editorForm.value.id) {
                {
                  user.name = editorForm.value.name;
                  user.password = editorForm.value.password;
                  user.sort = Number(editorForm.value.sort);
                  user.note = editorForm.value.note;
                }
              }
            });
          }
        });
        setStore({
          systemList: systemList,
        }).then(() => {
          ElMessage({
            message: '保存成功',
            type: 'success',
          });
          drawer.value = false;
          init();
        });
      }
    };
    const submitForm = () => {
      if (!editorFormRef) return;
      editorFormRef.value.validate(async (valid: boolean) => {
        if (!valid) return false;
        const { systemList } = await getStoreKey<{ systemList: Array<SystemType> }>(['systemList']);

        if (localInputType.value === 'system') {
          const currectSystem = systemList.filter((x: SystemType) => x.id === editorForm.value.id);
          const rst = currectSystem.length > 0;
          if (localFormType.value === 'add') {
            handleCreateSystem(rst, systemList);
          }
          if (localFormType.value === 'edit') {
            handleEditorSystem(rst, systemList);
          }
        }
        if (localInputType.value === 'user') {
          console.log(systemList);
          const currectSystem = systemList.filter((x: SystemType) => x.id === editorForm.value.belongId);
          const rst = currectSystem.length > 0;
          if (!rst) {
            ElMessage({
              message: '平台不存在',
              type: 'error',
            });
            return;
          }
          const userRst = currectSystem[0].userList.filter((x: UserType) => x.id === editorForm.value.id).length > 0;
          if (localFormType.value === 'add') {
            handleCreateUser(userRst, systemList);
          }
          if (localFormType.value === 'edit') {
            handleEditorUser(userRst, systemList);
          }
        }
      });
    };
    // 重置表单
    const resetForm = () => {
      editorFormRef.value.resetFields();
      drawer.value = false;
    };
    // 删除平台
    const deleteSystem = async (system: SystemType) => {
      const { systemList } = await getStoreKey<{ systemList: Array<SystemType> }>(['systemList']);
      ElMessageBox.confirm('是否删除该平台', '温馨提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        for (let i = 0; i < systemList.length; i++) {
          if (systemList[i].id === system.id) {
            systemList.splice(i, 1);
          }
        }
        setStore({ systemList: systemList }).then(() => {
          init();
        });
      });
    };
    // 删除用户
    const deleteUser = async (system: SystemType, user: UserType) => {
      const { systemList } = await getStoreKey<{ systemList: Array<SystemType> }>(['systemList']);
      ElMessageBox.confirm('是否删除该用户', '温馨提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        for (let i = 0; i < systemList.length; i++) {
          if (systemList[i].id === system.id) {
            for (let j = 0; j < systemList[i].userList.length; j++) {
              if (systemList[i].userList[j].id === user.id) {
                systemList[i].userList.splice(i, 1);
              }
            }
          }
        }
        setStore({ systemList: systemList }).then(() => {
          init();
        });
      });
    };
    return {
      systemList,
      drawer,
      drawerTitle,
      editorForm,
      editorFormRef,
      renderForm,
      systemFormRules,
      submitForm,
      resetForm,
      createOrEditor,
      deleteSystem,
      deleteUser,
    };
  },
});
</script>
<style lang="less" scoped>
* {
  margin: 0;
  box-sizing: border-box;
}
a {
  text-decoration: none;
}
.w10 {
  width: 10%;
}
.w15 {
  width: 15%;
}
.w20 {
  width: 20%;
}
.w25 {
  width: 25%;
}
.w30 {
  width: 30%;
}
.w35 {
  width: 35%;
}
.w40 {
  width: 40%;
}
.option {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  min-height: 600px;
  .option-header {
    position: fixed;
    top: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-top: 15px;
    height: 65px;
    width: 1300px;
    background-color: #fff;
    z-index: 999;
  }
  .option-content {
    margin-top: 55px;
    width: 1300px;
    .option-content-title {
      display: flex;
      align-items: center;
      margin: 10px 0;
      .option-content-text {
        font-size: 16px;
        font-weight: 600;
        width: 85px;
      }
    }
    .option-content-table {
      width: 100%;
      font-size: 14px;
      .table-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 25px;
        background-color: #f4f4f4;
        padding: 5px 10px;
      }
      .table-content {
        padding: 5px 10px;
        .table-content-system {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 100%;
          margin: 5px 0;
          .system-url:not(:last-child) {
            margin-right: 4px;
          }
        }
        .table-content-user {
          width: 100%;
          margin-top: 10px;
          font-size: 12px;
          .table-content-user-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 25px;
            width: 100%;
            background-color: #f5f7fa;
          }
          .table-content-user-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 5px 0;
          }
        }
      }
      .table-column {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
      }
    }
  }
  :deep(.el-input-number i) {
    line-height: 26px;
  }
}
</style>
