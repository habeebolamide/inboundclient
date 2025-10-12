<script setup>
import Footer from '@/layouts/components/Footer.vue';
import NavItems from '@/layouts/components/NavItems.vue';
import VerticalNavLayout from '@layouts/components/VerticalNavLayout.vue';
</script>

<template>
  <VerticalNavLayout>
    <template #vertical-nav-header="{ toggleIsOverlayNavActive }">
      <RouterLink to="/" class="app-logo app-title-wrapper">
        <!-- <div class="d-flex" v-html="logo" /> -->

        <h1 class="app-logo-title">
          StudyBuddy
        </h1>
      </RouterLink>

      <IconBtn class="d-block d-lg-none" @click="toggleIsOverlayNavActive(false)">
        <VIcon icon="bx-x" />
      </IconBtn>
    </template>

    <template #vertical-nav-content>
      <NavItems />
    </template>

    <!-- 👉 Pages -->
    <slot />

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>
  </VerticalNavLayout>
</template>

<style lang="scss" scoped>
.meta-key {
  border: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 6px;
  block-size: 1.5625rem;
  line-height: 1.3125rem;
  padding-block: 0.125rem;
  padding-inline: 0.25rem;
}

.app-logo {
  display: flex;
  align-items: center;
  column-gap: 0.75rem;

  .app-logo-title {
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 1.75rem;
    text-transform: uppercase;
  }
}
</style>
