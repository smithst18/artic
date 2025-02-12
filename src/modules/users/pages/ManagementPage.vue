<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref, computed, onUpdated } from 'vue'
import { useRoute } from 'vue-router'
import { useDataTable } from '@/composables/useDataTble'

const ManagUserCard = defineAsyncComponent(
  () => import('@/modules/users/components/TableUserCard.vue'),
)
const TableuserHead = defineAsyncComponent(
  () => import('@/modules/users/components/TableuserHead.vue'),
)
const PaginationBar = defineAsyncComponent(() => import('@/components/table/PaginationBar.vue'))
const UpdateUserModal = defineAsyncComponent(() => import('@/components/commons/GenericModal.vue'))

const users = [
  {
    icono: 'ruta/al/icono',
    name: 'nombre',
    entity: 'administracion',
    rol: 'tecnico',
    conection: 'fecha aleatoria',
  },
  {
    icono: 'ruta/al/icono',
    name: 'nombre',
    entity: 'administracion',
    rol: 'tecnico',
    conection: 'fecha aleatoria',
  },
  {
    icono: 'ruta/al/icono',
    name: 'nombre',
    entity: 'administracion',
    rol: 'tecnico',
    conection: 'fecha aleatoria',
  },
  {
    icono: 'ruta/al/icono',
    name: 'nombre',
    entity: 'administracion',
    rol: 'tecnico',
    conection: 'fecha aleatoria',
  },
  {
    icono: 'ruta/al/icono',
    name: 'nombre',
    entity: 'administracion',
    rol: 'administrador',
    conection: 'fecha aleatoria',
  },
  {
    icono: 'ruta/al/icono',
    name: 'nombre',
    entity: 'administracion',
    rol: 'tecnico',
    conection: 'fecha aleatoria',
  },
  {
    icono: 'ruta/al/icono',
    name: 'nombre',
    entity: 'administracion',
    rol: 'tecnico',
    conection: 'fecha aleatoria',
  },
  {
    icono: 'ruta/al/icono',
    name: 'nombre',
    entity: 'administracion',
    rol: 'tecnico',
    conection: 'fecha aleatoria',
  },
  {
    icono: 'ruta/al/icono',
    name: 'nombre',
    entity: 'administracion',
    rol: 'tecnico',
    conection: 'fecha aleatoria',
  },
  {
    icono: 'ruta/al/icono',
    name: 'nombre',
    entity: 'administracion',
    rol: 'tecnico',
    conection: 'fecha aleatoria',
  },
  {
    icono: 'ruta/al/icono',
    name: 'nombre',
    entity: 'administracion',
    rol: 'tecnico',
    conection: 'fecha aleatoria',
  },
  {
    icono: 'ruta/al/icono',
    name: 'nombre',
    entity: 'administracion',
    rol: 'tecnico',
    conection: 'fecha aleatoria',
  },
  {
    icono: 'ruta/al/icono',
    name: 'nombre',
    entity: 'administracion',
    rol: 'tecnico',
    conection: 'fecha aleatoria',
  },
  {
    icono: 'ruta/al/icono',
    name: 'nombre',
    entity: 'administracion',
    rol: 'tecnico',
    conection: 'fecha aleatoria',
  },
  {
    icono: 'ruta/al/icono',
    name: 'nombre',
    entity: 'administracion',
    rol: 'tecnico',
    conection: 'fecha aleatoria',
  },
  {
    icono: 'ruta/al/icono',
    name: 'nombre',
    entity: 'administracion',
    rol: 'tecnico',
    conection: 'fecha aleatoria',
  },
  {
    icono: 'ruta/al/icono',
    name: 'nombre',
    entity: 'administracion',
    rol: 'tecnico',
    conection: 'fecha aleatoria',
  },
  {
    icono: 'ruta/al/icono',
    name: 'nombre',
    entity: 'administracion',
    rol: 'tecnico',
    conection: 'fecha aleatoria',
  },
  {
    icono: 'ruta/al/icono',
    name: 'nombre',
    entity: 'administracion',
    rol: 'tecnico',
    conection: 'fecha aleatoria',
  },
  {
    icono: 'ruta/al/icono',
    name: 'nombre',
    entity: 'administracion',
    rol: 'tecnico',
    conection: 'fecha aleatoria',
  },
  {
    icono: 'ruta/al/icono',
    name: 'nombre',
    entity: 'administracion',
    rol: 'tecnico',
    conection: 'fecha aleatoria',
  },
  {
    icono: 'ruta/al/icono',
    name: 'nombre',
    entity: 'administracion',
    rol: 'tecnico',
    conection: 'fecha aleatoria',
  },
  {
    icono: 'ruta/al/icono',
    name: 'nombre',
    entity: 'administracion',
    rol: 'tecnico',
    conection: 'fecha aleatoria',
  },
  {
    icono: 'ruta/al/icono',
    name: 'nombre',
    entity: 'administracion',
    rol: 'tecnico',
    conection: 'fecha aleatoria',
  },
  {
    icono: 'ruta/al/icono',
    name: 'nombre',
    entity: 'administracion',
    rol: 'tecnico',
    conection: 'fecha aleatoria',
  },
  {
    icono: 'ruta/al/icono',
    name: 'nombre',
    entity: 'administracion',
    rol: 'tecnico',
    conection: 'fecha aleatoria',
  },
  {
    icono: 'ruta/al/icono',
    name: 'nombre',
    entity: 'administracion',
    rol: 'tecnico',
    conection: 'fecha aleatoria',
  },
  {
    icono: 'ruta/al/icono',
    name: 'nombre',
    entity: 'administracion',
    rol: 'tecnico',
    conection: 'fecha aleatoria',
  },
  {
    icono: 'ruta/al/icono',
    name: 'nombre',
    entity: 'administracion',
    rol: 'tecnico',
    conection: 'fecha aleatoria',
  },
  {
    icono: 'ruta/al/icono',
    name: 'nombre',
    entity: 'administracion',
    rol: 'tecnico',
    conection: 'fecha aleatoria',
  },
  {
    icono: 'ruta/al/icono',
    name: 'nombre',
    entity: 'administracion',
    rol: 'tecnico',
    conection: 'fecha aleatoria',
  },
  {
    icono: 'ruta/al/icono',
    name: 'nombre',
    entity: 'administracion',
    rol: 'tecnico',
    conection: 'fecha aleatoria',
  },
  {
    icono: 'ruta/al/icono',
    name: 'nombre',
    entity: 'administracion',
    rol: 'tecnico',
    conection: 'fecha aleatoria',
  },
]
const {
  paginatedData,
  pages,
  actualPage,
  visiblePages,
  getDataPagination,
  getPreviusPage,
  getNextPage,
} = useDataTable(users, 10)

