import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { SideMenuItem } from 'src/entities/models/SideMenuItem'

export const useSideMenuStore = defineStore('sideMenu', () => {
  const items = ref<SideMenuItem[]>([
    { label: 'sideMenu.beep', icon: 'music_note', route: '/beep-page' }
  ])

  const getItems = computed(() => items.value)

  function addItem(item: SideMenuItem) {
    items.value.push(item)
  }

  function removeItem(label: string) {
    items.value = items.value.filter(i => i.label !== label)
  }

  return {
    items,
    getItems,
    addItem,
    removeItem
  }
})
