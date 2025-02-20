<script setup lang="ts">
import { defineAsyncComponent, computed, onUpdated, ref } from 'vue'
import { useModal } from '@/composables/useModal.ts'
import { useRoute } from 'vue-router'

const GenericModal = defineAsyncComponent(() => import('@/components/commons/GenericModal.vue'))
const UserList = defineAsyncComponent(() => import('@/modules/users/components/userList.vue'))
const UpdateForm = defineAsyncComponent(() => import('@/modules/users/components/updateForm.vue'))

//this const is for get the type of user that we are going to show
const { showModal, toggleModal } = useModal(false)
const rout = useRoute()

const userType = computed(() => rout.params.type)
const userId = ref<string>('')

const updateUser = (event: string) => {
  toggleModal()
  console.log(event)
  userId.value = event
}
onUpdated(() => {})
</script>

<template>
  <div class="w-full h-full">
    <UserList :user-type="userType" @picked-user="updateUser" />
    <GenericModal :show-modal="showModal" @close-modal="toggleModal">
      <template v-slot:header>
        <h1 class="text-xl">Actualizacion de datos</h1>
      </template>
      <template v-slot:body>
        <UpdateForm :id="userId" class="mt-20" />
      </template>
    </GenericModal>
  </div>
</template>

<style scoped lang="css"></style>
