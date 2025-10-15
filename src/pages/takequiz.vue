<template>
    <div>
        <h1>QUIZ</h1>
        <h3>Make sure to Answer Correctly</h3>

        <VRow class="mt-5" dense>
            <VCol cols="12" lg="6" v-for="(question, index) in questions.questions" :key="question.id">
                <VCard class="pa-4">
                    <VCardText>
                        {{ question.question }}
                    </VCardText>

                    <!-- Loop through options and create radio buttons -->
                    <VCardTitle>
                        <VRadioGroup v-model="selectedAnswers[question.id]" column>
                            <VRadio v-for="(option, optionIndex) in question.options" :key="optionIndex" :label="option"
                                :value="option" />
                        </VRadioGroup>
                    </VCardTitle>
                </VCard>
            </VCol>
        </VRow>


        <VCol cols="12" class="mt-4">
            <VBtn @click="submitQuiz" style="width: 100%; height: 50px; border-radius: 10px;" color="primary"
                :loading="loading" :disabled="loading">Submit
            </VBtn>
        </VCol>
    </div>
</template>

<script setup>
import axios from '@/utils/axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { toast } from 'vue3-toastify';

const questions = ref([]);
const selectedAnswers = ref({});
const route = useRoute();
const loading = ref(false)
const router = useRouter()


const fetchQuestions = () => {
    const { id } = route.params;
    axios.get(`/studyplan/get_quiz/${id}`)
        .then((res) => {
            questions.value = res.data.data;
            console.log('Quiz questions:', res.data);
        })
        .catch((error) => {
            console.error('Error fetching Quiz:', error);
        });
}

const submitQuiz = () => {
    loading.value = true;
    if (Object.keys(selectedAnswers.value).length !== questions.value.questions.length) {
        toast.error('Please answer all questions before submitting.', {
            position: 'top-right',
            autoClose: 1000,
        })
        return;
    }

    // Format selected answers for submission
    const formattedAnswers = Object.entries(selectedAnswers.value).map(([questionId, selectedAnswer]) => ({
        question_id: questionId,
        selected_answer: selectedAnswer,
    }));

    const data = {
        quiz_id: route.params.id,
        selected_answers: formattedAnswers,
    };

    console.log(formattedAnswers, "formatted Answers");
    console.log(data, "Payload");


    axios.post('/studyplan/submit_quiz', data)
        .then((res) => {
            toast.success('Quiz submitted', {
                position: 'top-right',
                autoClose: 2000,
            })

            router.push(`/quizzes`)
        })
        .catch((error) => {
            console.error('Error submitting Quiz:', error);
        })
        .finally(() => {
            loading.value = false
        });
};

onMounted(() => {
    fetchQuestions();
});
</script>
