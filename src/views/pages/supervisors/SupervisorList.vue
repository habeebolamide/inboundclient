<script setup>
import axios from '@/utils/axios'
import { onMounted, ref } from 'vue'

const supervisors = ref()



const getSupervisors = () => {
  axios.get('/organization/supervisors/getSupervisors')
    .then(response => {
      supervisors.value = response.data.data
    })
    .catch(error => {
      console.error('Error fetching supervisors:', error)
    })
}

onMounted(() => {
  getSupervisors()
})

defineExpose({
  getSupervisors,
})
</script>

<template>
  <VTable v-if="supervisors != ''">
    <thead>
      <tr>
        <th>
          S/N
        </th>
        <th class="text-uppercase">
          User Id
        </th>
        <th>
          Name
        </th>
        <th>
          Email
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(sp, index) in supervisors" :key="index">
        <td>
          {{ index + 1 }}
        </td>
        <td>
          {{ sp.user_id }}
        </td>
        <td>
          {{ sp.name }}
        </td>
        <td>
          {{ sp.email }}
        </td>
        <!-- <td>
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
</td> -->
      </tr>
    </tbody>
  </VTable>
  <VAlert v-else text="No Supervisor Found.Upload to see supervisors" type="error" class="my-5 mx-3"></VAlert>
</template>
