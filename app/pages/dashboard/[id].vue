<template>
<section v-if="data" class="pt-24 container">
    <div>
      <div class="flex items-center gap-5">
        <h1 class="text-3xl font-bold text-amber-500">/{{ data.key }}</h1>
        <UButton
          @click="handleCopy(`${config.public.appUrl}/${data.key}`)"
          leading-icon="i-lucide-copy" class="p-3"
        />
      </div>
      <NuxtTime :datetime="data.created_at" />
    </div>

    <div class="flex mt-10 flex-wrap md:flex-nowrap">
      <div class="card md:w-1/3 w-full">
        <div class="text-4xl font-bold text-white">{{ data.total_clicks || 0 }}</div>
        <div class="text-white/50">Total Clicks</div>
      </div>
      <div class="card mt-5 md:mt-0 md:ml-5 w-full relative">
        <span
          class="bg-transparent truncate line-clamp-1 max-w-4/5"
        >{{ data.long_url }}</span>
        <UButton
          @click="handleCopy(data.long_url)"
          leading-icon="i-lucide-copy" class="p-3 absolute right-2 bottom-2"
        />
      </div>
    </div>

    <div class="my-10">
      <div v-for="click in sortedClicks" :key="click.id" class="card w-full mb-6">
        <div v-if="click && typeof click === 'object'">
          <div class="flex justify-between">
            <div class="flex flex-col">
              <span class="text-amber-500">Ip address: {{ click.ip || 'hidden' }}</span>
              <span>Clicked on: <NuxtTime class="text-white/50" :datetime="click.created_at"></NuxtTime></span>
            </div>
            <div class="flex flex-col">
              <span>Country: {{ click.country || 'unknown' }}</span>
              <span>City: {{ click.city || 'unknown' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { Database} from '~~/types/supabase'

const {id} = useRoute().params as {id: string}
const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()
const config = useRuntimeConfig()
const toast = useToast()

definePageMeta({
    middleware: 'auth'
})

const {data} = await useAsyncData(`link-${id}`, async () => {
  const {data,error} = await supabase.from('links').select('*, clicks(*)').eq('key', id).eq('user_id', user.value?.sub).single()
  
  if (error || !data) {
    throw createError({
      statusCode: 404,
      message: 'Not found'
    })
  }

  return data
})

const sortedClicks = computed(() => {
  return data.value?.clicks.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
})

const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.add({title: 'Success', description: 'You have copied the link', color: 'info'})
}
</script>

<style>

</style>