import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useItemsStore = defineStore('itemsStore', () => {
  const items = ref([]);

  const addItems = () => {
    const emptyItem = {
        id: ((items.value.length > 0) ? (items.value[items.value.length - 1].id + 1) : 1),
        name: '',
        type: '',
        login: '',
        password: ''
    };
    items.value.push(emptyItem);
  }

  const updateItems = (item: object) => {
    items.value.find((obj) => {
        if(obj.id === item.id){
            obj = item;
        }
    });
  }

  const deleteItem = (id: number) => {
    items.value = items.value.filter(item => item.id !== id);
  }

  return { items, addItems, updateItems, deleteItem }
})
