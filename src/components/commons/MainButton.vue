<script setup lang="ts">
const props = defineProps<{
  title: string
  fullSize: boolean
  icon?: string
  type?: 'button' | 'submit' | 'reset' // No incluir 'undefined' como string
}>()
</script>

<template>
  <button
    :type="type"
    class="px-4 py-3 rounded-md bg-primary text-secondary text-base hover:bg-primary-light transition ease-in-out delay-75 active:bg-primary-light focus:outline-none focus:ring-2 focus:ring-primary-light flex items-center cursor-pointer"
    :class="{ 'w-full': fullSize }"
  >
    <span
      class="material-symbols-outlined text-xl ml-3"
      :class="{ 'mr-2': title !== '' }"
      v-if="icon"
    >
      {{ props.icon }}
    </span>

    <span class="mx-auto">{{ props.title }}</span>
  </button>
</template>
