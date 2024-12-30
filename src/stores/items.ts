import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

export const useItemsStore = defineStore('itemsStore', () => {
  const items = ref([]);

  // форматируем имя опять с троку
  const formatName = (name: Array) => {
    let arr = [];
    if(name instanceof Array){
        name.map((obj) => {
            arr.push(obj.text);
        })
    }
    return arr.join(';');
  }

  // получаем список
  const getItems = () => {
      const itemsOnLocalStorage = localStorage.getItem("items");
      items.value = JSON.parse(itemsOnLocalStorage);
      items.value.map((item) => {
          item.name = formatName(item.name);
      });
  }

  // добавляем пустой элемент
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

  const nameToObject = (name: string) => {
    const arr = [];    
    name.split(';').map((item) => {
        arr.push({'text': item});
    });
    return arr;
  }

  // обновляем
  const updateItems = (item: object) => {
    items.value.find((obj) => {
        if(obj.id === item.id){
            obj.id = item.id;
            obj.name = nameToObject(item.name);
            obj.type = item.type;
            obj.login = item.login;
            obj.password = item.password;
        } else {
            obj.name = nameToObject(obj.name);
        }
    });
    localStorage.setItem('items', JSON.stringify(items.value));
    getItems();
  }

  // удаляем
  const deleteItem = (id: number) => {
    items.value = items.value.filter(item => item.id !== id);
    localStorage.setItem('items', JSON.stringify(items.value));
    getItems();
  }

  return { items, addItems, updateItems, deleteItem, getItems }
})
