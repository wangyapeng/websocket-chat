<template>
    <el-dialog v-model="dialogFormVisible" title="登录" width="500">
      <el-form :model="form">
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off" type="password" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="submit"> 确认 </el-button>
        </div>
      </template>
    </el-dialog>
  </template>
  <script setup>
  import { ref, reactive, onMounted } from "vue";
  import api from "@/api";
  import { showSuccess } from "../util/errorMessage.js";
  const emit = defineEmits(["close", "submit"]);
  const dialogFormVisible = ref(true);
  const formLabelWidth = 100;
  
  const cancel = () => {
    dialogFormVisible.value = false;
    emit("close");
  };
  
  const form = reactive({
    email: "",
    password: "",
  });
  
  const login = async function (data) {
    return await api.post("/login", data);
  };
  
  const submit = async () => {
    const formData = form;
    const { data: {message, ...res }} = await login({
      email: formData.email,
      password: formData.password,
    });
    if (res.id) {
      showSuccess(message)
    }
  
    emit('close')
  };
  
  onMounted(() => {});
  </script>
  <style></style>
  