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
      items.value = JSON.parse(itemsOnLocalStorage);
      items.value.map((item) => {
          item.name = formatName(item.name);
      });
  }

  const itemsOnLocalStorage = localStorage.getItem("items");
  if(itemsOnLocalStorage) getItems();  

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

  // обновляем
  const updateItems = (item: object) => {
    console.log(item);
    items.value.find((obj) => {
        if(obj.id === item.id){
            const arr = [];
            item.name.split(';').map((item) => {
                arr.push({'text': item});
            });
            obj.id = item.id;
            obj.name = arr;
            obj.type = item.type;
            obj.login = item.login;
            obj.password = item.password;
        }
    });
    localStorage.setItem('items', JSON.stringify(items.value));
  }

  // удаляем
  const deleteItem = (id: number) => {
    items.value = items.value.filter(item => item.id !== id);
    localStorage.setItem('items', JSON.stringify(items.value));
  }

  watch(() => items, (state) => {
    getItems();
  }, {deep: true});

  return { items, addItems, updateItems, deleteItem }
})
