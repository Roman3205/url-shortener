<template>
  <main class="pt-24">
    <section class="container">
        <h1 class="text-2xl font-bold text-white">Dashboard</h1>
    </section>
    <section class="container mt-10">
        <LinkForm @created="refresh()" />
    </section>
    <section class="container mt-10 flex flex-col gap-3">
        <LinkItem v-for="link in data" :key="link.id" :link="{shortKey: link.key, longUrl: link.long_url || '', id: link.id, totalClicks: link.total_clicks || 0}" />
    </section>

  </main>
</template>

<script lang="ts" setup>
import type { Database} from '~~/types/supabase'

definePageMeta({
    middleware: 'auth'
})

const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()

const {data, refresh} = useAsyncData('links', async () => {
  const {data,error} = await supabase.from('links').select('*').eq('user_id', user.value?.sub).order('created_at', {ascending: false})

  if (error) {
    throw createError({
      statusCode: 500,
      message: 'Something went wront on the server side'
    })
  }

  return data
})
</script>

<style>

</style>