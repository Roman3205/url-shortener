<template>
  <div class="grid place-content-center h-screen">Redirecting...</div>  
</template>

<script lang="ts" setup>
import type {Database} from '~~/types/supabase'
const params = useRoute().params
definePageMeta({
  layout: false
})
const supabase = useSupabaseClient<Database>()

if (!params.key) {
  throw createError({
    statusCode: 404,
    message: 'Not found'
  })
}

const {data} = await useAsyncData(`link-${params.key}`, async () => {
  const {data,error} = await supabase.from('links').select('*').eq('key', params.key).single()
  if (error || !data) {
    throw createError({
      statusCode: 404,
      message: 'Not found'
    })
  }
  return data
})

if (data.value?.long_url) {
  const agent = useUserAgent()
  let newClick: any = {};
  if (agent) {
    newClick.user_agent = agent.userAgent;
    newClick.ip = agent.ip || 'unknown';
    if (agent.ip) {
      const geo = useNuxtApp().$geoip.lookup(agent.ip);
      if (geo) {
        newClick.country = geo.country || 'unknown';
        newClick.city = geo.city || 'unknown';
      }
    }
    const {error} = await supabase.from('clicks').insert({
      link_id: data.value.id,
      ...newClick
    })
  }
  useRedirect(data.value?.long_url)
  // navigateTo(data.value?.long_url as string, {external:true, redirectCode: 302})
}
</script>

<style>

</style>