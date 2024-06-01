<template>
  <header class="app-header">
    <h1>The Rick and Morty</h1>
  </header>
</template>

<script>
export default {
  name: "AppHeader",
};
</script>

<style scoped>
.app-header {
  height: 200px;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.app-header h1 {
  color: #202329;
  font-weight: bolder;
  font-size: 4.625rem;
}

@media (max-width: 768px) {
  .app-header h1 {
    font-size: 4rem;
  }
}

@media (max-width: 480px) {
  .app-header {
    height: 150px;
  }
  .app-header h1 {
    font-size: 2.3rem;
  }
}
</style>
