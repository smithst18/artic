<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { defineAsyncComponent } from 'vue'
import type { SelectFieldI } from '@/interfaces/selectInterface'

// Componente para mostrar errores (se carga de forma asíncrona)
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

// Controla si el dropdown está abierto o cerrado
const isOpen = ref(false)
// Referencia al contenedor del select para detectar clicks fuera
const dropdownRef = ref<HTMLElement | null>(null)

// Alterna la visibilidad del dropdown
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

// Al seleccionar una opción, se emite el valor y se cierra el dropdown
const selectOption = (option: SelectFieldI) => {
  emit('update:modelValue', option.value)
  isOpen.value = false
}

// Computado para obtener la opción seleccionada (para mostrar su label)
const selectedOption = computed(() => {
  return props.options.find((option) => option.value === props.modelValue)
})

// Cierra el dropdown si se hace click fuera del componente
const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="form-group w-full mb-10 capitalize relative" ref="dropdownRef">
    <!-- Input oculto para mantener la funcionalidad de formulario si es necesario -->
    <input type="hidden" :name="props.name" :value="props.modelValue" />

    <!-- Trigger que conserva las clases originales -->
    <div class="peer form-input cursor-pointer" @click="toggleDropdown">
      <span v-if="selectedOption">{{ selectedOption.label }}</span>
    </div>

    <!-- Dropdown de opciones con animación -->
    <transition name="dropdown">
      <ul
        v-show="isOpen"
        class="absolute z-10 mt-1 w-full bg-white rounded shadow-lg max-h-[400px] overflow-y-auto border-[.5px] border-gray-200"
      >
        <li
          v-for="option in props.options"
          :key="option.value"
          class="p-2 hover:bg-gray-100 cursor-pointer"
          @click="selectOption(option)"
        >
          {{ option.label }}
        </li>
      </ul>
    </transition>

    <!-- Componente para mostrar errores -->
    <ErrorMessage :err="props.error" />

    <!-- Label asociado -->
    <label class="form-label" :class="{ 'form-input-filled-label': props.modelValue }">
      {{ props.label }}
    </label>
  </div>
</template>

<style scoped>
/* Animación para el dropdown */
.dropdown-enter-active,
.dropdown-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
