<template>
  <section class="h-screen grid place-content-center">
    <div class="container">
        <div class="card flex flex-col gap-6">
            <div class="flex justify-center">
                <div class="flex justify-center w-16 h-16 mt-1 items-center rounded-full border">
                    <UIcon name="i-lucide-lock" />
                </div>
            </div>
            <UButton size="xl" block class="py-4 text-xl font-semibold" @click="handleGithubLogin">Continue with Github</UButton>
            <hr class="border-white/10" />
            <UForm class="w-full flex flex-col gap-5" :schema="loginSchema" :state="form" @submit="handleFormSubmit">
                <UFormField label="Email" name="email" :ui="{label: 'text-white/80'}">
                    <UInput v-model="form.email" type="email" name="email" id="email" class="w-full" :ui="{base: 'text-lg text-white/80'}" variant="none" highlight placeholder="example@gmail.com"/>
                </UFormField>
                <UFormField label="Password" name="password" :ui="{label: 'text-white/80'}">
                    <UInput v-model="form.password" type="password" name="password" id="password" :ui="{base: 'text-lg text-white/80'}" class="w-full" variant="none" highlight placeholder="********" />
                </UFormField>
                <UButton type="submit" block size="xl" class="text-xl my-2" :label="isLoggingIn ? 'Login' : 'Sign up'"></UButton>
                <span class="text-center mb-2">
                    <template v-if="isLoggingIn">
                        Dont have an account?<span class="text-amber-500 ml-2 font-semibold cursor-pointer" @click="isLoggingIn = false">Sign up</span>
                    </template>
                    <template v-else>
                        Already have an accout?<span class="text-amber-500 ml-2 font-semibold cursor-pointer" @click="isLoggingIn = true">Login</span>
                    </template>
                </span>
            </UForm>
        </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'

const toast = useToast()

const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(8).max(64)
})

const form = reactive({
    email: '',
    password: ''
})

const isLoggingIn = ref<boolean>(false)

const supabase = useSupabaseClient()
const handleGithubLogin = async () => {
    await supabase.auth.signInWithOAuth({provider: 'github', options: {redirectTo: `${useRuntimeConfig().public.appUrl}/dashboard`}})
}

const handleSignUp = async (event: FormSubmitEvent<z.output<typeof loginSchema>>) => {
    try {
        const {data,error} = await supabase.auth.signUp({email: event.data.email, password: event.data.password, options: {emailRedirectTo: `${useRuntimeConfig().public.appUrl}/auth`}})

        if(error) {
            return toast.add({title: 'Error', description: error.message, color: 'error'})
        }

        form.email = ''
        form.password = ''
        return toast.add({title: 'Success', description: 'Confirmation link was sent to your email address', color: 'info'})
    } catch (error) {
        return toast.add({title: 'Error', description: error, color: 'error'})
    }
}

const handleLogin = async (event: FormSubmitEvent<z.output<typeof loginSchema>>) => {
   try {
     const {data,error} = await supabase.auth.signInWithPassword({email: event.data.email, password: event.data.password})

     if(error) {
        return toast.add({title: 'Error', description: error.message, color: 'error'})
     }
    
     form.email = ''
     form.password = ''
     toast.add({title: 'Success', description: 'You have been logged in', color: 'info'})
     return navigateTo('/dashboard')
   } catch (error) {
        return toast.add({title: 'Error', description: error, color: 'error'})
   }
}

const handleFormSubmit = async (event: FormSubmitEvent<z.output<typeof loginSchema>>) => {
    if (!isLoggingIn.value) {
        await handleSignUp(event)
    } else {
        await handleLogin(event)
    }
}
</script>

<style>

</style>