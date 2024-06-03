<template>
  <div id="app">
    <!-- Хэдер -->
    <AppHeader />

    <main class="main-content">
      <!-- Фильтрация по имени и статусу -->
      <section class="filters">
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
      </section>

      <!-- Пагинация вверху-->
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

      <!-- Карточки персонажей -->
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

    <!-- Кнопка "Вверх" -->
    <ScrollToTop />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { fetchCharacters } from "./api/characters.js"; // Импорт функции для запроса персонажей из API
import AppHeader from "./layouts/Header.vue";
import AppFooter from "./layouts/Footer.vue";
import CharacterCard from "./components/CharacterCard.vue";
import Input from "./components/ui/Input.vue";
import Select from "./components/ui/Select.vue";
import Button from "./components/ui/Button.vue";
import Pagination from "./components/Pagination.vue";
import ScrollToTop from "./components/ui/ScrollToTop.vue";
import Loader from './components/ui/Loader.vue';

export default {
  components: {
    AppHeader,
    AppFooter,
    CharacterCard,
    Input,
    Select,
    Button,
    ScrollToTop,
    Pagination,
    Loader
  },
  setup() {
    const characters = ref([]); // Список персонажей
    const page = ref(1); // Текущая страница
    const hasMorePages = ref(false); // Флаг наличия следующих страниц
    const itemsPerPage = ref(20); // Количество элементов на странице
    const filters = ref({
      // Фильтры поиска персонажей
      name: "", // по имени
      status: "", // по статусу
    });
    const isLoading = ref(false);

    // Варианты фильтра по статусу персонажа
    const statusOptions = [
      { value: "", text: "Выбрать статус" },
      { value: "alive", text: "Живой" },
      { value: "dead", text: "Мёртв" },
      { value: "unknown", text: "Неизвестно" },
    ];

    // Варианты количества элементов на странице
    const itemsPerPageOptions = [
      { value: 5, text: "5" },
      { value: 10, text: "10" },
      { value: 15, text: "15" },
      { value: 20, text: "20" },
    ];

    // Получить список персонажей
    const fetchAndSetCharacters = async () => {
      isLoading.value = true;

      try {
        const data = await fetchCharacters(
        page.value,
        filters.value.name,
        filters.value.status
      );
      characters.value = data.results.slice(0, itemsPerPage.value); // Установка списка персонажей с учётом количества на странице
      hasMorePages.value = data.info.next !== null; // Установка флага наличия следующих страниц
      } catch (error) {
        console.error('Ошибка при загрузке персонажей:', error);
      } finally {
        isLoading.value = false;
      }
    };

    // Применение фильтров и обновление списка персонажей
    const applyFilters = () => {
      page.value = 1; // Сброс текущей страницы при применении фильтров
      fetchAndSetCharacters();
    };

    // Переход к следующей странице
    const nextPage = () => {
      page.value++;
      fetchAndSetCharacters();
    };

    // Переход к предыдущей странице
    const prevPage = () => {
      if (page.value > 1) {
        // Проверка на возможность перехода к предыдущей странице
        page.value--;
        fetchAndSetCharacters();
      }
    };

    // Вызов функции загрузки персонажей
    onMounted(fetchAndSetCharacters);

    return {
      characters,
      page,
      hasMorePages,
      isLoading,
      itemsPerPage,
      filters,
      statusOptions,
      itemsPerPageOptions,
      applyFilters,
      nextPage,
      prevPage,
    };
  },
};
</script>

<style>
.main-content {
  background-color: #272b33;
  padding: 4.5rem 0;
}

/* Фильтры */
.filters {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.filters input,
.filters select,
.filters button {
  margin: 0 0.5rem;
  width: auto;
}

/* Кол-во персонажей на странице */
.characters-per-page {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  align-items: baseline;
}

/* Карточки персонажей */
.characters {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

@media (max-width: 768px) {
  .filters {
    flex-direction: column;
    gap: 10px;
  }
}

@media (max-width: 480px) {
  .main-content {
    padding: 2rem 0;
  }
}
</style>
