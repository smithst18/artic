<script lang="ts" setup>
import { ref } from 'vue'
import SidebarDropdown from '@/components/sidebar/DropDown.vue'
import userCard from '../commons/userCard.vue'

const emits = defineEmits<{
  (event: 'OnToggleSidebar', is_spanded: boolean): void
}>()

const is_spanded = ref(false)

const ticketLinks = [
  { to: 'dashboard', name: 'Inicio', icon: 'home' },
  { to: 'pending', name: 'Gestion', icon: 'fact_check' },
]
const mailLinks = [
  { to: 'imbox', name: 'Inbox', icon: 'inbox' },
  { to: 'favorite', name: 'Favoritos', icon: 'star' },
  { to: 'sended', name: 'Enviados', icon: 'send' },
  { to: 'clip', name: 'Borradores', icon: 'description' },
  { to: 'spam', name: 'spam', icon: 'info' },
  { to: 'deleted', name: 'Papelera', icon: 'delete' },
]

const adminLinks = [
  { to: 'signin', name: 'Registro', icon: 'person_add' },
  { to: 'management', name: 'Gestion', icon: 'manage_accounts' },
]

const toggleMenu = () => {
  is_spanded.value = !is_spanded.value
  emits('OnToggleSidebar', is_spanded.value)
}
const spandDropdown = () => {
  if (!is_spanded.value) toggleMenu()
}
</script>

<template>
  <aside
    :class="[
      'bg-secondary flex flex-col relative p-4 text-gray-500 transition-[width] duration-300 ease-out',
      is_spanded ? 'w-80' : 'w-24',
      'md:fixed md:z-50 md:min-h-screen',
    ]"
  >
    <!-- Logotype -->
    <div class="max-w-sm" :class="is_spanded ? 'block' : 'hidden'">
      <img alt="SGTI_LOGO" src="@/assets/imgs/Logo-con-fondo.webp" />
    </div>
    <div class="mx-0 px-0" :class="!is_spanded ? 'block' : 'hidden'">
      <img alt="SGTI_LOGO" src="@/assets/imgs/sidebarminilogoazul.webp" />
    </div>

    <!-- Toggle button -->
    <button
      class="absolute w-6 h-6 -right-3 top-20 z-50 shadow-md rounded-full material-symbols-outlined text-lg transition-transform duration-300 bg-primary text-secondary hover:-translate-x-1 cursor-pointer"
      @click="toggleMenu"
      :class="is_spanded ? 'rotate-180' : 'rotate-0'"
    >
      chevron_right
    </button>

    <!-- Menu options -->
    <div class="menu max-h-[65%] overflow-y-auto mt-16" :class="is_spanded ? 'px-4' : 'px-0'">
      <SidebarDropdown
        title="Tickets"
        icon="local_activity"
        :links="ticketLinks"
        :is_spanded="is_spanded"
        @in-focus="spandDropdown"
      />
      <SidebarDropdown
        title="Mail"
        icon="mail"
        :links="mailLinks"
        :is_spanded="is_spanded"
        @in-focus="spandDropdown"
      />
      <SidebarDropdown
        title="Gestion"
        icon="manage_accounts"
        :links="adminLinks"
        :is_spanded="is_spanded"
        @in-focus="spandDropdown"
      />
    </div>

    <!-- User config -->
    <div class="flex mt-auto mb-5">
      <userCard :is_spanded="is_spanded" class="cursor-pointer" />
    </div>
  </aside>
</template>

<style lang="css">
.menu::-webkit-scrollbar {
  display: none;
}
</style>
