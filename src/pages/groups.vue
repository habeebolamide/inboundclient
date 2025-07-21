<script setup>

import CreateGroupDialog from '@/components/dialogs/CreateGroupDialog.vue'
import GroupList from '@/views/pages/GroupList.vue'

const form = ref({})
const createGroup = ref(false)
const groupListRef = ref(null)

const OnGroupCreated = () => {
    createGroup.value = false
    groupListRef.value?.getGroups()
}
</script>

<template>
    <VRow>
        <VCol cols="12">
            <VCard>
                <VCardTitle class="d-flex justify-space-between">
                    <span>Groups</span>
                    <VBtn icon variant="text" color="medium-emphasis">
                        <VIcon icon="tabler-layout-grid" />
                        <VMenu activator="parent">
                            <VList>
                                <VListItem link @click="createGroup = true">
                                    <template #prepend>
                                        <VIcon icon="tabler-pencil" />
                                    </template>
                                    <VListItemTitle>Create Group</VListItemTitle>
                                </VListItem>
                            </VList>
                        </VMenu>
                    </VBtn>
                </VCardTitle>

                <GroupList ref="groupListRef" />
            </VCard>

            <!-- ✅ NO v-if -->
            <CreateGroupDialog v-model:is-dialog-visible="createGroup" @groupcreated="OnGroupCreated" />
        </VCol>
    </VRow>
</template>
