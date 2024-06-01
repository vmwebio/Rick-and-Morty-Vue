<template>
  <section class="pagination">
    <Button text="Предыдущая" @click="onPrevPage" :disabled="page === 1" />
    <span>Страница {{ page }}</span>
    <Button text="Следующая" @click="onNextPage" :disabled="!hasMorePages" />
  </section>
</template>

<script>
import Button from "./ui/Button.vue";

import { defineComponent } from "vue";

export default defineComponent({
  components: {
    Button,
  },
  name: "Pagination",
  props: {
    page: {
      type: Number,
      required: true,
    },
    hasMorePages: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["prev-page", "next-page"],
  setup(props, { emit }) {
    const onPrevPage = () => {
      emit("prev-page");
    };

    const onNextPage = () => {
      emit("next-page");
    };

    return {
      onPrevPage,
      onNextPage,
    };
  },
});
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}

.pagination span {
  margin: 0 1rem;
}

@media (max-width: 768px) {
  .pagination {
    flex-direction: column;
  }
}
</style>
