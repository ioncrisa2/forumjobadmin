<template>
    <div>
        <section class="section">
            <div class="row">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-body">
                            <h3 class="card-title"> Semua Daftar Pekerjaan</h3>
                            <div class="row">
                                <div class="col-8">

                                    <button type="button" @click="showModal" class="btn btn-primary btn-sm">
                                        <i class="fas fa-plus-square"></i> Tambah
                                    </button>

                                    <Modal title="Data Baru Pekerjaan" ref="thisModal">
                                        <template #body>
                                            <div class="mb-3">
                                                <label for="name" class="form-label">Nama Pekerjaan</label>
                                                <input type="text" v-model="storeJob.job_name" class="form-control" />
                                            </div>
                                            <div class="mb-3">
                                                <label for="name" class="form-label">Deskripsi Pekerjaan</label>
                                                <textarea class="form-control"
                                                    v-model="storeJob.job_description"></textarea>
                                            </div>
                                            <div class="mb-3">
                                                <label for="name" class="form-label">Waktu Berlaku Lowongan</label>
                                                <input type="date" class="form-control" v-model="storeJob.end_date" />
                                            </div>
                                            <div class="mb-3">
                                                <label for="formFile" class="form-label">Upload Poster Lowongan</label>
                                                <input class="form-control mb-1" type="file" @change="onFileChange"
                                                    accept="image/*" />
                                                <div v-if="posterPreview">
                                                    <p class="h5 text-dark mt-2">Preview Poster</p>
                                                    <img class="mt-1 img-thumbnail" :src="posterPreview" />
                                                </div>
                                            </div>
                                            <div class="mb-3">
                                                <label for="select" class="form-label">Pilih Perusahaan</label>
                                                <MultiSelect v-model="company" label="name" :options="companies"
                                                    open-direction="bottom" :searchable="true" track-by="id"
                                                    placeholder="Pilih satu nama perusahaan">
                                                </MultiSelect>
                                            </div>
                                            <div class="mb-3">
                                                <div class="h5 text-dark mt-2">
                                                    <div class="d-flex justify-content-between align-items-center">
                                                        <p class="me-auto p-2">Tipe Pekerjaan (Bisa Lebih dari 1)</p>
                                                        <div class="btn-group btn-group-sm" role="group">
                                                            <button class="d-inline p-2 btn btn-primary small-btn"
                                                                @click="addField" type="button">
                                                                <i class="fas fa-plus-square"></i>
                                                            </button>
                                                            <button class="d-inline p-2 btn btn-danger small-btn"
                                                                @click="removeField" type="button">
                                                                <i class="fas fa-minus-square"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div v-for="key in typeCount" :key="key" class="mt-2">
                                                    <input type="text" class="form-control"
                                                        v-model="typeValues[key - 1]" :id="key"
                                                        placeholder="Tambahkan Tipe Pekerjaan" />
                                                </div>
                                            </div>
                                        </template>
                                        <template #footer>
                                            <button type="button" class="btn btn-primary btn-sm"
                                                @click="submit">Submit</button>
                                        </template>
                                    </Modal>

                                </div>

                                <div class="col-12 mt-2 rounded-lg">
                                    <table id="data" class="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Pekerjaan</th>
                                                <th>Perusahaan</th>
                                                <th>Poster</th>
                                                <th>Batas Akhir Lamar</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(job, index) in jobs" :key="job.id">
                                                <td>{{ index + 1 }}</td>
                                                <td>{{ job.job_name }}</td>
                                                <td>{{ job.company.name }}</td>
                                                <td>
                                                    <img :src="job.poster ? job.poster : ''" alt="exampleimg"
                                                        width="180">
                                                </td>
                                                <td>{{ formatDate(job.end_date) }}</td>
                                                <td>
                                                    <div class="btn-group">
                                                        <router-link :to="{ name: 'job.edit', params: { id: job.id } }"
                                                            class="btn btn-primary btn-sm">
                                                            <i class="bi bi-eye-fill"></i>
                                                        </router-link>
                                                        <button class="btn btn-danger btn-sm"
                                                            @click="deleteJob(job.id)">
                                                            <i class="bi bi-trash-fill"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>


                            </div>
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
import { computed, onMounted, reactive, ref } from 'vue';
import Modal from "@/components/Modal.vue";
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import Swal from "sweetalert2";
import "jquery/dist/jquery.js";
import "datatables.net-bs5/js/dataTables.bootstrap5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import $ from "jquery";

const store = useStore();
const route = useRoute();
const router = useRouter();
const value = ref('');
const companies = ref([]);
const company = ref({});
const jobs = ref([]);
const imagePreviewURL = ref(null);
const thisModal = ref(false);
const posterPreview = ref(null);
const poster = ref(null);
let typeCount = ref(1);
let typeValues = ref({});
const showModal = () => thisModal.value.show();
const closeModal = () => thisModal.value.close();
const addField = () => typeCount.value++;
const removeField = () => typeCount.value--;

onMounted(async () => {
    document.title = "Daftar Pekerjaan | Admin";
    await store.dispatch("job/getJobsData")
        .then((response) => {
            jobs.value = response;
            setTimeout(() => {
                $("#data").DataTable({
                    lengthMenu: [5, 10, 20, 50, 100, 200, 500],
                    language: { emptyTable: "Data belum tersedia!!" }
                });
            })
        });
    await store.dispatch("company/getCompaniesData")
        .then((response) => companies.value = response);
});

const storeJob = reactive({
    job_name: '',
    job_description: '',
    end_date: '',
    company_id: '',
    poster: ''
});

async function submit() {
    let formData = new FormData();

    formData.append('job_name', storeJob.job_name);
    formData.append('job_description', storeJob.job_description);
    formData.append('end_date', storeJob.end_date);
    formData.append('poster', storeJob.poster);
    formData.append('company_id', company.value.id);

    let values = Object.values(typeValues.value);

    for (let i = 0; i < values.length; i++) {
        formData.append('type[]', values[i]);
    }

    await store.dispatch("job/storeJobData", formData)
        .then(() => {
            closeModal();
            Swal.fire({
                title: "Success!!",
                text: "Data berhasil ditambahkan!!",
                icon: "success",
                showConfirmButton: false,
                timer: 1500
            });

            router.go();
        }).catch(error => {
            console.log(error.response.data);
        })
}

function onFileChange(e) {
    let input = e.target;
    if (input.files) {
        let reader = new FileReader();
        reader.onload = (e) => {
            posterPreview.value = e.target.result;
        }
        poster.value = input.files[0];
        storeJob.poster = input.files[0];
        reader.readAsDataURL(input.files[0]);
    }
}

function deleteJob(id) {
    Swal.fire({
        title: 'APAKAH ANDA YAKIN ?',
        text: "INGIN MENGHAPUS DATA INI !",
        type: 'warning',
        showCancelButton: !0,
        confirmButtonColor: '#f44336',
        cancelButtonColor: '#0b5ed7',
        confirmButtonText: 'YA, HAPUS!',
        cancelButtonText: 'TIDAK',
        reverseButtons: !0
    }).then(async (result) => {
        if (result.isConfirmed) {
            await store.dispatch("job/deleteJobData", id)
                .then(() => {
                    Swal.fire({
                        title: 'BERHASIL!',
                        text: "Data Berhasil Dihapus!",
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1000
                    });
                    router.go();
                });
        }
    });
}

</script>
<style src="vue-multiselect/dist/vue-multiselect.css">

</style>