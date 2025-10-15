<template>
    <div class="notes-wrapper">
        <h1>YOUR NOTE</h1>
        <h3>Access And Review Your AI Organized study notes</h3>

        <VRow class="mt-5" dense>
            <VCol cols="12" v-for="note in study_notes.study_notes" :key="note.id">
                <VCard class="pa-4">
                    <VCardTitle>{{ note.topic }}</VCardTitle>
                    <hr class="my-3">
                    <VCardText>
                        {{ note.note }}
                        <div v-if="note.examples" class="mt-4">
                            <h3>Examples:</h3>
                            <hr class="my-3">
                            <ul>
                                <li v-for="(example, index) in note.examples" :key="index">{{ example }}</li>
                            </ul>

                        </div>
                    </VCardText>
                </VCard>
            </VCol>

            <VCol cols="12" class="mt-4" v-if="!study_notes.quiz_exists">
                <VBtn color="primary" style="width: 100%; height: 50px; border-radius: 10px;" @click="generateQuiz"
                    :loading="quizloading" :disabled="quizloading">
                    Generate Quiz</VBtn>
            </VCol>
        </VRow>
    </div>
</template>

<script setup>
import axios from '@/utils/axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const study_notes = ref([]);
const route = useRoute();
const quizloading = ref(false);


const fetchNotes = () => {
    const { id } = route.params;

    axios.get(`/studyplan/get_simplified_notes/${id}`)
        .then((res) => {
            study_notes.value = res.data.data;
            console.log('Notes data:', res.data);
        })
        .catch((error) => {
            console.error('Error fetching notes:', error);
        });
};


const generateQuiz = () => {
    quizloading.value = true;
    const { id } = route.params;

    axios.post(`/studyplan/generate_quiz/${id}`)
        .then((res) => {
            study_notes.value.quiz_exists = true;
            console.log('Quiz generation response:', res.data);
        })
        .catch((error) => {
            console.error('Error generating quiz:', error);
        })
        .finally(() => {
            quizloading.value = false;
        });
};

onMounted(() => {
    fetchNotes();
});
</script>
