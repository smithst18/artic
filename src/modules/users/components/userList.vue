<script setup lang="ts">
import { onUnmounted, ref, watch } from 'vue'
import { useMainStore } from '@/stores/mainStore'
import { defineAsyncComponent, onMounted } from 'vue'
import { useUserStore } from '../store/userStore'

const props = defineProps<{
  userType: string
}>()

const userStore = useUserStore()

const mainStore = useMainStore()

const UserTable = defineAsyncComponent(() => import('@/components/table/DataTable.vue'))

const titles = ref(['ID', 'nombre', 'cedula', 'role', 'Departamento', 'Cargo'])

//este watcher setea la db en base a prop de la ruta
watch(
  () => props.userType,
  async (newType: string) => {
    if (newType) {
      userStore.setListFilter(newType)
      await userStore.setUserList()
    }
  },
  { immediate: true },
)

onMounted(async () => {
  userStore.setListFilter(props.userType)
  await userStore.setUserList()
})

onUnmounted(() => {
  userStore.$reset()
  mainStore.$resetPaginator()
})
</script>

<template>
  <div class="w-full h-full shadow-md">
    <UserTable
      v-if="userStore.getUserList.length > 0"
      :data="userStore.getUserList"
      :elements-per-page="mainStore.getPerPages"
      :show-search-bar="false"
      :titles="titles"
      :total-pages="mainStore.getTotalPages"
      :update-list="userStore.setUserList"
      tool-tip-msg="crear usuario"
      @picked-element="$emit('pickedUser', $event)"
    />
    <!--SKELETTON FOR USER TABLE-->
    <div v-else>
      <p>hola</p>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
