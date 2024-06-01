<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :placeholder="placeholder"
  />
</template>

<script>
export default {
  props: {
    modelValue: String,
    placeholder: String,
  },
};
</script>
