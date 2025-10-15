<template>
  <section class="h-screen grid place-content-center">
    <div class="max-w-3xl mx-auto text-center">
        <h1 class="text-5xl font-bold heading">
            Simplify sharing your large links with NLinker
        </h1>
        <p class="my-10 text-xl w-10/12 md:w-2/3 mx-auto">
            Transform your long URLs into short and shareable ones.
        </p>
        <NuxtLink :to="{name: 'dashboard'}"><UButton size="xl" class="text-xl font-semibold p-4 px-6">Short now</UButton></NuxtLink>
    </div>
  </section>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.heading {
    background: linear-gradient(180deg, #fff 0%, rgba(255,255,255,0) 190%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
</style>