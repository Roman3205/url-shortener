<template>
    <div class="card flex justify-between">
        <div class="flex flex-col gap-1">
            <span class="text-amber-500 font-bold text-2xl">{{ link.shortKey }}</span>
            <span class="text-sm text-white-40">{{ link.longUrl }}</span>
        </div>
        <UButton leading-icon="i-lucide-trash-2" class="px-4" />
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    link: {
        shortKey: string;
        longUrl: string;
        id: string;
    }
}>()
</script>

<style>

</style>