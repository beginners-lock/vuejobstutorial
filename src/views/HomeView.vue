<script lang="ts" setup>
    import Hero from '../components/Hero.vue';
    import HomeCards from '../components/HomeCards.vue';
    import JobListing from '../components/JobListing.vue';
</script>

<template>
    <Hero/>
    <HomeCards/>
    <JobListing :maxList="3"/>
</template>