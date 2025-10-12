<template>
    <div class="quiz-wrapper">
        <h1>Your Quizzes</h1>
        <h3>Test your knowledge with AI-generated quizzes.</h3>


        <VRow v-if="quizzes.length" class="mt-5">
            <VCol cols="12" md="6" lg="4" v-for="quiz in quizzes" :key="quiz.id">
                <VCard class="pa-4">
                    <h2>{{ quiz.title }}</h2>
                    <VBtn color="primary" class="mt-3" @click="takeQuiz(quiz.id)">Take Quiz</VBtn>
                </VCard>
            </VCol>
        </VRow>
        <VRow v-else class="my-5">
            <VAlert type="error" class="mb-4" colored-border>
                <VCol cols="12" class="text-center">
                    <p>No quizzes available. Please upload documents to generate quizzes.</p>
                </VCol>
            </VAlert>

        </VRow>
    </div>
</template>


<script setup>
import axios from '@/utils/axios';
import { onMounted } from 'vue';


const quizzes = ref([]);

const fetchQuiz = () => {
    axios.get('/studyplan/get_allquiz')
        .then((res) => {
            quizzes.value = res.data.data;
            console.log('Quix data:', res.data);
        })
        .catch((error) => {
            console.error('Error fetching Quiz:', error);
        });
};

onMounted(() => {
    fetchQuiz();
});
</script>
