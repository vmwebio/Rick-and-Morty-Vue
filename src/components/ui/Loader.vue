<template>
    <div class="loader" v-if="isLoading">
      <div class="spinner"></div>
    </div>
  </template>
  
  <script>
  import { defineComponent, toRefs } from 'vue';
  
  export default defineComponent({
    name: 'Loader',
    props: {
      isLoading: {
        type: Boolean,
        required: true
      }
    },
    setup(props) {
      const { isLoading } = toRefs(props);
      return { isLoading };
    }
  });
  </script>
  
  <style scoped>
  .loader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  
  .spinner {
    width: 50px;
    height: 50px;
    border: 8px solid rgba(0, 0, 0, 0.1);
    border-left-color: #fff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  </style>
  