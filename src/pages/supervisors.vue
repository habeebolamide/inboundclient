<script setup>
import SupervisorList from '@/views/pages/supervisors/SupervisorList.vue'

import ImportSupervisorDialog from '@/components/dialogs/ImportSupervisorDialog.vue'

const form = ref({})
const ImportSupervisor = ref(false)
const supervisorListRef = ref(null)

const OnSupervisorImported = () => {
  // getArm();
  ImportSupervisor.value = false
  supervisorListRef.value?.getSupervisors()
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardTitle class="d-flex justify-space-between">
          <span>Supervisors</span>
          <VBtn icon variant="text" color="medium-emphasis">
            <VIcon icon="tabler-layout-grid" />
            <VMenu activator="parent">
              <VList>
                <VListItem link @click="ImportSupervisor = true">
                  <template #prepend>
                    <VIcon icon="tabler-pencil" />
                  </template>
                  <VListItemTitle>Import Supervisors</VListItemTitle>
                </VListItem>
              </VList>
            </VMenu>
          </VBtn>
        </VCardTitle>

        <SupervisorList ref="supervisorListRef" />
      </VCard>

      <!-- ✅ NO v-if -->
      <ImportSupervisorDialog v-model:is-dialog-visible="ImportSupervisor" @supervisorimported="OnSupervisorImported" />
    </VCol>
  </VRow>
</template>
