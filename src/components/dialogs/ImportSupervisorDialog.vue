<script setup>
import axios from '@/utils/axios'
import { toast } from 'vue3-toastify'
import { VFileInput } from 'vuetify/components'

const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['update:isDialogVisible', 'supervisorimported'])

const dialogModel = computed({
  get: () => props.isDialogVisible,
  set: val => emit('update:isDialogVisible', val),
})

const onReset = () => {
  emit('supervisorimported')
  dialogModel.value = false
  form.value = {
    supervisor_csv: null,
  }
}

const form = ref({
  supervisor_csv: null
})
const loading = ref(false)
const uploadSupervisors = async () => {
  loading.value = true
  if (!form.value.supervisor_csv) {
    toast.error('Please select a file to upload.')
    loading.value = false
    return
  }

  const formData = new FormData()
  formData.append('supervisor_csv', form.value.supervisor_csv)

  try {
    const response = await axios.post('/v1/organization/supervisors/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    toast.success('Upload successful!', {
      position: 'top-right',
      autoClose: 2000,
    })
    onReset();
    loading.value = false
  } catch (error) {
    loading.value = false
    console.error('Upload failed', error)
  }
}
</script>

<template>
  <VDialog v-model="dialogModel" width="500" persistent>
    <VCard title="Import" text="Import your supervisors here.">
      <VCardItem>
        <VRow>
          <VCol cols="12">
            <VFileInput clearable label="File input" show-size accept=".csv,text/csv" variant="solo-filled"
              :disabled="loading" v-model="form.supervisor_csv">
            </VFileInput>
          </VCol>
        </VRow>
      </VCardItem>
      <VCardActions class="mt-3">
        <VBtn @click="dialogModel = false">
          Close
        </VBtn>
        <VBtn @click="uploadSupervisors" :loading="loading" :disabled="loading">
          Import
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
