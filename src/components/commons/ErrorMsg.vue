<script setup lang="ts">
const props = defineProps<{
  err?: string
}>()
</script>

<template>
  <div class="text-red-400 text-xs ml-3 mt-1" v-if="props.err">
    {{ props.err }}
  </div>
</template>

<style scoped lang="scss"></style>
