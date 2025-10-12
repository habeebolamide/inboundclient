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

  <VerticalNavLink :item="{
    title: 'Account Settings',
    icon: 'bx-user',
    to: '/account-settings',
  }" />




  <!--
    <VerticalNavLink
    :item="{
    title: 'Error',
    icon: 'bx-info-circle',
    to: '/no-existence',
    }"
    /> 
  -->

  <!-- 👉 User Interface -->
  <!-- <VerticalNavSectionTitle :item="{
    heading: 'User Interface',
  }" />
  <VerticalNavLink :item="{
    title: 'Typography',
    icon: 'bx-text',
    to: '/typography',
  }" />
  <VerticalNavLink :item="{
    title: 'Icons',
    icon: 'bx-package',
    to: '/icons',
  }" />
  <VerticalNavLink :item="{
    title: 'Cards',
    icon: 'bx-credit-card',
    to: '/cards',
  }" /> -->

  <!-- 👉 Forms & Tables -->
  <!-- <VerticalNavSectionTitle :item="{
    heading: 'Forms & Tables',
  }" />
  <VerticalNavLink :item="{
    title: 'Form Layouts',
    icon: 'bx-layout',
    to: '/form-layouts',
  }" />
  <VerticalNavLink :item="{
    title: 'Tables',
    icon: 'bx-table',
    to: '/tables',
  }" /> -->

  <!-- 👉 Others -->
  <!--
    <VerticalNavSectionTitle
    :item="{
    heading: 'Others',
    }"
    /> 
  -->
  <!--
    <VerticalNavLink
    :item="{
    title: 'Access Control',
    icon: 'bx-command',
    href: 'https://demos.themeselection.com/sneat-vuetify-vuejs-admin-template/demo-1/access-control',
    target: '_blank',
    badgeContent: 'Pro',
    badgeClass: 'bg-light-primary text-primary',
    }"
    />
    <VerticalNavLink
    :item="{
    title: 'Documentation',
    icon: 'bx-file',
    href: 'https://demos.themeselection.com/sneat-vuetify-vuejs-admin-template/documentation/',
    target: '_blank',
    }"
    />
    <VerticalNavLink
    :item="{
    title: 'Raise Support',
    href: 'https://github.com/themeselection/sneat-vuetify-vuejs-admin-template-free/issues',
    icon: 'bx-phone',
    target: '_blank',
    }"
    /> 
  -->
</template>
