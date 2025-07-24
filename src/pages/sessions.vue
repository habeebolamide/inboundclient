<script setup>
import ConfirmDialog from '@/components/dialogs/ConfirmDialog.vue';
import CreateSessionDialog from '@/components/dialogs/CreateSessionDialog.vue';
import EditSessionDialog from '@/components/dialogs/EditSessionDialog.vue';
import axios from '@/utils/axios';
import { ref } from 'vue';
const sessions = ref()
const form = ref()
const filters = ref({})
const createSession = ref(false)
const editSession = ref(false)
const isConfirmDialogVisible = ref(false)
const error = ref('')
const done = ref(false)
const groups = ref()
const supervisors = ref()

const getSession = () => {
    axios.get('v1/organization/sessions/get_sessions')
        .then(response => {
            sessions.value = response.data.data
            // console.log(sessions.value);
        })
        .catch(error => {
            console.error('Error fetching Sessions:', error)
        })
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
const statusColor = (status) => {
    switch (status) {
        case 'scheduled':
            return 'primary'
        case 'ongoing':
            return 'success'
        case 'ended':
            return 'grey'
        case 'cancelled':
            return 'error'
        default:
            return 'default'
    }
}

const OnSessionCreated = () => {
    createSession.value = false
    getSession()
}

const deleteSession = () => {
    const session_id = form.value.id

    axios
        .delete(`v1/organization/sessions/delete/${session_id}`)
        .then(res => {
            done.value = true
            getSession()
        })
        .catch(err => {
            error.value = err.response.data.message
        })
}
onMounted(() => {
    getSession();
    getOrganizationSupervisors();
    getOrgGroups();
})
</script>

<template>
    <VRow>
        <VCol cols="12">
            <VBtn class="float-right" @click="createSession = true">
                Create Session
            </VBtn>
        </VCol>
        <VCol cols="4">
            <VSelect v-model="filters.group" :items="groups" item-title="name" item-value="id"
                label="Filter by Group" />
        </VCol>
        <VCol cols="4">
            <VSelect v-model="filters.supervisor" :items="supervisors" item-title="name" item-value="id"
                label="Filter by Supervisor" />
        </VCol>
        <VCol cols="4">
            <VSelect v-model="filters.status" :items="['Scheduled', 'Active', 'Ended']" label="Status" />
        </VCol>

    </VRow>
    <VRow v-if="sessions && sessions.length > 0">
        <VCol cols="4" v-for="(s, index) in sessions" :key="index">
            <VCard>
                <VCardTitle class="d-flex justify-space-between">
                    <span style="color: #696CFF;">{{ s.title }}</span>
                </VCardTitle>
                <VCardText>
                    <p>{{ s.description }}</p>
                    <p>Start Time: {{ s.start_time }} </p>
                    <p>End Time: {{ s.end_time }}</p>
                    <VChip :color="statusColor(s.status)">
                        {{ s.status }}
                    </VChip>

                </VCardText>
                <VCardActions>
                    <VBtn color="primary" variant="text" class="text-capitalize" @click="editSession = true, form = s">
                        <VIcon icon="tabler-pencil" />
                        Edit.
                    </VBtn>
                    <VBtn color="error" variant="text" class="text-capitalize"
                        @click="isConfirmDialogVisible = true; form = s;">
                        <VIcon icon="tabler-trash" />
                        Delete.
                    </VBtn>
                </VCardActions>
            </VCard>


        </VCol>
    </VRow>
    <VRow v-else>
        <VCol cols="12">
            <VCard>
                <VCardText>
                    <VAlert text=" No sessions found." type="error" class="my-5 mx-3">
                    </VAlert>
                </VCardText>
            </VCard>
        </VCol>
    </VRow>




    <CreateSessionDialog v-model:is-dialog-visible="createSession" @sessioncreated="OnSessionCreated" />
    <EditSessionDialog v-if="form" v-model:is-dialog-visible="editSession" :current=form
        @sessionedited="OnSessionCreated" />
    <ConfirmDialog v-model:isDialogVisible="isConfirmDialogVisible" cancel-title="Cancelled" :error="error" :done="done"
        confirm-title="Sucessfull!" confirm-msg="successfull."
        confirmation-question="Are you sure you want to carry out this operation?" cancel-msg="Cancelled!!"
        @confirm="deleteSession" />
</template>
