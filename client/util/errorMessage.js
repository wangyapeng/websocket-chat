import { ElMessage } from 'element-plus';

export const showError = function(message) {
    ElMessage.error(message);
}

export const showSuccess = function(message) {
    ElMessage.success(message);
}