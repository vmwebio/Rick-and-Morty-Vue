# Описание проекта "Персонажи Рика и Морти"

Проект "Персонажи Рика и Морти" является веб-приложением, разработанным с использованием Vue 3 Composition API, для удобного просмотра информации о персонажах из популярного анимационного сериала "Рик и Морти". Api - https://rickandmortyapi.com

## Функциональность

Приложение позволяет пользователям:

- Просматривать персонажей в виде карточек.
- Использовать пагинацию для перехода между страницами с персонажами.
- Фильтровать персонажей по их имени и статусу.
- Адаптивный дизайн для удобного просмотра на различных устройствах.

## Структура проекта

Проект организован в соответствии со следующей структурой:

- Файл `App.vue` содержит основную структуру приложения.
- Файл `useCharacters.js` в папке `composables` содержит основную логику приложения.
- В папке `api` находится модуль `characters.js` для взаимодействия с API Rick and Morty.
- В папке `components` содержатся компоненты UI, такие как карточка персонажа, загрузчик, пагинация, кнопка, текстовое поле, кнопка вверх и выпадающий список.
- В папке `layouts` находятся компоненты, определяющие структуру страницы, такие как заголовок и подвал.
- Файл `main.css` в папке `assets` содержит глобальные стили приложения.


- **src/**
  - **api/**
    - `characters.js`
  - **components/**
    - **ui/**
      - `Button.vue`
      - `Input.vue`
      - `Select.vue`
      - `ScrollToTop.vue`
      - `Loader.vue`
    - `CharacterCard.vue`
    - `Pagination.vue`
  - **composables/**
    - `useCharacters.js`
  - **layouts/**
    - `Header.vue`
    - `Footer.vue`
  - **assets/**
    - `main.css`
    - `base.css`
- `App.vue`
- `main.js`


## Использование

Чтобы запустить проект локально, выполните следующие шаги:

1. Клонируйте репозиторий на свой компьютер.
2. Установите зависимости, выполнив команду `npm install`.
3. Запустите приложение, используя команду `npm run serve`.
