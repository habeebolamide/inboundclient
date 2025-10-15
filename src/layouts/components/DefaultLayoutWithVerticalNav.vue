<script setup>
import Footer from '@/layouts/components/Footer.vue';
import NavItems from '@/layouts/components/NavItems.vue';
import axios from '@/utils/axios';
import VerticalNavLayout from '@layouts/components/VerticalNavLayout.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import NavbarThemeSwitcher from './NavbarThemeSwitcher.vue';
const router = useRouter()
const loading = ref(false)


const logout = () => {
  loading.value = true
  axios.post('/auth/logout').then(() => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    window.location.href = '/login'
  }).catch((error) => {
    console.error('Logout error:', error);
    // Optionally handle logout errors here
  })
    .finally(() => {
      loading.value = false
    });
};
</script>

<template>
  <VerticalNavLayout>
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <!-- 👉 Vertical nav toggle in overlay mode -->
        <IconBtn class="ms-n3 d-lg-none" @click="toggleVerticalOverlayNavActive(true)">
          <VIcon icon="bx-menu" />
        </IconBtn>
        <VSpacer />
        <NavbarThemeSwitcher class="me-1" />
        <!-- <UserProfile /> -->
      </div>
    </template>

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
      <div class="nav-content-wrapper">
        <NavItems />
        <div class="nav-footer">
          <VBtn color="error" @click="logout" block :loading="loading" :disabled="loading">
            <VIcon icon="bx-log-out" class="me-2" />
            Logout
          </VBtn>
        </div>
      </div>
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

.nav-content-wrapper {
  display: flex;
  flex-direction: column;
  block-size: 100%;

  .nav-footer {
    margin-block-start: auto;
    padding: 1rem;
  }
}
</style>