const rout = useRoute()
//this const is for get the type of user that we are going to show
const userType = computed(() => rout.params.type)
// const results =  computed(() => 40 /** tama;o dela rray de data */);
const showModal = ref(false)
onMounted(() => {
  getDataPagination(actualPage.value)
})
onUpdated(() => {
  console.log(userType.value)
})
</script>

<template>
  <div class="w-full h-full">
    <!--INFORMATION INDEX FOR USER TABLE-->
    <TableuserHead />
    <!-- LOOP FOR USERS DATA-->
    <div class="w-full h-[70%] overflow-y-auto scrollbar-hidden">
      <div v-for="elm in paginatedData" :key="elm">
        <ManagUserCard
          rol="tecnico"
          class="hover:bg-primary-light hover:cursor-pointer"
          @click="showModal = true"
        />
      </div>
    </div>
    <div class="h-[15%] w-full border">
      <PaginationBar
        class="w-full h-full border px-2"
        :pages="pages"
        :visible-pages="visiblePages"
        :elementsPerPage="10"
        :results="users.length"
        @dataPagination="getDataPagination"
        @prevPage="getPreviusPage"
        @nextPage="getNextPage"
      />
    </div>

    <!-- mODAL FOR USER UPDATES -->
    <Teleport to="body">
      <!-- use the modal component, pass in the prop -->
      <UpdateUserModal :show-modal="showModal" @close-modal="showModal = false">
        <template #header>
          <h3 class="mr-3">Modificacion de usuario Existente</h3>
        </template>
        <template #body>
          <h3>Aqui va el formulario</h3>
        </template>
        <template #footer>
          <h3 class="text-">Mensaje de Guardado</h3>
        </template>
      </UpdateUserModal>
    </Teleport>
  </div>
</template>

<style scoped lang="css">
/* .scrollbar-hidden::-webkit-scrollbar {
  display: none;
} */
</style>
