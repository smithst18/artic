<script lang="ts" setup>
import { ref, computed } from 'vue'
import type { TicketLink } from '@/interfaces/sidebarInterface'
import { useRoute } from 'vue-router'

const route = useRoute()

const props = defineProps<{
  icon: string
  title: string
  links: Array<TicketLink>
  is_spanded: boolean
}>()

const emit = defineEmits<{
  (event: 'inFocus'): void
}>()

const list_is_spanded = ref(false)
const toggleList = () => (list_is_spanded.value = !list_is_spanded.value)

const isActive = computed(() => {
  const currentPath = route.path.split('/')[1]
  return currentPath === props.title.toLowerCase()
})
</script>

<template>
  <div @click="emit('inFocus')" class="pb-2 cursor-pointer">
    <!-- Dropdown Header -->
    <div
      class="flex items-center p-3 rounded-md transition duration-300 ease-in-out cursor-pointer bg-gray-100 hover:bg-gray-200 hover:text-black"
      @click="toggleList"
      :class="{
        'bg-primary text-secondary': isActive,
        'justify-between': props.is_spanded,
        'justify-center': !props.is_spanded,
      }"
    >
      <span class="material-symbols-sharp" :class="{ 'mr-3': props.is_spanded }">{{
        props.icon
      }}</span>
      <span v-if="props.is_spanded" class="text-sm font-medium flex-1 truncate">
        {{ props.title }}
      </span>
      <span
        class="material-symbols-outlined text-sm transition-transform"
        :class="{
          'rotate-90': list_is_spanded,
        }"
        v-if="props.is_spanded"
      >
        chevron_right
      </span>
    </div>

    <!-- Dropdown Links -->
    <transition name="submenu">
      <ol v-if="list_is_spanded && props.is_spanded" class="mt-2 space-y-3 mx-5">
        <li v-for="link in props.links" :key="link.name">
          <router-link :to="{ name: link.to }" v-slot="{ isActive }">
            <div
              class="flex items-center px-3 py-2 rounded-md transition duration-300 ease-out bg-gray-100 hover:bg-gray-100 hover:text-black"
              :class="{
                'bg-primary text-secondary': isActive,
              }"
            >
              <span class="material-symbols-outlined mr-3 text-sm">{{ link.icon }}</span>
              <span class="text-sm font-medium">{{ link.name }}</span>
            </div>
          </router-link>
        </li>
      </ol>
    </transition>
  </div>
</template>

<style scoped>
.submenu-enter-active,
.submenu-leave-active {
  transition: all 0.3s ease;
}
.submenu-enter-from,
.submenu-leave-to {
  transform: scaleY(0);
  opacity: 0;
}
.submenu-enter-to,
.submenu-leave-from {
  transform: scaleY(1);
  opacity: 1;
}
</style>
