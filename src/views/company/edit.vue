<template lang="">
    <div>
        <section class="section">
            <div class="row">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-body">
                            <h3 class="card-title"> <i class="bi bi-building"></i> Detail Data {{ title }}</h3>

                            <hr>

                            <form @submit.prevent="submitEdit">
                                
                                <div class="mb-3">
                                    <label for="name" class="form-label">Nama Perusahaan</label>
                                    <input type="text" class="form-control" v-model="company.name" />
                                </div>

                                <div class="mb-3">
                                    <label for="description" class="form-label">Nama Perusahaan</label>
                                   <textarea v-model="company.description" class="form-control"></textarea>
                                </div>

                                <div class="mb-3">
                                    <label for="established" class="form-label">Tahun Didirikan</label>
                                    <input type="date" class="form-control" v-model="company.established" />
                                </div>

                                <div class="mb-3">
                                    <label for="field" class="form-label">Bidang Perusahaan</label>
                                    <input type="text" class="form-control" v-model="company.field" />
                                </div>

                                <div class="mb-3">
                                    <label for="address" class="form-label">Alamat Perusahaan</label>
                                   <textarea v-model="company.address" class="form-control"></textarea>
                                </div>

                                <div class="row">
                                    <div class="col-6">
                                        <div class="mb-3">
                                            <label for="country" class="form-label">Negara Asal</label>
                                            <input type="text" class="form-control" v-model="company.country" />
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="mb-3">
                                            <label for="state" class="form-label">Provinsi / State</label>
                                            <input type="text" class="form-control" v-model="company.state" />
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-6">
                                        <div class="mb-3">
                                            <label for="city" class="form-label">Kota</label>
                                            <input type="text" class="form-control" v-model="company.city" />
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="mb-3">
                                            <label for="zip" class="form-label">Kode Zip</label>
                                            <input type="text" class="form-control" v-model="company.zip" />
                                        </div>
                                    </div>
                                </div>

                                <div class="mb-3">
                                    <label for="website" class="form-label">Website</label>
                                    <input type="text" class="form-control" v-model="company.website_url">
                                </div>

                                <div class="d-grid gap-1 d-md-flex justify-content-md-start">
                                    <router-link :to="{name: 'company'}" class="btn btn-secondary me-md-2" type="button">Kembali</router-link>
                                    <button class="btn btn-primary" type="submit">Edit</button>
                                </div>


                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script setup>
import { reactive, ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import Swal from "sweetalert2";

const store = useStore();
const route = useRoute();
const router = useRouter();

const validation = ref([]);

const title = ref('');

const company = reactive({
    name: "",
    description: "",
    field: "",
    established: "",
    website_url: "",
    address: "",
    country: "",
    state: "",
    city: "",
    state: "",
    zip: ""
});

onMounted(async () => {
    await store.dispatch("company/getCompanyData", route.params.id);
    company.name = store.state.company.company.name;
    company.description = store.state.company.company.description;
    company.field = store.state.company.company.company_field;
    company.established = store.state.company.company.established;
    company.website_url = store.state.company.company.website_url;
    company.address = store.state.company.company.location.street_address;
    company.country = store.state.company.company.location.country;
    company.city = store.state.company.company.location.city;
    company.state = store.state.company.company.location.state;
    company.zip = store.state.company.company.location.zip_code;
    title.value = store.state.company.company.name;
});

async function submitEdit() {

    let submitedForm = {
        name: company.name,
        description: company.description,
        company_field: company.field,
        established: company.established,
        website_url: company.website_url,
        street_address: company.address,
        country: company.country,
        state: company.state,
        city: company.city,
        zip_code: company.zip
    }

    await store.dispatch('company/updateCompany', {
        id: route.params.id,
        data: submitedForm
    })
        .then(() => {
            Swal.fire({
                title: 'BERHASIL!',
                text: "Data Berhasil Diupdate!",
                icon: 'success',
                showConfirmButton: false,
                timer: 1000
            })

            router.push({ name: 'company' });
        })
        .catch(error => {
            validation.value = error.response.data;
            console.log(validation);
        });
}


</script>
