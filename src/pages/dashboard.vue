<script setup>
import UploadNoteDialog from '@/components/dialogs/UploadNoteDialog.vue';
import axios from '@/utils/axios';
import { onMounted } from 'vue';

const user = JSON.parse(localStorage.getItem('user') || '{}');
const analyticsData = ref(null);
const uploadNote = ref(false)

const analytics = () => {
  axios.get('/dashboard/analytics')
    .then((res) => {
      analyticsData.value = res.data.data;
      console.log('Analytics data:', res.data);
    })
    .catch((error) => {
      console.error('Error fetching analytics data:', error);
    });
}

onMounted(() => {
  analytics();
});
</script>

<template>
  <div class="dashboard-wrapper">
    <h1>Welcome Back, {{ user.name }} </h1>
    <h3>Ready to continue your learning journey?</h3>

    <VRow class="mt-5" dense>
      <VCol cols="12" md="6" lg="4">
        <VCard class="pa-4">
          <h2>Upload Materials</h2>
          <p>Add new courses PDFs and documents</p>
          <VBtn color="primary" class="mt-3" @click="uploadNote = true">Upload Documents</VBtn>
        </VCard>
      </VCol>

      <VCol cols="12" md="6" lg="4">
        <VCard class="pa-4">
          <h2>View Notes</h2>
          <p>Access your organized study notes.</p>
          <RouterLink to="/notes">
            <VBtn color="primary" class="mt-3">
              Access Notes
            </VBtn>
          </RouterLink>
        </VCard>
      </VCol>

      <VCol cols="12" md="6" lg="4">
        <VCard class="pa-4">
          <h2>Take Quiz</h2>
          <p>Test your knowledge with AI quizzes</p>
          <RouterLink to="/quizzes">
            <VBtn color="primary" class="mt-3">Access Quiz</VBtn>

          </RouterLink>
        </VCard>
      </VCol>
    </VRow>

    <VRow>
      <VCol cols="12">
        <VCard class="pa-4 mt-4">
          <VCardTitle>Recent Uploads</VCardTitle>
          <VCardText class="text-center my-3">
            <div v-if="analyticsData === null">
              <p>No recent activities.</p>
              <VBtn>
                Upload First Document
              </VBtn>
            </div>
            <div v-else>
              <div v-for="(ana, index) in analyticsData.recent_uploads">
                <VCard class="mb-2 pa-2 text-left" :key="index">
                  <VCardTitle>{{ ana.course_title }}</VCardTitle>
                  <VCardText>Uploaded on: {{ new Date(ana.created_at).toLocaleDateString() }}</VCardText>
                </VCard>
              </div>
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <UploadNoteDialog v-model:is-dialog-visible="uploadNote" @onnoteuploaded="analytics" />
  </div>
</template>
