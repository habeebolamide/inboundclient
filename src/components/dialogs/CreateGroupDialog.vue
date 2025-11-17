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

const emit = defineEmits(['update:isDialogVisible', 'groupcreated'])

const dialogModel = computed({
    get: () => props.isDialogVisible,
    set: val => emit('update:isDialogVisible', val),
})

const onReset = () => {
    emit('groupcreated')
    form.value = {
        name: '',
        file: null,
    }
    dialogModel.value = false
}

const form = ref({
    file: null
})
const loading = ref(false)
const createGroup = async () => {
    loading.value = true
    if (!form.value.file) {
        toast.error('Please select a file to upload.')
        loading.value = false
        return
    }

    const formData = new FormData()
    formData.append('name', form.value.name)
    formData.append('file', form.value.file)

    try {
        const response = await axios.post('/organization/groups/create', formData, {
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
        <VCard title="Create Group">
            <VCardItem>
                <VRow>
                    <VCol cols="12">
                        <VTextField v-model="form.name" label="Group Name" placeholder="Ui Team" :disabled="loading" />
                    </VCol>
                    <VCol cols="12">
                        <VFileInput clearable label="File input" show-size accept=".csv,text/csv" variant="solo-filled"
                            :disabled="loading" v-model="form.file">
                        </VFileInput>
                    </VCol>
                </VRow>
            </VCardItem>
            <VCardActions class="mt-3">
                <VBtn @click="dialogModel = false">
                    Close
                </VBtn>
                <VBtn @click="createGroup" :loading="loading" :disabled="loading">
                    Import
                </VBtn>
            </VCardActions>
        </VCard>
    </VDialog>
</template>
