<template>
  <q-list>
    <q-item v-for="item in items" :key="item.label" clickable :to="item.route">
      <q-item-section v-if="item.icon" avatar>
        <q-icon :name="item.icon" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ tLabel(item.label) }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSideMenuStore } from 'stores/sideMenu'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const store = useSideMenuStore()
const items = computed(() => store.getItems)

function tLabel(label: string) {
  // if label looks like a translation key (contains a dot), try translating
  if (label.includes('.')) {
    return t(label as any)
  }
  return label
}
</script>
