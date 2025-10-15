<template>
  <div class="fixed top-0 left-0 right-0 border-b bg-blur border-white/20 z-10">
    <nav class="container py-4 flex justify-between">
        <NuxtLink :to="{name: 'index'}" class="text-2xl font-bold text-white cursor-pointer">NLinker</NuxtLink>
        <ul class="flex items-center gap-4">
            <li v-for="link in navLinks" :key="link.to">
                <NuxtLink :to="link.to">{{ link.label }}</NuxtLink>
            </li>
            <li>
                <NuxtLink :to="{name: 'auth'}">
                    <UButton>Sign in</UButton>
                </NuxtLink>
            </li>
        </ul>
    </nav>
  </div>
</template>

<script lang="ts" setup>
const navLinks = ref<{to: string; label: string}[]>([{to: '/', label: 'Home'}])
</script>

<style>

</style>