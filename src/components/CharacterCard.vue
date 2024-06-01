<template>
  <article class="character-card" tabindex="0">
    <img :src="character.image" :alt="character.name" />
    <div class="character-info">
      <h2>{{ character.name }}</h2>
      <p>Статус: {{ character.status }}</p>
      <p>Вид: {{ character.species }}</p>
      <p>Пол: {{ character.gender }}</p>
      <p>Локация: {{ character.location.name }}</p>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    character: Object,
  },
};
</script>

<style scoped>
.character-card {
  background-color: #3c3e44;
  display: flex;
  flex-direction: row;
  border-radius: 0.5rem;
  overflow: hidden;
  margin: 0.75rem;
  padding: 0 1rem 0 0;
  width: 600px;
  height: 220px;
}

.character-card img {
  width: 230px;
  height: auto;
  object-fit: cover;
  margin-right: 1rem;
}

.character-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.75rem;
}

.character-info h2 {
  margin: 0;
  font-size: 1.5rem;
  color: #ffffff;
}

.character-info p {
  margin: 0.25rem 0;
  color: #b0b0b0;
}

@media (max-width: 1280px) {
  .character-card {
    width: calc(100% / 2 - 1rem);
  }
}

@media (max-width: 768px) {
  .character-card {
    flex-direction: column;
    height: initial;
    width: 100%;
  }

  .character-card img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    margin-right: 0px;
  }
}
</style>
