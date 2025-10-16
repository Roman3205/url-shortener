<template>
    <div class="card">
        <UForm :state="form" :schema="linkSchema" class="w-full flex flex-col md:flex-row gap-5 md:items-end" @submit="handleLinkForm">
            <UFormField label="Long URL" name="long_url" class="md:w-5/12" :ui="{label: 'text-white/80'}">
                <UInput v-model="form.long_url" type="text" name="url" id="url" class="w-full" placeholder="Paste or enter long URL" :ui="{base: 'text-lg text-white/80'}" variant="none" highlight />
            </UFormField>
            <UFormField label="Short key" name="key" class="md:w-5/12" :ui="{label: 'text-white/80'}">
                <UInput v-model="form.key" type="text" name="key" id="key" placeholder="Enter a key" :ui="{base: 'text-lg text-white/80'}" class="w-full" variant="none" highlight />
            </UFormField>
            <UButton type="submit" block size="xl" class="lg:text-xl md:w-2/12" trailing-icon="i-lucide-link">Shorten</UButton>
        </UForm>
    </div>
</template>

<script lang="ts" setup>
import {nanoid} from 'nanoid';
import type { Database } from '~~/types/supabase'
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui';

const toast = useToast()

const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()

const form = reactive({
    long_url: '',
    key: ''
})

const linkSchema = z.object({
    long_url: z.url()
})

const emit = defineEmits<{
    (e: 'created'): void
}>()

const handleLinkForm = async (event: FormSubmitEvent<z.output<typeof linkSchema>>) => {
    try {
        // enable rls policy for authenticated insert only
        const {data, error} = await supabase.from('links').insert({
            long_url: event.data.long_url,
            key: form.key,
            // user_id: user.value?.id
        })

        if(error) {
            return toast.add({title: 'Error', description: error.message, color: 'error'})
        }


        form.long_url = ''
        createShortKey()
        emit('created')
        return toast.add({title: 'Success', description: 'URL shortened successfully', color: 'success'})
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