<script setup>
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue';
</script>

<template>
  <!-- 👉 Dashboards -->
  <VerticalNavLink :item="{
    title: 'Dashboards',
    icon: 'bx-home-smile',
    to: '/dashboard',
  }" />
  <!-- 👉 Apps & Pages -->
  <!-- <VerticalNavSectionTitle :item="{
    heading: 'Pages',
  }" /> -->

  <VerticalNavLink :item="{
    title: 'Notes',
    icon: 'bx-book',
    to: '/notes',
  }" />

  <VerticalNavLink :item="{
    title: 'Quizzes',
    icon: 'bx-brain',
    to: '/quizzes',
  }" />

</template>
