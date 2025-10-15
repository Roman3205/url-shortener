<template>
  <main class="pt-24">
    <section class="container">
        <h1 class="text-2xl font-bold text-white">Dashboard</h1>
    </section>
    <section class="container mt-10">
        <LinkForm />
    </section>
    <section class="container mt-10 flex flex-col gap-3">
        <LinkItem v-for="i in 10" :key="i" :link="{shortKey: '/kldbW2', longUrl: 'https://www.google.com/a-very-long-url', id: '1'}" />
    </section>
  </main>
</template>

<script lang="ts" setup>
definePageMeta({
    middleware: 'auth'
})
</script>

<style>

</style>