<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'

defineProps<{
  text: string
}>()

const visible = ref(false)
const tooltipRef = ref<HTMLElement | null>(null)
const position = ref('bottom')

const showTooltip = () => {
  visible.value = true
  nextTick(() => {
    adjustTooltipPosition()
  })
}

const hideTooltip = () => {
  visible.value = false
}

const adjustTooltipPosition = () => {
  if (!tooltipRef.value) return

  const tooltipRect = tooltipRef.value.getBoundingClientRect()
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight

  // Detectar espacio disponible en ambos lados
  if (tooltipRect.right > windowWidth) {
    position.value = 'left'
  } else if (tooltipRect.left < 0) {
    position.value = 'right'
  } else if (tooltipRect.bottom > windowHeight) {
    position.value = 'top'
  } else {
    position.value = 'bottom'
  }
}

onMounted(() => {
  nextTick(() => {
    adjustTooltipPosition()
  })
})
</script>

<template>
  <div class="relative inline-block" @mouseenter="showTooltip" @mouseleave="hideTooltip">
    <slot></slot>
    <transition name="fade">
      <div
        v-if="visible"
        ref="tooltipRef"
        :class="['tooltip', position]"
        class="absolute p-3 text-sm bg-primary text-white rounded shadow-lg z-50 max-w-[280px] min-w-[150px] whitespace-normal break-words text-center transition-all duration-200"
      >
        {{ text }}
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* Transiciones mejoradas */
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(5px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(5px);
}

/* Posiciones con ajustes responsivos */
.tooltip {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.tooltip.bottom {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 10px;
}

.tooltip.top {
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 10px;
}

.tooltip.left {
  top: 50%;
  right: 100%;
  transform: translateY(-50%);
  margin-right: 10px;
}

.tooltip.right {
  top: 50%;
  left: 100%;
  transform: translateY(-50%);
  margin-left: 10px;
}

/* Flecha mejorada */
.tooltip::before {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border: 6px solid transparent;
}

.tooltip.bottom::before {
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-top-color: #0d6efd;
}

.tooltip.top::before {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-bottom-color: #0d6efd;
}

.tooltip.left::before {
  top: 50%;
  right: 100%;
  transform: translateY(-50%);
  border-right-color: #0d6efd;
}

.tooltip.right::before {
  top: 50%;
  left: 100%;
  transform: translateY(-50%);
  border-left-color: #0d6efd;
}
</style>
