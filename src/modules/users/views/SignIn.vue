<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
const submitButton = defineAsyncComponent(() => import('@/components/commons/MainButton.vue'))
</script>

<template>
  <div class="w-full h-full flex items-center justify-center">
    <div class="w-3/4 p-5 rounded-md shadow-md">
      <h1 class="text-2xl font-semibold text-center my-5">Nuevo usuario</h1>
      <form action="" class="p-5 grid grid-cols-2 gap-x-9 w-full">
        <div class="relative z-0 w-full mb-10">
          <input type="text" name="title" required placeholder="" />
          <label for="name" class="origin-0">Problema</label>
        </div>
        <div class="relative z-0 w-full mb-10">
          <input type="text" name="title" required placeholder="" />
          <label for="name" class="origin-0">Problema</label>
        </div>
        <div class="relative z-0 w-full mb-10">
          <input type="text" name="title" required placeholder="" />
          <label for="name" class="origin-0">Problema</label>
        </div>
        <div class="relative z-0 w-full mb-10">
          <input type="text" name="title" required placeholder="" />
          <label for="name" class="origin-0">Problema</label>
        </div>
        <div class="relative z-0 w-full mb-10">
          <input type="text" name="title" required placeholder="" />
          <label for="name" class="origin-0">Problema</label>
        </div>
        <div class="relative z-0 w-full mb-10">
          <input type="text" name="title" required placeholder="" />
          <label for="name" class="origin-0">Problema</label>
        </div>
      </form>
      <div class="w-[96%] mx-auto">
        <submitButton :full-size="true" title="Agregar" class="text-center mb-5" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="css"></style>
