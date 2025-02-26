<script setup lang="ts">
    import axios from 'axios';
    import JobCard from './JobCard.vue';
    import { onMounted, reactive, ref } from 'vue';
import type { JobType } from '../types';

    defineProps({
        showfilter: {
            type: Boolean,
            default: false
        },
        maxList: Number
    })

    const filterText = ref('');
    const state = reactive({
        jobs: [] as JobType[],
        filteredjobs: [] as JobType[],
        loading: true
    });

    const jobFilterFunction = (e: Event) => {
        state.filteredjobs = state.jobs.filter((job)=>{ return job.title.toLowerCase().includes(filterText.value.toLowerCase());  })
    }

    onMounted(async ()=>{
        try{
            const response = await axios.get('http://localhost:5000/jobs');
            state.jobs = response.data;
        }catch(e){
            state.jobs = [];
        }finally{
            state.loading = false;
        }
    })
</script>

<template>
    <section class="w-full bg-green-50 px-4 py-10">
        <!--Job filter input tag-->
        <section v-if="showfilter" class="bg-green-50 py-4">
        <div class="container mx-auto px-4">
            <div class="relative">
            <input
                @input="jobFilterFunction($event)"
                type="text"
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                placeholder="Filter jobs..."
                v-model="filterText"
            />
            </div>
        </div>
        </section>

        <!--For the job list-->
        <div class="container-xl lg:container m-auto">
            <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
                Browse Jobs
            </h2>

            <div v-if="state.loading" class="text-center w-full text-xl font-semibold">
                Loading...
            </div>

            <div v-else>
                <!--Shows all the jobs-->
                <div v-if="state.jobs.length>0 && filterText===''" class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <JobCard v-for="job in state.jobs.slice(0, maxList)" :job="job"/>
                </div>

                <!--Shows jobs when a filter is applied-->
                <div v-else-if="state.jobs.length>0 && filterText!==''" class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <JobCard v-for="job in state.filteredjobs.slice(0, maxList)" :job="job"/>
                </div>

                <div v-else class="text-center w-full text-xl font-semibold">
                    No jobs available.
                </div>
            </div>
        </div>
    </section>

    <section  v-if="maxList && state.jobs.length>maxList" class="m-auto max-w-lg my-10 px-6">
        <RouterLink to="/jobs" class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700">
            View All Jobs
        </RouterLink>
    </section>
</template>