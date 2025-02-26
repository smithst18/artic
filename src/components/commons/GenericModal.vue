<script setup lang="ts">
const props = defineProps<{
  showModal: boolean
}>()
</script>

<template>
  <transition name="modal">
    <div
      v-if="props.showModal"
      class="fixed inset-0 z-[999] h-full w-full bg-black/50 transition-opacity duration-200 ease-in"
      @click="$emit('close-modal')"
    >
      <div class="flex h-full w-full items-center justify-center p-4">
        <div
          class="relative max-w-[50%] overflow-auto rounded-lg bg-secondary p-5 shadow-[0_2px_8px_rgba(0,0,0,0.33)]"
          @click.stop
        >
          <!-- Header modal -->
          <div class="mx-8 mt-5 flex items-center">
            <slot name="header" />
            <button
              class="ml-auto flex h-7 w-7 items-center justify-center hover:opacity-60 cursor-pointer"
              @click="$emit('close-modal')"
            >
              <span class="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

          <!-- Body modal -->
          <div class="mx-8 my-5">
            <slot name="body" />
          </div>

          <!-- Footer modal -->
          <div class="mx-8">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease-in;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
