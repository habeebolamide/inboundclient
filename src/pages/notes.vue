<template>
    <div class="notes-wrapper">
        <h1>YOUR NOTES</h1>
        <h3>Access And Review Your AI Organized study notes</h3>

        <VRow class="mt-5" dense>
            <VCol cols="12" md="6" lg="4" v-for="note in notes" :key="note.id">
                <VCard class="pa-4">
                    <h2>{{ note.course_title }} ({{ note.course_code }})</h2>
                    <p>{{ note.course_description }}</p>
                    <VBtn color="primary" class="mt-3" @click="viewNote(note.id)">View Note</VBtn>
                </VCard>
            </VCol>
        </VRow>
    </div>
</template>

<script setup>
import axios from '@/utils/axios';
import { onMounted } from 'vue';


const notes = ref([]);

const fetchNotes = () => {
    axios.get('/studyplan/get_all_study_notes')
        .then((res) => {
            notes.value = res.data.data;
            console.log('Notes data:', res.data);
        })
        .catch((error) => {
            console.error('Error fetching notes:', error);
        });
};

onMounted(() => {
    fetchNotes();
});
</script>
