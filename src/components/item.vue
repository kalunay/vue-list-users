<script setup lang="ts">
    import { computed, ref } from 'vue';
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
    <w-flex wrap class="items mt3" gap="2">
        <div class="box xs3">
            <w-input
                outline
                v-model="item.name"
                :class="{error : errors.includes('name')}"
                @change="saveAndValidate"
            >
            </w-input>
        </div>
        <div class="box xs2">
            <w-select
                :items="items"
                outline
                v-model="item.type"
                @item-click="saveAndValidate"
                tile>
            </w-select>
        </div>
        <div 
            class="box xs2"
            :class="{'width2' : item.type === 'LDAP'}"
        >
            <w-input
                outline
                v-model="item.login"
                @change="saveAndValidate"
                :class="{error : errors.includes('login')}"
            >
            </w-input>
        </div>
        <div 
            class="box xs2"
            v-if="item.type !== 'LDAP'"
        >
            <w-input
                type="password"
                outline
                v-model="item.password"
                @change="saveAndValidate"
                :class="{error : errors.includes('password')}"
            >
            </w-input>
        </div>
        <div class="box xs1">
            <i 
                class="fa fa-trash-o" 
                aria-hidden="true"
                @click="itemsStore.deleteItem(item.id)"
            ></i>
        </div>
    </w-flex>          
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
    .width2 {
        width: 34.5% !important;
    }
</style>