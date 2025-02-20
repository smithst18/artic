<script setup lang="ts">
import { computed } from 'vue'
import { useMainStore } from '@/stores/mainStore'

const mainStore = useMainStore()

const props = defineProps<{
  totalpages: number
  elementsPerPage: number
  totalResults?: number
  visiblePages: number
  activeIndex: number | 1
}>()

const emit = defineEmits<{
  (event: 'dataPagination', page: number): void
  (event: 'nextPage'): void
  (event: 'prevPage'): void
}>()

// Cálculo del rango de páginas visibles
const startPage = computed(() =>
  Math.max(1, props.activeIndex - Math.floor(props.visiblePages / 2)),
)
const endPage = computed(() => Math.min(props.totalpages, startPage.value + props.visiblePages - 1))
</script>

<template>
  <div class="flex items-center w-full h-full">
    <div>
      <span class="ml-2 text-third">
        mostrando {{ props.elementsPerPage }}, elementos de {{ mainStore.getPagingCounter }} hasta
        {{ mainStore.getPagingCounter + 10 - 1 }} resultados
        <span v-if="props.totalResults">, total global: {{ props.totalResults }} </span>
      </span>
    </div>
    <nav class="mx-auto bg-primary rounded-2xl">
      <!-- Agregamos list-none y flex al ul, según @apply list-none flex; -->
      <ul class="list-none flex">
        <!-- Primer li: botón de página anterior -->
        <li
          @click="emit('prevPage')"
          class="mx-3 py-1 text-center cursor-pointer my-auto h-full w-6 text-secondary hover:text-secondary/90"
        >
          <a href="#" class="text-xl">&lt;</a>
        </li>

        <!-- Generar las páginas visibles -->
        <li
          v-for="page in endPage - startPage + 1"
          :key="page + startPage - 1"
          @click="emit('dataPagination', page + startPage - 1)"
          :class="[
            'mx-3 py-1 text-center cursor-pointer my-auto h-full w-6',
            props.activeIndex === page + startPage - 1 ? 'text-white' : 'text-secondary',
          ]"
        >
          <a
            href="#"
            class="rounded-sm"
            :class="
              props.activeIndex === page + startPage - 1 ? 'bg-secondary text-slate-800 px-2' : ''
            "
          >
            {{ page + startPage - 1 }}
          </a>
        </li>

        <!-- Último li: botón de página siguiente -->
        <li
          @click="emit('nextPage')"
          class="mx-3 py-1 text-center cursor-pointer my-auto h-full w-6 text-secondary hover:text-secondary/90"
        >
          <a href="#" class="text-xl">></a>
        </li>
      </ul>
    </nav>
  </div>
</template>
