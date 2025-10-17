<template>
  <div class="grid place-content-center h-screen">Redirecting...</div>  
</template>

<script lang="ts" setup>
import type {Database} from '~~/types/supabase'
import geoip from 'geoip-lite'

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

  if (agent && agent.ip) {
    const geo = geoip.lookup(agent.ip);
    const {error} = await supabase.from('clicks').insert({
      link_id: data.value.id,
      ip: agent.ip,
      country: geo?.country,
      city: geo?.city,
      user_agent: agent.userAgent
    })
    // console.log(error)
  }

  useRedirect(data.value?.long_url)
  // navigateTo(data.value?.long_url as string, {external:true, redirectCode: 302})
}
</script>

<style>

</style>