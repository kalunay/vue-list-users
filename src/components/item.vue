<script setup lang="ts">
    import { ref } from 'vue';
    import { useItemsStore } from '@/stores/items'

    interface Props {
        item: object
    }

    const props = defineProps<Props>();

    const itemsStore = useItemsStore();

    const items = [
        { 'label': 'LDAP' },
        { 'label': 'Локальная' }
    ];

    const errors = ref([]);

    const saveAndValidate = () => {
        errors.value = [];
        if(props.item.name.length > 50) {
            errors.value.push('name');
        }
        if(props.item.login.length < 3 || props.item.login.length > 100) {
            errors.value.push('login');
        }
        if((props.item.password.length < 3 || props.item.password.length > 100) && props.item.type === 'Локальная') {
            errors.value.push('password');
        }

        if(errors.value.length === 0) {
            itemsStore.updateItems(props.item);
        }
    }
</script>

<template>
    <w-grid columns="5" class="wrapper items mt3" gap="2">
        <div class="box">
            <w-input
                outline
                v-model="item.name"
                :class="{error : errors.includes('name')}"
                @change="saveAndValidate"
            >
            </w-input>
        </div>
        <div class="box">
            <w-select
                :items="items"
                outline
                v-model="item.type"
                @item-click="saveAndValidate"
                tile>
            </w-select>
        </div>
        <div class="box">
            <w-input
                outline
                v-model="item.login"
                @change="saveAndValidate"
                :class="{error : errors.includes('login')}"
            >
            </w-input>
        </div>
        <div class="box">
            <w-input
                type="password"
                outline
                v-model="item.password"
                @change="saveAndValidate"
                :class="{error : errors.includes('password')}"
            >
            </w-input>
        </div>
        <div class="box">
            <i 
                class="fa fa-trash-o" 
                aria-hidden="true"
                @click="itemsStore.deleteItem(item.id)"
            ></i>
        </div>
    </w-grid>          
</template>

<style>
    .items {
        align-items: baseline;
    }
    .w-select__selection {
        min-height: 10px !important;
        border-radius: 4px;
    }
    .error input {
        border: #f00 solid 1px;
    }
</style>