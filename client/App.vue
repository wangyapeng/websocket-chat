<template>
  <div class="common-layout">
    <el-container style="height: 100%">
      <el-header class="app_header">
        <Header @connect="connectSocket" @disConnect="presenter.disConnect" :store="userStore" :presenter="presenter"/>
      </el-header>
      <el-container>
        <el-aside width="130px">
          <div class="left_aside">
            <el-menu class="el-menu-vertical-demo">
              <el-menu-item v-for="user in userStore.data" index="user.email" :class="user.email === presenter.email ? 'local_user' : ''">
                <el-icon><Avatar /></el-icon>
                <span>{{ user.name }}</span>
              </el-menu-item>
            </el-menu>
          </div>
        </el-aside>
        <el-main style="padding: 12px">
          <div class="right_article">
            <message-box :store="userStore" @send="sendMessage" ref="messageBox">
            </message-box>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { io } from "socket.io-client";
import Header from "@/components/Header.vue";
import MessageBox from "@/components/MessageBox.vue";
import { Document, Avatar, Location, Setting } from "@element-plus/icons-vue";

import { userListStore } from "./stores/app";
import AppPresenter from './AppPresenter';

const userStore = userListStore();
const presenter = new AppPresenter(userStore);
var messageBox = ref(null);

onMounted(() => {
  init();
})

async function init() {
  await presenter.init();
}

function connectSocket() {
  presenter.connectSocket();
}

function sendMessage(mes) {
  presenter.sendMessage(mes);
}

</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.frame_work {
  background-color: #fff;
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
}
.app_header {
  background-color: #888683;
}
.container {
  background-color: #fff;
  flex: 1;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .message_box {
    flex: 1;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin: 20px 0px 20px 0px;
    overflow: auto;
  }

  .message_send_box {
    height: 100px;
    border: 1px solid #ddd;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    #message {
      flex: 1;
      padding: 20px;
    }
  }
}
.common-layout {
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  position: absolute;
}
.left_aside {
  height: 100%;
  flex: 1;
  display: flex;
  & .local_user{
    color: var(--el-color-primary)
  }
}
.right_article {
  height: 100%;
}
.left {
  width: 200px;
}
</style>
