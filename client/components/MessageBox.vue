<template>
    <div class="message_container">
        <el-scrollbar class="scroll_box" height="500" ref="scrollRef">
            <div class="innerRef" ref="innerRef">
                <p v-for="item in props.store.messages" :key="item" class="scrollbar-demo-item">{{ item?.message?.message }}</p>
            </div>
         </el-scrollbar>
         <div class="send_box">
            <el-input
                v-model="text"
                :rows="3"
                type="textarea"
                placeholder="请输入，使用cmd+enter换行"
            />
            <el-button type="primary" @click="sendMessage">发送</el-button>
         </div>
    </div>
    
</template>
<script setup>
import { ref,onMounted, watch, onUpdated } from 'vue'
import { ElScrollbar } from 'element-plus'
var text = ref(null);
var props = defineProps(['message','store']);
const emit = defineEmits(["send", "submit"]);
var datas = ref(props.message);
var scrollRef = ref(null);
var innerRef = ref(null);

function scroll(ref) {
    console.log(ref);
}

watch(datas, (newVal, oldVal) => {
    updateScrollPos()
})

async function sendMessage() {
    const localUser = localStorage.getItem('userInfo')
    await emit('send',{message: text?.value, userName: localUser.name});
    text.value = null;
    updateScrollPos();
}

function updateScroll() {
    var height = innerRef.value.clientHeight + 40;
    scrollRef.value.setScrollTop(height);
}

onMounted(() => {
    updateScrollPos();
})

function updateScrollPos() {
    setTimeout(() => {
        updateScroll()
    }, 1000);
}

onUpdated(() => {
    updateScrollPos();
})

</script>
<style>
.message_container{
    display: flex;
    flex-direction: column;
}
.scroll_box{
    flex: 1;
    border: 1px solid #ddd;
    border-radius: 5px;
}
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: left;
  height: 50px;
  margin: 10px;
  padding-left: 20px;
  text-align: center;
  border-radius: 5px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
.send_box{
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    position: relative;
    box-sizing: border-box;
    & .el-textarea{
        flex:1;
    }

    & .el-button{
        margin-left: 12px;
        top: 12px;
        position: relative;
        position: absolute;
        right: 10px;
        top: 50px;
    }
}
</style>