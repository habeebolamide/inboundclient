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

const emit = defineEmits(['update:isDialogVisible', 'onnoteuploaded'])

const dialogModel = computed({
    get: () => props.isDialogVisible,
    set: val => emit('update:isDialogVisible', val),
})

const onReset = () => {
    emit('onnoteuploaded')
    form.value = {
        uploaded_file: null,
    }
    dialogModel.value = false
}

const form = ref({
    uploaded_file: null
})
const loading = ref(false)
const uploadeNote = async () => {
    loading.value = true
    if (!form.value.uploaded_file) {
        toast.error('Please select a file to upload.')
        loading.value = false
        return
    }

    const formData = new FormData()
    formData.append('course_title', form.value.course_title)
    formData.append('course_code', form.value.course_code)
    formData.append('course_description', form.value.course_description)
    formData.append('uploaded_file', form.value.uploaded_file)

    try {
        const response = await axios.post('/studyplan/uploadfile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        toast.success('Your Note would be ready soon', {
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
    <VDialog v-model="dialogModel" width="650" persistent>
        <VCard title="Upload Note">
            <VCardItem class="py-4">
                <VRow>
                    <VCol cols="12">
                        <VTextField v-model="form.course_title" label="Course Title" placeholder="Elementary Math"
                            :disabled="loading" />
                    </VCol>
                    <VCol cols="12">
                        <VTextField v-model="form.course_code" label="Course Code" placeholder="Csc 211"
                            :disabled="loading" />
                    </VCol>
                    <VCol cols="12">
                        <VTextField v-model="form.course_description" label="Course Description"
                            placeholder="Course Description" :disabled="loading" />
                    </VCol>
                    <VCol cols="12">
                        <VFileInput clearable label="File input" show-size accept=".pdf" variant="solo-filled"
                            :disabled="loading" v-model="form.uploaded_file">
                        </VFileInput>
                    </VCol>
                </VRow>
            </VCardItem>
            <VCardActions class="mt-3">
                <VBtn @click="dialogModel = false">
                    Close
                </VBtn>
                <VBtn @click="uploadeNote" :loading="loading" :disabled="loading">
                    Upload
                </VBtn>
            </VCardActions>
        </VCard>
    </VDialog>
</template>
