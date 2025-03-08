<template>
    <div v-if="isOpen" class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <span>关卡详情</span>
          <button @click="closeModal">关闭</button>
        </div>
        <div class="modal-body">
          <pre>{{ JSON.stringify(jsonData, null, 2) }}</pre>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, watch } from 'vue';
  
  export default {
    props: {
      modelValue: Boolean, // v-model 绑定的值
      jsonData: Object
    },
    emits: ['update:modelValue'], // 定义可触发的事件
    setup(props, { emit }) {
      const isOpen = ref(props.modelValue);
  
      watch(() => props.modelValue, (newValue) => {
        isOpen.value = newValue;
      });
  
      const closeModal = () => {
        emit('update:modelValue', false); // 通过 v-model 更新父组件的状态
      };
  
      return {
        isOpen,
        closeModal
      };
    }
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    margin: 0 !important;
    width: 100% !important;
    height: 100% !important;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal {
    background: rgb(1, 1, 1);
    color: white;
    padding: 20px;
    border-radius: 8px;
    width: 80%;
    max-height: 80%;
    overflow: auto;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .modal-header button {
    background: none;
    border: none;
    font-size: 16px;
    cursor: pointer;
  }
  
  .modal-body pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
  </style>