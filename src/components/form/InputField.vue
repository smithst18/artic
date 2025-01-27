<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
const ErrorMessage = defineAsyncComponent(() => import('@/components/commons/ErrorMsg.vue'))

const props = withDefaults(
  defineProps<{
    modelValue: string | number
    type: 'text' | 'password' | 'date' | 'number'
    name: string
    autocomplete: string
    label: string
    error?: string
    readonly?: boolean
  }>(),
  {
    modelValue: '', // Valor por defecto
  },
)

const emit = defineEmits<{
  (event: 'update:modelValue', modelValue: string): void
}>()

const updateValue = (event: Event) => {
  console.log(props)
  const input = event.target as HTMLInputElement
  emit('update:modelValue', input.value)
}
</script>

<template>
  <div class="form-group w-full mb-10 capitalize">
    <input
      :value="modelValue"
      @input="updateValue($event)"
      required
      :type="type"
      :name="name"
      placeholder=""
      :autocomplete="autocomplete"
      :readonly="readonly"
      class="peer form-input"
    />
    <slot> </slot>
    <ErrorMessage :err="error" />
    <label :for="name" class="form-label" :class="{ 'form-input-filled': modelValue }">{{
      label
    }}</label>
  </div>
</template>

<style scoped lang="css"></style>
