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
    current: {
        type: Object,
        required: true,
    },
})

const emit = defineEmits(['update:isDialogVisible', 'sessionedited'])

const dialogModel = computed({
    get: () => props.isDialogVisible,
    set: val => emit('update:isDialogVisible', val),
})

const loading = ref(false)
const form = props.current

const onReset = () => {
    emit('sessionedited')
    dialogModel.value = false
}

const updateSession = async () => {
    // return console.log('Updating session with form:', form);
    loading.value = true
    try {
        const response = await axios.post('/v1/organization/sessions/update', form)
        toast.success('Session updated successfully!', { autoClose: 2000 })
        onReset()
    } catch (err) {
        console.error('Session update failed', err)
        toast.error('Failed to update session.')
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
    console.log('Forms', form);

})
</script>

<template>
    <VDialog v-model="dialogModel" width="1000" persistent>
        <VCard title="Edit Session">
            <VCardItem>
                <span>Fill in session details below.</span>
                <VRow class="mt-3">
                    <VCol cols="12" md="6">
                        <VTextField v-model="form.title" label="Title" :disabled="loading" />
                    </VCol>

                    <VCol cols="12" md="6">
                        <VSelect v-model="form.group_id" :items="groups" item-title="name" item-value="id" label="Group"
                            disabled />
                    </VCol>

                    <VCol cols="12" md="6">
                        <VSelect v-model="form.supervisor_id" :items="supervisors" item-title="name" item-value="id"
                            label="Supervisor" disabled />
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
                        <VTextField v-model="form.building_name" label="Building Name" readonly />
                    </VCol>
                    <VCol cols="12">
                        <LocationPicker @update:latitude="form.latitude = $event"
                            @update:longitude="form.longitude = $event"
                            @update:locationName="form.building_name = $event" />
                    </VCol>
                </VRow>
            </VCardItem>

            <VCardActions class="mt-3">
                <VBtn @click="dialogModel = false" :disabled="loading">Close</VBtn>
                <VBtn @click="updateSession" :loading="loading" :disabled="loading">
                    Update
                </VBtn>
            </VCardActions>
        </VCard>
    </VDialog>
</template>
