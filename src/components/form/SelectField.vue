<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import type { SelectFieldI } from '@/interfaces/selectInterface'
const ErrorMessage = defineAsyncComponent(() => import('@/components/commons/ErrorMsg.vue'))

const props = withDefaults(
  defineProps<{
    modelValue: string | number
    options: SelectFieldI[]
    name: string
    label: string
    error?: string
  }>(),
  {
    modelValue: '', // Valor por defecto
  },
)

const emit = defineEmits<{
  (event: 'update:modelValue', modelValue: string | number): void
}>()

const updateValue = (event: Event) => {
  const select = event.target as HTMLSelectElement
  emit('update:modelValue', select.value)
}
</script>

<template>
  <div class="form-group w-full mb-10 capitalize">
    <select
      :value="modelValue"
      required
      :name="name"
      @change="updateValue($event)"
      class="peer form-input form-select"
    >
      <option v-if="options.length < 1">Cargando lista ...</option>

      <option v-else v-for="option in props.options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <ErrorMessage :err="error" />
    <label
      :for="props.name"
      class="form-label"
      :class="{ 'form-input-filled-label': modelValue }"
      >{{ label }}</label
    >
  </div>
</template>

<style scoped lang="css"></style>
