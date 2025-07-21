<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    confirmationQuestion: { type: String, required: true },
    isDialogVisible: { type: Boolean, required: true },
    confirmTitle: { type: String, required: true },
    confirmMsg: { type: String, required: true },
    cancelTitle: { type: String, required: true },
    cancelMsg: { type: String, required: true },
    error: { type: String, default: '' },
    done: { type: Boolean },
})

const emit = defineEmits(['update:isDialogVisible', 'confirm'])

const loading = ref(false)
const successful = ref(false)
const cancelled = ref(false)
const erroroccured = ref(false)
const errormessage = ref(props.error)

watch(() => props.error, newError => {
    if (newError) {
        errormessage.value = newError
        loading.value = false
    }
})

watch(() => props.done, checkdone => {
    if (checkdone) {
        loading.value = false
        if (errormessage.value === '') {
            successful.value = true
        } else {
            erroroccured.value = true
        }
        updateModelValue(false)
    }
})

const updateModelValue = val => {
    emit('update:isDialogVisible', val)
}

const onConfirmation = () => {
    loading.value = true
    emit('confirm')
}

const onCancel = () => {
    loading.value = false
    emit('update:isDialogVisible', false)
    cancelled.value = true
}
</script>

<template>
    <!-- 👉 Confirm Dialog -->
    <VDialog max-width="500" :model-value="props.isDialogVisible" @update:model-value="updateModelValue">
        <VCard class="text-center px-10 py-6">
            <VCardText>
                <VBtn icon variant="outlined" color="warning" class="my-4"
                    style="block-size: 88px; inline-size: 88px; pointer-events: none">
                    <span class="text-5xl">!</span>
                </VBtn>

                <h6 class="text-lg font-weight-medium">
                    {{ props.confirmationQuestion }}
                </h6>
            </VCardText>

            <VCardText class="d-flex align-center justify-center gap-2">
                <VBtn variant="elevated" :loading="loading" :disabled="loading" @click="onConfirmation">
                    Confirm
                </VBtn>

                <VBtn color="secondary" variant="tonal" @click="onCancel">
                    Cancel
                </VBtn>
            </VCardText>
        </VCard>
    </VDialog>

    <!-- Success Dialog -->
    <VDialog v-model="successful" max-width="500" persistent>
        <VCard>
            <VCardText class="text-center px-10 py-6">
                <VBtn icon variant="outlined" color="success" class="my-4"
                    style="block-size: 88px; inline-size: 88px; pointer-events: none">
                    <VIcon icon="tabler-check" size="38" />
                </VBtn>

                <h1 class="text-h4 mb-4">{{ props.confirmTitle }}</h1>
                <p>{{ props.confirmMsg }}</p>

                <VBtn color="success" @click="successful = false">Ok</VBtn>
            </VCardText>
        </VCard>
    </VDialog>

    <!-- Cancelled Dialog -->
    <VDialog v-model="cancelled" max-width="500">
        <VCard>
            <VCardText class="text-center px-10 py-6">
                <VBtn icon variant="outlined" color="error" class="my-4"
                    style="block-size: 88px; inline-size: 88px; pointer-events: none">
                    <span class="text-5xl font-weight-light">X</span>
                </VBtn>

                <h1 class="text-h4 mb-4">{{ props.cancelTitle }}</h1>
                <p>{{ props.cancelMsg }}</p>

                <VBtn color="success" @click="cancelled = false">Ok</VBtn>
            </VCardText>
        </VCard>
    </VDialog>

    <!-- Error Dialog -->
    <VDialog v-if="erroroccured" v-model="erroroccured" max-width="500">
        <VCard>
            <VCardText class="text-center px-10 py-6">
                <VBtn icon variant="outlined" color="error" class="my-4"
                    style="block-size: 88px; inline-size: 88px; pointer-events: none">
                    <span class="text-5xl font-weight-light">X</span>
                </VBtn>

                <h1 class="text-h4 mb-4">An Error Occurred</h1>
                <p>{{ errormessage }}</p>

                <VBtn color="error" @click="() => {
                    erroroccured = false
                    errormessage = ''
                }">
                    Ok
                </VBtn>
            </VCardText>
        </VCard>
    </VDialog>
</template>
