<script setup lang="ts">
import { Notivue, Notification, NotificationProgress } from 'notivue'
</script>

<template>
  <div class="w-screen h-screen">
    <!-- Notivue -->
    <Notivue v-slot="item">
      <Notification :item="item">
        <NotificationProgress :item="item" />
      </Notification>
    </Notivue>
    <RouterView />
  </div>
</template>

<style scoped></style>
