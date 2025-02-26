<script setup lang="ts">
    import axios from 'axios';
    import { onMounted, reactive } from 'vue';
    import { RouterLink, useRoute, useRouter } from 'vue-router';
    import { useToast } from 'vue-toastification';

    const router = useRouter();
    const route = useRoute();
    const id = route.params.id;
    const toast = useToast();

    const job = reactive({
        id: '',
        title: '',
        type: '',
        location: '',
        description: '',
        salary: '',
        company: {
            name: '',
            description: '',
            contactEmail: '',
            contactPhone: ''
        }
    })

    onMounted(async ()=>{
        try{
            const response = await axios.get(`http://localhost:5000/jobs/${id}`);
            job.id = response.data.id
            job.title = response.data.title
            job.type = response.data.type
            job.location = response.data.location
            job.description = response.data.description
            job.salary = response.data.salary
            job.company.name = response.data.company.name
            job.company.description = response.data.company.description
            job.company.contactEmail = response.data.company.contactEmail
            job.company.contactPhone = response.data.company.contactPhone
        }catch(e){
            toast.error('Failed to load job details');
        }
    });

    const deleteJob = async () => {
        try{
            await axios.delete(`http://localhost:5000/jobs/${id}`);
            toast.success('Job deleted successfully');
            router.push('/');
        }catch(e){
            toast.error('Job failed to delete');
        }
    }
</script>

<template>
    <section class="w-full">
        <div class="container m-auto py-6 px-6">
            <RouterLink to="/jobs" class="text-green-500 hover:text-green-600 flex items-center">
                <i class="fas fa-arrow-left mr-2"></i> Back to Job Listings
            </RouterLink>
        </div>
    </section>

    <section class="w-full bg-green-50">
        <div class="container m-auto py-10 px-6">
            <div class="flex flex-col md:flex-row items-center justify-start md:items-start justify-between">
                <main class="w-full md:w-[55%] lg:w-[60%]">
                    <div
                    class="bg-white p-6 rounded-lg shadow-md text-center md:text-left"
                    >
                    <div class="text-gray-500 mb-4">{{ job.type }}</div>
                    <h1 class="text-3xl font-bold mb-4">{{ job.title }}</h1>
                    <div
                        class="text-gray-500 mb-4 flex align-middle justify-center md:justify-start"
                    >
                        <i
                        class="fa-solid fa-location-dot text-lg text-orange-700 mr-2"
                        ></i>
                        <p class="text-orange-700">{{ job.location }}</p>
                    </div>
                    </div>

                    <div class="bg-white p-6 rounded-lg shadow-md mt-6">
                    <h3 class="text-green-800 text-lg font-bold mb-6">
                        Job Description
                    </h3>

                    <p class="mb-4">
                        {{ job.description }}
                    </p>

                    <h3 class="text-green-800 text-lg font-bold mb-2">Salary</h3>

                    <p class="mb-4">{{ job.salary }}</p>
                    </div>
                </main>

                <!-- Sidebar -->
                <aside class="w-full md:w-[40%] lg:w-[35%]">
                    <!-- Company Info -->
                    <div class="bg-white p-6 rounded-lg shadow-md">
                    <h3 class="text-xl font-bold mb-6">Company Info</h3>

                    <h2 class="text-2xl">{{ job.company.name }}</h2>

                    <p class="my-2">
                        {{ job.company.description }}
                    </p>

                    <hr class="my-4" />

                    <h3 class="text-xl">Contact Email:</h3>

                    <p class="my-2 bg-green-100 p-2 font-bold text-sm lg:text-md">
                        {{ job.company.contactEmail }}
                    </p>

                    <h3 class="text-xl">Contact Phone:</h3>

                    <p class="my-2 bg-green-100 p-2 font-bold text-sm lg:text-md">{{ job.company.contactPhone }}</p>
                    </div>

                    <!-- Manage -->
                    <div class="bg-white p-6 rounded-lg shadow-md mt-6">
                        <h3 class="text-xl font-bold mb-6">Manage Job</h3>
                        <RouterLink :to="`/editjob/${id}`" class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                            Edit Job
                        </RouterLink>
                        <button @click="deleteJob" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                            Delete Job
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    </section>
</template>