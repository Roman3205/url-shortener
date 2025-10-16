<template>
    <div class="card flex justify-between">
        <div class="flex flex-col gap-1">
            <NuxtLink :to="`/dashboard/${link.shortKey}`" class="text-amber-500 font-bold text-2xl cursor-pointer">{{ link.shortKey }}</NuxtLink>
            <span class="text-sm text-white/40">{{ link.longUrl }} </span>
        </div>
        <div class="flex gap-5 items-center">
            <UIcon name="i-heroicons-arrow-trending-up" />
            <div class="text-xl">
                {{ link.totalClicks }}
            </div>
            <UButton @click="handleCopy" leading-icon="i-lucide-copy" class="p-4" />
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    link: {
        shortKey: string;
        longUrl: string;
        id: number;
        totalClicks: number;
    }
}>()

const toast = useToast()
const config = useRuntimeConfig()
const handleCopy = () => {
    navigator.clipboard.writeText(`${config.public.appUrl}/${props.link.shortKey}`)
    toast.add({title: 'Success', description: 'You have copied the link', color: 'info'})
}
</script>

<style>

</style>