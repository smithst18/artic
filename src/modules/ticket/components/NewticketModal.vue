<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useModal } from '@/composables/useModal'
import { useForm } from 'vee-validate'
const TicketModal = defineAsyncComponent(() => import('@/components/commons/GenericModal.vue'))
const BaseButton = defineAsyncComponent(() => import('@/components/commons/MainButton.vue'))
const props = defineProps<{
  show: boolean
}>()
const { showModal, toggleModal } = useModal(false)
const { values, defineInputBinds, errors, handleSubmit } = useForm()

const title = defineInputBinds('title')
const description = defineInputBinds('description')
const type = defineInputBinds('type')

const onSubmit = handleSubmit((values) => {
  console.log(values)
})
</script>

<template>
  <TicketModal :show-modal="showModal" @close-modal="toggleModal">
    <template #header>
      <div class="flex items-center justify-center w-full h-10 mx-5">
        <div class="w-8 h-9">
          <img
            alt="SGTI_LOGO"
            id="logo"
            src="@/assets/imgs/sidebarminilogoazul.webp"
            class="w-full h-full"
          />
        </div>
        <div class="ml-3 text-xl">
          <h5>Generar ticket nuevo</h5>
        </div>
      </div>
    </template>
    <template #body>
      <div>
        <form action="" class="mx-5 p-5 flex flex-col w-96">
          <div class="relative z-0 w-full mb-10">
            <input
              type="text"
              name="title"
              required
              placeholder=" "
              class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-primary border-gray-200"
            />
            <label for="name" class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
              >Problema</label
            >
          </div>
          <div class="relative z-0 w-full mb-10">
            <select
              name="type"
              required
              placeholder=" "
              class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-primary border-gray-200"
            >
              <option value="value1">Software</option>
              <option value="value2">Hardware</option>
              <option value="value3">Redes</option>
            </select>
            <label for="name" class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
              >Tipo de Problema</label
            >
          </div>
          <div class="relative z-0 w-full mb-10">
            <textarea
              name="description"
              required
              placeholder=" "
              class="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-primary border-gray-200 max-h-32"
            ></textarea>
            <label for="name" class="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
              >Descripcion del problema</label
            >
          </div>
          <div class="flex">
            <BaseButton
              class="bg-red-500 hover:bg-red-300 transition ease-in-out delay-75 active:bg-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 w-24"
              title="Cancelar"
              :fullSize="false"
            />
            <BaseButton class="ml-auto w-24" title="Aceptar" :fullSize="false" @click="onSubmit" />
          </div>
        </form>
      </div>
    </template>
    <template #footer>
      <div class="mx-10 text-center">
        <span class="text-xs">Se le atendera su caso a la brevedad</span>
      </div>
    </template>
  </TicketModal>
</template>

<style scoped lang="css"></style>
