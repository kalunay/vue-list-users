<script setup lang="ts">
    const items = [
        {
            'label': 'LDAP'
        },
        {
            'label': 'Локальная'
        }
    ];
</script>

<template>
    <w-grid columns="5" class="wrapper items mt3" gap="2">
        <div class="box">
            <w-input
                outline>
            </w-input>
        </div>
        <div class="box">
            <w-select
                :items="items"
                outline
                tile>
            </w-select>
        </div>
        <div class="box">
            <w-input
                outline>
            </w-input>
        </div>
        <div class="box">
            <w-input
                type="password"
                outline>
            </w-input>
        </div>
        <div class="box">
            <i class="fa fa-trash-o" aria-hidden="true"></i>
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
</style>