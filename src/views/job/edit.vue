<template>
    <div>
        <section class="section">
            <div class="row">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-body">
                            <h3 class="card-title">
                                <router-link :to="{ name: 'job' }">
                                    <i class="bi bi-arrow-left-square-fill"></i>
                                </router-link> |
                                <i class="fas fa-building"></i> Detail Data Pekerjaan
                                <strong><u>{{ title }}</u></strong>
                            </h3>

                            <hr class="border border-dark border-2 opacity-50">

                            <form @submit.prevent="submit">

                                <div class="mb-3">
                                    <label for="name" class="form-label">Nama Pekerjaan</label>
                                    <input type="text" class="form-control" v-model="job.job_name" />
                                </div>

                                <div class="mb-3">
                                    <label for="description" class="form-label">Deskripsi Tentang Pekerjaan</label>
                                    <textarea v-model="job.job_description" class="form-control"></textarea>
                                    <!-- <McWysiwyg v-model="job.job_description"></McWysiwyg> -->
                                </div>

                                <div class="mb-3">
                                    <div class="row">
                                        <div class="col-6">
                                            <label for="company" class="form-label">Nama Perusahaan</label>
                                            <MultiSelect v-model="job.company_id" label="name" open-direction="bottom"
                                                :searchable="true" :options="companies" track-by="id">
                                                <template #noResult>
                                                    Oops!! something wrong, please reload pages!!
                                                </template>
                                            </MultiSelect>
                                        </div>
                                        <div class="col-6">
                                            <label for="end_date" class="form-label">Batas Waktu Melamar</label>
                                            <input type="date" class="form-control" v-model="job.end_date" />
                                        </div>
                                    </div>
                                </div>

                                <div class="mb-3">
                                    <div class="row">

                                        <div class="col-md-6 col-12">
                                            <div class="mt-1 mb-2">
                                                <p class="mb-0 form-label">Poster (tidak wajib)</p>
                                                <img :src="posterPreview ? posterPreview : job.poster"
                                                    class="img-thumbnail" width="230" />
                                            </div>
                                            <input class=" mb-1" type="file" @change="onFileChange" accept="image/*" />
                                        </div>

                                        <div class="col-md-6 col-12">

                                            <div class="h5 text-dark mt-2">
                                                <div class="d-flex justify-content-between align-items-center">
                                                    <p class="me-auto p-2">Tipe Pekerjaan</p>
                                                    <div class="btn-group btn-group-sm" role="group">
                                                        <button class="d-inline p-2 btn btn-primary small-btn"
                                                            @click="add" type="button">
                                                            <i class="fas fa-plus-square"></i>
                                                        </button>
                                                        <button class="d-inline p-2 btn btn-danger small-btn"
                                                            @click="remove" type="button">
                                                            <i class="fas fa-minus-square"></i>
                                                        </button>
                                                    </div>
                                                </div>

                                                <div v-for="key in count" :key="key" class="mt-2">
                                                    <input type="text" class="form-control"
                                                        :value="typeData[key - 1] ? typeData[key - 1].name : null"
                                                        @change="updateValueData" :id="key" />
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div class="mb-3">
                                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                        <button class="btn btn-primary" type="submit">Edit</button>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import MultiSelect from 'vue-multiselect';
export default {
    components: { MultiSelect }
}
</script>

<script setup>
import { onMounted, reactive, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Swal from "sweetalert2";
import { useStore } from 'vuex';

const store = useStore();
const route = useRoute();
const router = useRouter();

const title = ref('');
const companies = ref([]);
const company = ref([]);
const poster = ref('');
const posterPreview = ref(null);

const count = ref(1);
const typeValue = ref({});
const typeData = ref([]);

const job = reactive({
    job_name: '',
    job_description: '',
    end_date: '',
    company_id: '',
    poster: ''
});

const add = () => count.value++;
const remove = () => count.value--;

function onFileChange(e) {
    let input = e.target;
    if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
            posterPreview.value = e.target.result;
        }
        poster.value = input.files[0];
        job.poster = input.files[0];
        reader.readAsDataURL(input.files[0]);
    }
}

onMounted(async () => {
    await store.dispatch("job/getJobData", route.params.id);
    await store.dispatch("company/getCompaniesData");
    job.job_name = store.state.job.job.job_name;
    job.job_description = store.state.job.job.job_description;
    job.end_date = store.state.job.job.end_date;
    job.company_id = store.state.job.job.company;
    job.poster = store.state.job.job.poster;
    title.value = store.state.job.job.job_name;
    companies.value = await store.state.company.companies.data;
    company.value = await store.state.job.job.company;
    typeData.value = await store.state.job.job.types;
    count.value = typeData.value.length;
    console.log(company.value);
    console.log(companies.value);
    console.log(typeData.value);
});

function updateValueData(event) {
    return typeData.value.push({
        id: parseInt(event.target.id),
        name: event.target.value
    });
}

async function submit() {
    console.log(job.poster);
    let formData = new FormData();
    formData.append('poster', job.poster);
    formData.append('job_name', job.job_name);
    formData.append('job_description', job.job_description);
    formData.append('company_id', job.company_id ? job.company_id.id : '');
    formData.append('end_date', job.end_date);
    formData.append('_method', "PUT");

    let typeValue = Object.values(typeData.value);

    for (let i = 0; i < typeValue.length; i++) {
        formData.append('type[]', typeValue[i].name);
    }

    // for (var pair of formData.entries()) {
    //     console.log(pair[0]+ ', ' + pair[1]); 
    // }

    await store.dispatch("job/updateJobData", {
        id: route.params.id,
        data: formData
    }).then(() => {
        Swal.fire({
            title: 'BERHASIL!',
            text: "Data Berhasil Diupdate!",
            icon: 'success',
            showConfirmButton: false,
            timer: 1000
        })

        router.go();
    }).catch(error => {
        console.log(error);
    })
}


</script>

<style src="vue-multiselect/dist/vue-multiselect.css">

</style>