<template>
  <div id="app">
    <!-- Хэдер -->
    <AppHeader />

    <main class="main-content">
      <!-- Фильтрация по имени и статусу -->
      <div class="filters">
        <Input
          v-model="filters.name"
          placeholder="Имя"
          @keyup.enter="applyFilters"
        />
        <Select
          v-model="filters.status"
          :options="statusOptions"
          @change="applyFilters"
        />
        <Button text="Применить" @click="applyFilters" />
      </div>

      <!-- Пагинация  вверху -->
      <Pagination
        :page="page"
        :hasMorePages="hasMorePages"
        @prev-page="prevPage"
        @next-page="nextPage"
      />

      <!-- Кол-во персонажей на странице -->
      <section class="characters-per-page">
        <label for="itemsPerPage">Персонажей на странице:</label>
        <Select
          v-model="itemsPerPage"
          :options="itemsPerPageOptions"
          @change="applyFilters"
        />
      </section>

      <!-- Loader -->
      <Loader :isLoading="isLoading" />

      <!-- Список персонажей -->
      <section class="characters" v-if="!isLoading">
        <CharacterCard
          v-for="character in characters"
          :key="character.id"
          :character="character"
        />
      </section>

      <!-- Пагинация внизу -->
      <Pagination
        :page="page"
        :hasMorePages="hasMorePages"
        @prev-page="prevPage"
        @next-page="nextPage"
      />
    </main>

    <!-- Футер -->
    <AppFooter />
  </div>
</template>

<script>
import { onMounted } from "vue";
import AppHeader from "./layouts/Header.vue";
import AppFooter from "./layouts/Footer.vue";
import Input from "./components/ui/Input.vue";
import Select from "./components/ui/Select.vue";
import Button from "./components/ui/Button.vue";
import Loader from "./components/ui/Loader.vue";
import CharacterCard from "./components/CharacterCard.vue";
import Pagination from "./components/Pagination.vue";
import { useCharacters } from "./composables/useCharacters";

export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter,
    Input,
    Select,
    Button,
    Loader,
    CharacterCard,
    Pagination,
  },
  setup() {
    // Используем composable для управления состояниями и логикой
    const {
      filters,
      statusOptions,
      itemsPerPageOptions,
      itemsPerPage,
      characters,
      page,
      hasMorePages,
      isLoading,
      applyFilters,
      prevPage,
      nextPage,
      loadCharacters,
    } = useCharacters();

    // Загрузка персонажей при монтировании компонента
    onMounted(() => {
      loadCharacters();
    });

    return {
      filters,
      statusOptions,
      itemsPerPageOptions,
      itemsPerPage,
      characters,
      page,
      hasMorePages,
      isLoading,
      applyFilters,
      prevPage,
      nextPage,
    };
  },
};
</script>

<style scoped>
.main-content {
  background-color: #272b33;
  padding: 4.5rem 0;
}

.filters {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.characters-per-page {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.characters-per-page label {
  color: #ffffff;
  margin-right: 10px;
}

.characters {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}
</style>
