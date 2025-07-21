<script setup>
import LocationPicker from '@/layouts/components/LocationPicker.vue'
import axios from '@/utils/axios'
import { toast } from 'vue3-toastify'


const groups = ref()
const supervisors = ref()
const props = defineProps({
    isDialogVisible: {
        type: Boolean,
        required: true,
    },
})

const emit = defineEmits(['update:isDialogVisible', 'sessioncreated'])

const dialogModel = computed({
    get: () => props.isDialogVisible,
    set: val => emit('update:isDialogVisible', val),
})

const loading = ref(false)
const form = ref({
    title: '',
    group_id: '',
    // supervisor_id: '',
    latitude: '',
    longitude: '',
    radius: 50,
    start_time: '',
    end_time: '',
})

const onReset = () => {
    emit('sessioncreated')
    dialogModel.value = false
    form.value = {
        title: '',
        group_id: '',
        supervisor_id: '',
        latitude: '',
        longitude: '',
        radius: 50,
        start_time: '',
        end_time: '',
    }
}

const createSession = async () => {
    // return console.log('Creating session with form:', form.value);

    loading.value = true
    try {
        const response = await axios.post('/v1/organization/checkin/create', form.value)
        toast.success('Session created successfully!', { autoClose: 2000 })
        onReset()
    } catch (err) {
        console.error('Session creation failed', err)
        toast.error('Failed to create session.')
    } finally {
        loading.value = false
    }
}
const getOrgGroups = () => {
    axios.get('v1/organization/groups/get_org_groups')
        .then(response => {

            groups.value = response.data.data
            // console.log(sessions.value);

        })
        .catch(error => {
            console.error('Error fetching Groups:', error)
        })
}
const getOrganizationSupervisors = () => {
    axios.get('v1/organization/supervisors/getOrganizationSupervisors')
        .then(response => {

            supervisors.value = response.data.data
            // console.log(sessions.value);

        })
        .catch(error => {
            console.error('Error fetching Groups:', error)
        })
}
onMounted(() => {
    getOrgGroups()
    getOrganizationSupervisors()
})
</script>

<template>
    <VDialog v-model="dialogModel" width="1000" persistent>
        <VCard title="Create Session">
            <VCardItem>
                <span>Fill in session details below.</span>
                <VRow class="mt-3">
                    <VCol cols="12" md="6">
                        <VTextField v-model="form.title" label="Title" :disabled="loading" />
                    </VCol>

                    <VCol cols="12" md="6">
                        <VSelect v-model="form.group_id" :items="groups" item-title="name" item-value="id" label="Group"
                            :disabled="loading" />
                    </VCol>

                    <VCol cols="12" md="6">
                        <VSelect v-model="form.supervisor_id" :items="supervisors" item-title="name" item-value="id"
                            label="Supervisor" :disabled="loading" />
                    </VCol>

                    <VCol cols="12" md="6">
                        <VTextField v-model="form.radius" label="Radius (m)" type="number" :disabled="loading" />
                    </VCol>

                    <VCol cols="12" md="6">
                        <VTextField v-model="form.start_time" label="Start Time" type="datetime-local"
                            :disabled="loading" />
                    </VCol>

                    <VCol cols="12" md="6">
                        <VTextField v-model="form.end_time" label="End Time" type="datetime-local"
                            :disabled="loading" />
                    </VCol>
                    <VCol cols="12">
                        <LocationPicker v-model:latitude="form.latitude" v-model:longitude="form.longitude" />
                    </VCol>
                </VRow>
            </VCardItem>

            <VCardActions class="mt-3">
                <VBtn @click="dialogModel = false" :disabled="loading">Close</VBtn>
                <VBtn @click="createSession" :loading="loading" :disabled="loading">
                    Create
                </VBtn>
            </VCardActions>
        </VCard>
    </VDialog>
</template>
