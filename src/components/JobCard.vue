<script setup lang="ts">
    /// <reference types="../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
    import type { JobType } from '../types';
    import { computed, ref, type PropType } from 'vue';

    const sliced = ref(true);

    const props = defineProps({
        job: {
            type: Object as PropType<JobType>,
            required: true
        }
    })

    const truncatedString = computed(()=>{
        if(sliced.value){
            return props.job.description.length > 90 ? props.job.description.slice(0,87)+'...' : props.job.description; 
        }else{
            return props.job.description;
        }
    });

    const toggleSlice = () => {
        sliced.value = !sliced.value;
    }
</script>

<template>
    <div class="bg-white rounded-xl shadow-md relative">
        <div class="p-4">
            <div class="mb-6">
                <div class="text-gray-600 my-2">{{ job.type }}</div>
                <h3 class="text-xl font-bold">{{ job.title }}</h3>
            </div>

            <div class="mb-5">
                {{ truncatedString }}
            </div>

            <span class="w-full flex flex-row items-center justify-between mb-5 text-green-500">
                <h3>{{ job.salary }}</h3>

                <div v-if="job.description.length>90" class="cursor-pointer" @click="toggleSlice()">{{ sliced ? 'More' : 'Less'}}</div>
            </span>

            <div class="flex flex-col lg:flex-row justify-between mb-4">
                <div class="text-orange-700 mb-3">
                    <i class="fa-solid fa-location-dot text-lg"></i>
                    {{ job.location }}
                </div>
                
                <RouterLink :to="`/jobs/${job.id}`" class="h-[36px] bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-center text-sm">
                    Read More
                </RouterLink>
            </div>
        </div>
    </div>
</template>