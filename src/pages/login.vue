<script setup>
import axios from '@/utils/axios'

// import logo from '@images/logo.svg?raw';
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

const form = ref({
  email: '',
  password: '',
  remember: false,
})

const router = useRouter()
const isPasswordVisible = ref(false)
const loading = ref(false)

const login = async () => {
  loading.value = true

  try {
    const res = await axios.post('/v1/organization/login', form.value)

    toast.success('Login successfull!', {
      position: 'top-right',
      autoClose: 2000,
    })
    localStorage.setItem('auth_token', res.data.data.token)
    localStorage.setItem('user', JSON.stringify(res.data.data.user))
    localStorage.setItem('organization', JSON.stringify(res.data.data.user.organization))
    router.push('/') // or wherever you want to redirect
  } catch (error) {
    if (error.response?.data?.errors) {
      const errors = error.response.data.errors

      Object.values(errors).forEach(err => {
        toast.error(err[0])
      })
    } else {
      console.log('Login error:', error)

      toast.error(error.response?.data?.message || 'Something went wrong. Please try again.')
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <div class="position-relative">
      <!-- 👉 Top shape -->
      <!-- <VImg :src="authV1TopShape" class="text-primary auth-v1-top-shape d-none d-sm-block" /> -->

      <!-- 👉 Bottom shape -->
      <!-- <VImg :src="authV1BottomShape" class="text-primary auth-v1-bottom-shape d-none d-sm-block" /> -->
      <!-- 👉 Auth Card -->
      <VCard
        class="auth-card"
        max-width="460"
        :class="$vuetify.display.smAndUp ? 'pa-6' : 'pa-0'"
      >
        <!--
          <VCardItem class="justify-center">
          <RouterLink to="/" class="app-logo">

          <div class="d-flex" v-html="logo" />
          <h1 class="app-logo-title">
          sneat
          </h1>
          </RouterLink>
          </VCardItem> 
        -->

        <VCardText>
          <h4 class="text-h4 mb-1">
            Welcome to InBound! 👋🏻
          </h4>
          <p class="mb-0">
            Please sign-in to your account and start the adventure
          </p>
        </VCardText>

        <VCardText>
          <VForm @submit.prevent="login">
            <VRow>
              <!-- email -->
              <VCol cols="12">
                <VTextField
                  v-model="form.email"
                  autofocus
                  label="Email or Username"
                  type="email"
                  placeholder="johndoe@email.com"
                  :disabled="loading"
                />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <VTextField
                  v-model="form.password"
                  label="Password"
                  placeholder="············"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  autocomplete="password"
                  :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                  :disabled="loading"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />

                <!-- remember me checkbox -->
                <div class="d-flex align-center justify-space-between flex-wrap my-6">
                  <VCheckbox
                    v-model="form.remember"
                    label="Remember me"
                  />

                  <a
                    class="text-primary"
                    href="javascript:void(0)"
                  >
                    Forgot Password?
                  </a>
                </div>

                <!-- login button -->
                <VBtn
                  block
                  type="submit"
                  :loading="loading"
                  :disabled="loading"
                >
                  Login
                </VBtn>
              </VCol>

              <!-- create account -->
              <VCol
                cols="12"
                class="text-body-1 text-center"
              >
                <span class="d-inline-block">
                  New on our platform?
                </span>
                <RouterLink
                  class="text-primary ms-1 d-inline-block text-body-1"
                  to="/register"
                >
                  Create an account
                </RouterLink>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </div>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth";
</style>
