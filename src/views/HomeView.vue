<script setup lang="ts">
  import { useItemsStore } from '../stores/items'
  import item from '@/components/item.vue';
  const itemsStore = useItemsStore();
  itemsStore.getItems();
</script>

<template>
  <main>
    <w-flex wrap class="text-left">
      <div class="xs2 pa1"></div>
      <div class="xs8 pa1">
        <div class="py3">
          <div class="text-left title2">
            Учетные записи 
            <w-button 
              class="ma1" 
              color="primary" 
              outline 
              xl
              @click="itemsStore.addItems()"
            >+</w-button>
          </div>
          <w-alert class="text-left">
            <i class="fa fa-question-circle-o" aria-hidden="true"></i> Для указаниея нескольких меток для одной пары логин\пароль используйте разделитель ;
          </w-alert>
          <w-flex wrap class="wrapper grey-light3" gap="2">
            <div class="box xs3">Метка</div>
            <div class="box xs2">Тип записи</div>
            <div class="box xs2">Логин</div>
            <div class="box xs2">Пароль</div>
            <div class="box xs1"></div>
          </w-flex>     

          <item
            v-for="item in itemsStore.items"
            :key="item"
            :item="item"
          />

        </div>
      </div>
      <div class="xs2 pa1"></div>
    </w-flex>
  </main>
</template>

<style scoped>

</style>
