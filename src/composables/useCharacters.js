import { ref, reactive } from 'vue';
import { fetchCharacters } from '../api/characters';

export function useCharacters() {

  // Параметры фильтра с начальными значениями
  const filters = reactive({
    name: '',
    status: ''
  });

  // Статусы
  const statusOptions = [
    { text: 'Выбрать статус', value: '' },
    { text: 'Живой', value: 'Alive' },
    { text: 'Мёртв', value: 'Dead' },
    { text: 'Неизвестно', value: 'unknown' }
  ];

  // Количества элементов на странице
  const itemsPerPageOptions = [
    { text: "5", value: 5 },
    { text: "10", value: 10 },
    { text: "20", value: 20 },
  ];
  const itemsPerPage = ref(itemsPerPageOptions[2].value); // По умолчанию 20

  // Состояния персонажей, страницы и загрузки
  const characters = ref([]);
  const page = ref(1);
  const hasMorePages = ref(true);
  const isLoading = ref(false);

  // Применение фильтров
  const applyFilters = async () => {
    page.value = 1;
    await loadCharacters();
  };

  // Загрузка персонажей
  const loadCharacters = async () => {
    isLoading.value = true;
    try {
      const response = await fetchCharacters(page.value, filters.name, filters.status);
      characters.value = response.results.slice(0, itemsPerPage.value); // Установка списка персонажей с учётом количества на странице
      hasMorePages.value = response.info.next !== null; // Проверка наличия следующих страниц
    } catch (error) {
      console.error('Ошибка при загрузке персонажей:', error);
    } finally {
      isLoading.value = false;
    }
  };

  // Функции перехода по страницам
  const prevPage = async () => {
    if (page.value > 1) {
      page.value--;
      await loadCharacters();
    }
  };

  const nextPage = async () => {
    if (hasMorePages.value) {
      page.value++;
      await loadCharacters();
    }
  };

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
    loadCharacters
  };
}
