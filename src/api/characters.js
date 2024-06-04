export const fetchCharacters = async (page, name, status) => {
  const params = new URLSearchParams({ page, name, status });
  const response = await fetch(`https://rickandmortyapi.com/api/character?${params.toString()}`);
  if (!response.ok) {
    throw new Error('Ошибка при получении данных');
  }
  return await response.json();
};
