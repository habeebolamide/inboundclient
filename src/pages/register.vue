<script setup>
import axios from '@/utils/axios';
import authV1BottomShape from '@images/svg/auth-v1-bottom-shape.svg?url';
import authV1TopShape from '@images/svg/auth-v1-top-shape.svg?url';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';

const router = useRouter()

const form = ref({
  name: '',
  slug: '',
  type: '',
  email: '',
  password: '',
  password_confirmation: '',
})

const isPasswordVisible = ref(false)
const isPasswordConfirmationVisible = ref(false)
const loading = ref(false)

const register = async () => {
  loading.value = true

  try {
    const res = await axios.post('/v1/organization/create', form.value)
    console.log('Registration response:', res.data);
    
    toast.success('Organization registered successfully!')
    localStorage.setItem('auth_token', res.data.data.token)
    localStorage.setItem('user', JSON.stringify(res.data.data.user))
    localStorage.setItem('organization', JSON.stringify(res.data.data.organization))
    router.push('/') // or wherever you want to redirect
  } catch (error) {
    if (error.response?.data?.errors) {
      const errors = error.response.data.errors
      Object.values(errors).forEach(err => {
        toast.error(err[0])
      })
    } else {
      toast.error('Something went wrong. Please try again.')
    }
  } finally {
    loading.value = false
  }
}
</script>


<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <div class="position-relative my-sm-16">
      <!-- 👉 Top shape -->
      <VImg
        :src="authV1TopShape"
        class="text-primary auth-v1-top-shape d-none d-sm-block"
      />

      <!-- 👉 Bottom shape -->
      <VImg
        :src="authV1BottomShape"
        class="text-primary auth-v1-bottom-shape d-none d-sm-block"
      />

      <!-- 👉 Auth card -->
      <VCard
        class="auth-card"
        max-width="460"
        :class="$vuetify.display.smAndUp ? 'pa-6' : 'pa-0'"
      >

        <VCardText>
          <h4 class="text-h4 mb-1">
            Adventure starts here 🚀
          </h4>
          <p class="mb-0">
            Make your attendance management easy and fun!
          </p>
        </VCardText>

        <VCardText>
          <VForm @submit.prevent="register">
            <VRow>
              <!-- Username -->
              <VCol cols="12">
                <VTextField
                  v-model="form.name"
                  autofocus
                  label="Organization Name"
                  placeholder="Inbound"
                />
              </VCol>
              <!-- Slug -->
              <VCol cols="12">
                <VTextField
                  v-model="form.slug"
                  autofocus
                  label="Organization slug"
                  placeholder="Ibn"
                />
              </VCol>

              <!-- type -->
              <VCol cols="12">
                <VSelect
                  v-model="form.type"
                  :items="['company', 'school']"
                  label="Type"
                  placeholder="Select type"
                />
              </VCol>
              <!-- email -->
              <VCol cols="12">
                <VTextField
                  v-model="form.email"
                  label="Email"
                  type="email"
                  placeholder="johndoe@email.com"
                />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <VTextField
                  v-model="form.password"
                  label="Password"
                  autocomplete="password"
                  placeholder="············"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />
                
                <!-- password confirmation -->
                <VTextField
                  v-model="form.password_confirmation"
                  label="Confirm Password"
                  autocomplete="password"
                  class="mt-6"
                  placeholder="············"
                  :type="isPasswordConfirmationVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordConfirmationVisible ? 'bx-hide' : 'bx-show'"
                  @click:append-inner="isPasswordConfirmationVisible = !isPasswordConfirmationVisible"
                />

                <VBtn
                  class="my-6"
                  block
                  type="submit"
                  :loading="loading"
                  :disabled="loading"
                >
                  Sign up
                </VBtn>

              </VCol>

              <!-- login instead -->
              <VCol
                cols="12"
                class="text-center text-base"
              >
                <span>Already have an account?</span>
                <RouterLink
                  class="text-primary ms-1"
                  to="/login"
                >
                  Sign in instead
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
