<script setup lang="ts">
import { defineAsyncComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const NavbarComponent = defineAsyncComponent(() => import('@/components/navbar/NavBar.vue'))
const SearchingBar = defineAsyncComponent(() => import('@/components/commons/SearchBar.vue'))
const AddButton = defineAsyncComponent(() => import('@/components/commons/MainButton.vue'))
const router = useRouter()
const searchData = (value: string) => {
  console.log(value)
}
onMounted(() => {
  // a tener en cuenta de esta manera no tenemos los params en tiempo real IMPORTANTE
  router.push({ name: 'userList', params: { type: 'tech' } })
})
</script>

<template>
  <div class="w-full h-full">
    <div class="h-1/5 pt-8">
      <h1 class="text-2xl h-2/4">Personal</h1>
      <div class="h-2/4">
        <NavbarComponent
          class="pl-5 border-b-2 h-full"
          :routParams="[
            { title: 'usuarios', name: 'userList', notifications: 0, type: 'client' },
            { title: 'tecnicos', name: 'userList', notifications: 0, type: 'tech' },
          ]"
        >
          <template v-slot:extra-element>
            <div class="flex items-center">
              <SearchingBar class="mr-5" @on-search-data="searchData" />
              <AddButton
                :full-size="false"
                title="Añadir"
                icon="person_add"
                @click="$router.push({ name: 'signin' })"
              />
            </div>
          </template>
        </NavbarComponent>
      </div>
    </div>
    <!-- this is the main content of the page -->
    <div class="h-3/4 mt-5">
      <router-view />
    </div>
  </div>
</template>

<style scoped lang="css"></style>
