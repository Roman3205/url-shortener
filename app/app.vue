<template>
  <UApp>
    <NuxtLoadingIndicator 
      color="orange"
      :height="4"
      style="opacity: 100 !important"
      />
    <NuxtLayout>
      <NuxtRouteAnnouncer />
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
