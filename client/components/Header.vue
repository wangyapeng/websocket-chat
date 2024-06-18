<template>
    <div class="header_container">
        <div class="left"></div>
        <div class="right">
            <div class="btns_container" v-if="!isLogin">
                <el-button type="primary" @click="register">注册</el-button>
                <el-button type="primary" @click="openLogin">登录</el-button>
            </div>
            <div class="login_info" v-if="isLogin">
                <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    {{ props.store?.userInfo?.name }} <el-icon class="el-icon--right"><arrow-down /></el-icon>
                </span>
                <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item :icon="UserFilled">个人信息</el-dropdown-item>
                    <el-dropdown-item :icon="SwitchButton" @click="logout">登出</el-dropdown-item>
                </el-dropdown-menu>
                </template>
            </el-dropdown>
            </div>
        </div>
        <Register v-if="isDialogVisible && dialogType === 'register'" @close="closeDialog"/>
        <LoginView v-if="isDialogVisible && dialogType === 'login'" @close="closeDialog"/>
    </div>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue';
import Register from './Register.vue';
import LoginView from './Login.vue';
import api from "@/api";
import {
  ArrowDown,
  UserFilled,
  SwitchButton,
  CirclePlus,
  CirclePlusFilled,
  Plus,
} from '@element-plus/icons-vue'
const emit = defineEmits(["connect", "disConnect"]);
const props = defineProps(['store','presenter'])
var isDialogVisible = ref(false);
var dialogType = ref('');
var isLogin = ref(false);
var userInfo = props.store.userInfo;

watch(() => props.store.isLogin, async (newVal, oldVal) => {
    isLogin.value = newVal;
})

const register = function() {
    dialogType.value = 'register';
    isDialogVisible.value = true;
}

const closeDialog = function() {
    isDialogVisible.value = false;
    props.presenter.autoLogin();
}

const openLogin = function() {
    dialogType.value = 'login';
    isDialogVisible.value = true;
}

async function logout() {
    await api.post("/logout");
    sessionStorage.clear();
    props.store.initUserInfo(null);
    props.store.setLoginStatus(false)
    localStorage.removeItem('userInfo')

    emit('disConnect')
}

onMounted(() => {
    // autoLogin();
})

</script>
<style>
.header_container{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
}
.left{
    flex: 1;
}
.right{
    float:right;
    .user_name, .el-dropdown-link {
        color: #fff;
        font-size: 12px;
    }
}
</style>