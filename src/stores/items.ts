import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useItemsStore = defineStore('itemsStore', () => {
  const items = ref([]);

  const addItems = (item: object) => {
    items.value.push(item);
  }

  return { items, addItems }
})
