<template>
  <select :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
    <option v-for="option in options" :key="option.value" :value="option.value">{{ option.text }}</option>
  </select>
</template>

<script>
export default {
  name: 'Select',
  props: {
    modelValue: {
      type: [String, Number], // Может быть строкой или числом
      required: true
    },
    options: {
      type: Array,
      required: true
    }
  }
}
</script>
