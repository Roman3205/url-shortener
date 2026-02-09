<template>
  <UApp>
    <NuxtLoadingIndicator 
      color="teal"
      :height="4"
      style="opacity: 100 !important"
      />
    <NuxtLayout>
      <NuxtRouteAnnouncer />
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
