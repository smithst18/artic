<script setup lang="ts">
import { ref } from 'vue'
import SideBar from '../components/sidebar/SideBar.vue'

const isSidebarSpanded = ref(false)

const handleToggleSidebar = (is_spanded: boolean) => {
  isSidebarSpanded.value = is_spanded
}
</script>

<template>
  <main class="w-full h-full flex" id="home">
    <!--sidebard-->
    <SideBar class="shadow-md" @OnToggleSidebar="handleToggleSidebar" />

    <!--routerview desde aca se controlan los margenes generales  para todas las vistas con el md:p-6 marcando un p-6 desde vistas de tableta en adelante-->
    <div
      class="router-views md:px-6 md:ml-auto transition-[width] duration-300 ease-out"
      :style="{ width: `calc(100% - ${isSidebarSpanded ? '20rem' : '6rem'} )` }"
    >
      <router-view />
    </div>
  </main>
</template>

<style>
/* permite la vista de la barra en el responsive
.router-views{
  @media (max-width:768px){
    padding-left: 5rem;
  }
} */
</style>
