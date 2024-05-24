<template>
  <div>
    <!-- 文件选择框 -->
    <input type="file" @change="upload" />

    <!-- 上传进度显示 -->
    <div v-if="uploadProgress !== null">上传进度：{{ uploadProgress }}%</div>

    <!-- 上传状态显示 -->
    <div v-if="uploadStatus">{{ uploadStatus }}</div>

    <!-- 文件信息表格 -->
    <table v-if="uploadedFiles.length > 0">
      <thead>
        <tr>
          <th>文件名</th>
          <th>上传时间</th>
          <th>大小</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="file in uploadedFiles" :key="file.name">
          <td>{{ file.name }}</td>
          <td>{{ file.uploadTime }}</td>
          <td>{{ formatFileSize(file.size) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

// 上传进度
const uploadProgress = ref(null);

// 上传状态
const uploadStatus = ref('');

// 已上传的文件列表
const uploadedFiles = ref([]);

/**
 * 上传文件
 * @param {Event} event - 文件选择事件
 */
const upload = event => {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  uploadProgress.value = 0;
  uploadStatus.value = '';

  const formData = new FormData();
  formData.append('file', file);

  axios
    .post('http://localhost:3000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: progressEvent => {
        let progressPercent = Number(((progressEvent.loaded / progressEvent.total) * 100).toFixed(2));
        uploadProgress.value = progressPercent;
      }
    })
    .then(response => {
      uploadStatus.value = '文件上传成功!';
      uploadedFiles.value.push({
        name: file.name,
        size: file.size,
        uploadTime: new Date().toLocaleString()
      });

      setTimeout(() => {
        uploadProgress.value = null;
        uploadStatus.value = '';
      }, 3000);
    })
    .catch(error => {
      uploadStatus.value = '文件上传失败!';
      uploadProgress.value = null;
      console.error('文件上传失败:', error);
    });
};

/**
 * 格式化文件大小
 * @param {number} bytes - 文件大小（字节）
 * @returns {string} - 格式化后的文件大小
 */
const formatFileSize = bytes => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

thead {
  background-color: #f2f2f2;
}
</style>
