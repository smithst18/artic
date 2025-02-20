<script setup lang="ts">
import { onUnmounted, onUpdated, ref } from 'vue'
import { useMainStore } from '@/stores/mainStore'
import { defineAsyncComponent, onMounted } from 'vue'
import { useUserStore } from '../store/userStore'

const props = defineProps<{
  userType: string | string[]
}>()

const userStore = useUserStore()

const mainStore = useMainStore()

const UserTable = defineAsyncComponent(() => import('@/components/table/DataTable.vue'))

const titles = ref(['ID', 'nombre', 'cedula', 'role', 'Departamento', 'Cargo'])

onMounted(async () => {
  console.log(props.userType)
  await userStore.setUserList()
})
onUpdated(() => {
  console.log(props.userType)
})
onUnmounted(() => {
  userStore.$reset()
  mainStore.$resetPaginator()
})
</script>

<template>
  <div class="w-full h-full shadow-md">
    <UserTable
      :data="userStore.getUserList"
      :elements-per-page="mainStore.getPerPages"
      :show-search-bar="false"
      :titles="titles"
      :total-pages="mainStore.getTotalPages"
      :update-list="userStore.setUserList"
      tool-tip-msg="crear usuario"
      @picked-element="$emit('pickedUser', $event)"
    />
  </div>
</template>

<style scoped lang="scss"></style>
