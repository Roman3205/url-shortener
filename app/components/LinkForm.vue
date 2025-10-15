<template>
    <div class="card">
        <UForm class="w-full flex gap-5 items-end" @submit="handleLinkForm">
            <UFormField label="Long URL" name="url" class="w-5/12" :ui="{label: 'text-white/80'}">
                <UInput v-model="form.long_url" type="text" name="url" id="url" class="w-full" placeholder="Paste or enter long URL" :ui="{base: 'text-lg text-white/80'}" variant="none" highlight />
            </UFormField>
            <UFormField label="Short key" name="key" class="w-5/12" :ui="{label: 'text-white/80'}">
                <UInput v-model="form.key" type="text" name="key" id="key" placeholder="Enter a key" :ui="{base: 'text-lg text-white/80'}" class="w-full" variant="none" highlight />
            </UFormField>
            <UButton type="submit" block size="xl" class="lg:text-xl w-2/12" trailing-icon="i-lucide-link">Shorten</UButton>
        </UForm>
    </div>
</template>

<script lang="ts" setup>
import {nanoid} from 'nanoid';

const supabase = useSupabaseClient()

const form = reactive({
    long_url: '',
    key: ''
})

const handleLinkForm = async () => {
    try {
        const {data, error} = await supabase.from('links').insert({
            long_url: form.long_url,
            key: form.key
        })
    } catch (error) {
        console.log(error)
    }
}

const createShortKey = (len: number = 6): void => {
    form.key = nanoid(len)
}

onMounted(() => {
    createShortKey()
})

</script>

<style>

</style>