<script setup lang="ts">
import { ref, computed, defineAsyncComponent } from 'vue'
import SearchingBar from '@/components/commons/SearchBar.vue'
import PaginationBar from '@/components/table/PaginationBar.vue'
import { useMainStore } from '@/stores/mainStore'
import type { TableRow, NestedObject } from '@/interfaces/tableI'

const Button = defineAsyncComponent(() => import('@/components/commons/MainButton.vue'))
const ToolTip = defineAsyncComponent(() => import('@/components/commons/ToolTip.vue'))

const props = defineProps<{
  titles: Array<string>
  data: Array<TableRow>
  elementsPerPage: number
  totalPages: number
  showSearchBar: boolean
  toolTipMsg: string
  updateList: (search: string) => Promise<unknown>
}>()

const emit = defineEmits<{
  (event: 'pickedElement', id: string): void
  (event: 'searchData', search: string): void
  (event: 'buttonAction'): void
  (event: 'getPreviusPage'): void
  (event: 'getNextPage'): void
}>()

const mainStore = useMainStore()
const activeIndex = ref(mainStore.getPage)
const results = computed(() => props.data.length)

const setNextPage = async () => {
  if (mainStore.getPage < mainStore.getTotalPages) {
    activeIndex.value += 1
    mainStore.nextPage()
    await props.updateList(mainStore.getSearch)
  }
}

const setDataPaginations = async (page: number) => {
  activeIndex.value = page
  mainStore.setPage(page)
  await props.updateList(mainStore.getSearch)
}

const setPrevPage = async () => {
  if (mainStore.getPage > 1) {
    activeIndex.value -= 1
    mainStore.prevPage()
    await props.updateList(mainStore.getSearch)
  }
}

const setActiveIndex = (value: number) => (activeIndex.value = value)

const isNestedObject = (prop: string | number | NestedObject): prop is NestedObject => {
  return typeof prop === 'object' && prop !== null
}

const handleSearchData = (value: string) => {
  setActiveIndex(1)
  mainStore.setPage(1)
  emit('searchData', value)
}
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <!-- Head of the table (button and search) -->
    <div class="w-full flex-shrink-0">
      <div class="flex items-center justify-end my-4" v-if="showSearchBar">
        <ToolTip :text="toolTipMsg">
          <Button
            :full-size="false"
            icon="Add"
            title=""
            @doSomething="$emit('buttonAction')"
            class="mr-5"
          >
          </Button>
        </ToolTip>
        <SearchingBar @on-search-data="handleSearchData" class="" />
      </div>
    </div>

    <!-- Table body with scroll -->
    <div class="w-full flex-grow overflow-auto">
      <table class="table-fixed w-full text-sm relative">
        <!-- TITLES FOR TABLE DATA -->
        <thead class="sticky top-0 drop-shadow-sm shadow-sm">
          <tr>
            <th
              class="p-8 bg-secondary text-sm font-semibold tracking-wide uppercase text-left text-third-light"
              v-for="title in titles"
              :key="title"
            >
              {{ title }}
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="elm in data"
            :key="elm.id"
            class="odd:bg-secondary/80 odd:text-third-light even:bg-secondary/80 even:text-third-light cursor-pointer [&:nth-child(odd)]:hover:text-primary-light [&:nth-child(even)]:hover:text-primary-light hover:font-bold border border-x-0 border-slate-200"
          >
            <td
              v-for="(property, propertyName, index) in elm"
              :key="index"
              class="text-sm capitalize text-left whitespace-nowrap overflow-x-auto [&::-webkit-scrollbar]:hidden"
              @click="emit('pickedElement', elm.id.toString())"
            >
              <p class="p-8" v-if="isNestedObject(property) && property.name">
                {{ property.name }}
              </p>
              <p class="p-8" v-else>
                {{ property }}
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination Bar -->
    <div class="w-full h-20 flex-shrink-0 mt-auto" v-if="mainStore.showPagination">
      <PaginationBar
        class="w-full h-full"
        :totalpages="mainStore.getTotalPages"
        :visible-pages="10"
        :elementsPerPage="props.elementsPerPage"
        :results="results"
        :total-results="mainStore.getTotalResults"
        :active-index="activeIndex"
        @dataPagination="setDataPaginations($event)"
        @prevPage="setPrevPage"
        @nextPage="setNextPage"
      />
    </div>
  </div>
</template>

<style scoped></style>
