<script setup>
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <select
    :value="props.modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  >
  <slot/></select>
</template>