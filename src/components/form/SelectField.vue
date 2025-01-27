<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import type { SelectFieldI } from '@/interfaces/selecFieldInterface'
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
  <div class="form-group z-0 w-full mb-10 capitalize">
    <select
      :value="modelValue"
      required
      :name="name"
      @change="updateValue($event)"
      class="form-imput form-select w-full bg-transparent border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-primary appearance-none capitalize"
    >
      <option v-if="options.length < 1">Cargando lista ...</option>

      <option v-else v-for="option in props.options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <label :for="name" class="origin-0">{{ label }}</label>
    <ErrorMessage :err="error" />
  </div>
</template>

<style scoped lang="css"></style>
