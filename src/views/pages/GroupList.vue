<script setup>
import axios from '@/utils/axios'
import { onMounted, ref } from 'vue'

const groups = ref()



const getGroups = () => {
    axios.get('v1/organization/groups/getAll')
        .then(response => {
            groups.value = response.data.data
        })
        .catch(error => {
            console.error('Error fetching groups:', error)
        })
}

onMounted(() => {
    getGroups()
})

defineExpose({
    getGroups,
})
</script>

<template>
    <VTable v-if="groups != ''">
        <thead>
            <tr>
                <th>
                    S/N
                </th>
                <th class="text-uppercase">
                    Group Name
                </th>
                <th>
                    Total Number of Members
                </th>
                <th>
                    Action
                </th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="(gp, index) in groups" :key="index">
                <td>
                    {{ index + 1 }}
                </td>
                <td>
                    {{ gp.name }}
                </td>
                <td>
                    {{ gp.total_members }}
                </td>
                <td>
                    <VBtn icon variant="text" color="medium-emphasis">
                        <VIcon icon="tabler-dots-vertical" />
                        <VMenu activator="parent">
                            <VList>
                                <VListItem link @click="current = user; isAssignPermissionDialogVisible = true">
                                    <template #prepend>
                                        <VIcon icon="tabler-pencil" />
                                    </template>

                                    <VListItemTitle>Assign Permission</VListItemTitle>
                                </VListItem>

                                <VListItem link @click="current = user; isRoleDialogVisible = true">
                                    <template #prepend>
                                        <VIcon icon="tabler-pencil" />
                                    </template>
                                    <VListItemTitle>Assign Role</VListItemTitle>
                                </VListItem>
                            </VList>
                        </VMenu>
                    </VBtn>
                </td>
            </tr>
        </tbody>
    </VTable>
    <VAlert v-else text="No Groups Found." type="error" class="my-5 mx-3"></VAlert>
</template>
