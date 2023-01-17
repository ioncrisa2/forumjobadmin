<template>
  <div>
    <section class="section">
      <div class="row">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-body">
              <h3 class="card-title">Semua Daftar Perusahaan</h3>
              <div class="row">
                <div class="col-8">

                  <button type="button" class="btn btn-primary btn-sm" @click="showModal">
                    <i class="fas fa-plus-square"></i> Tambah
                  </button>

                </div>

                <Modal title="Data Baru Perusahaan" ref="thisModal">
                  <template #body>

                    <div class="mb-3">
                      <label for="name" class="form-label">Nama Perusahaan</label>
                      <input type="text" v-model="storeCompany.name" class="form-control" id="name" />
                    </div>

                    <div class="mb-3">
                      <label for="description" class="form-label">Deskripsi Perusahaan</label>
                      <textarea name="description" v-model="storeCompany.description" class="form-control"></textarea>
                    </div>

                    <div class="mb-3">
                      <label for="established" class="form-label">Tanggal Didirikan</label>
                      <input type="date" v-model="storeCompany.established" class="form-control" />
                    </div>

                    <div class="mb-3">
                      <label for="field" class="form-label">Bidang Perusahaan</label>
                      <input type="text" v-model="storeCompany.field" class="form-control" />
                    </div>

                    <div class="row">
                      <div class="col-12">

                        <div class="mb-3">
                          <label for="address" class="form-label">Alamat Perusahaan</label>
                          <textarea name="address" v-model="storeCompany.address" class="form-control"></textarea>
                        </div>

                      </div>
                      <div class="col-6">
                        <div class="mb-3">
                          <label for="country" class="form-label">Negara Asal</label>
                          <input type="text" v-model="storeCompany.country" class="form-control" />
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="mb-3">
                          <label for="state" class="form-label">Provinsi / Negara Bagian</label>
                          <input type="text" v-model="storeCompany.state" class="form-control" />
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="mb-3">
                          <label for="city" class="form-label">Kota</label>
                          <input type="text" v-model="storeCompany.city" class="form-control" />
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="mb-3">
                          <label for="zip" class="form-label">Kode Zip Negara</label>
                          <input type="text" v-model="storeCompany.zip" class="form-control" />
                        </div>
                      </div>

                      <div class="col-12">
                        <div class="mb-3">
                          <label for="website_url" class="form-label">Website Perusahaan (Bila Ada)</label>
                          <input type="text" v-model="storeCompany.website_url" class="form-control" />
                        </div>
                      </div>
                    </div>


                  </template>
                  <template #footer>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                      <button class=" btn btn-primary btn-sm" inputType="submit" @click="submitForm">
                        <i class="fas fa-save"></i> Submit Data
                      </button>
                    </div>
                  </template>
                </Modal>

                <div class="col-12 mt-2 rounded-lg">
                  <table id="table" class="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>Nama Perusahaan</th>
                        <th>Alamat</th>
                        <th>Website Perusahaan</th>
                        <th>Actions</th>
                        <!-- <th>Actions</th> -->
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(company, index) in companies" :key="companies.id">
                        <td>{{ company.name }}</td>
                        <td width="150">{{ company.location.street_address }}</td>
                        <td>
                          <span v-if="(company.website_url == null)" class="badge rounded-pill text-bg-secondary">
                            <i class="bi bi-globe"></i> Belum Tersedia
                          </span>
                          <a v-else :href="urlHelper(company.website_url)" target="_blank">
                            <span class="badge rounded-pill text-bg-dark">
                              <i class="bi bi-globe"></i> {{ company.website_url }}
                            </span>
                          </a>
                        </td>
                        <td>
                          <div class="btn-group">
                            <router-link :to="{ name: 'company.edit', params: { id: company.id } }"
                              class="btn btn-sm btn-primary">
                              <i class="bi bi-eye-fill"></i>
                            </router-link>
                            <button class="btn btn-sm btn-danger" @click="deleteCompany(company.id)">
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

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import Modal from "@/components/Modal.vue";
import "jquery/dist/jquery.js";
import "datatables.net-bs5/js/dataTables.bootstrap5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import $ from "jquery";


const store = useStore();
const router = useRouter();
const companies = ref([]);
let validation = reactive([]);
const thisModal = ref(false);
const showModal = () => thisModal.value.show();
const closeModal = () => thisModal.value.close();
const urlHelper = (url) => `https://${url}`;

onMounted(async () => {
  document.title = "Daftar Perusahaan | Admin";
  await store.dispatch("company/getCompaniesData")
    .then((response) => {
      companies.value = response;
      setTimeout(() => {
        $("#table").DataTable({
          lengthMenu: [20, 50, 100, 200, 500],
          language: { emptyTable: "Data belum tersedia!!" }
        });
      })
    })

});

const storeCompany = reactive({
  name: "",
  description: "",
  field: "",
  established: "",
  website_url: "",
  address: "",
  country: "",
  city: "",
  state: "",
  zip: ""
})

function resetModal() {
  Object.assign(storeCompany, {
    name: "",
    description: "",
    field: "",
    established: "",
    website_url: "",
    address: "",
    country: "",
    state: "",
    city: "",
    zip: ""
  })
}

async function submitForm() {
  let formData = new FormData();
  formData.append("name", storeCompany.name);
  formData.append("description", storeCompany.description);
  formData.append("established", storeCompany.established);
  formData.append("website_url", storeCompany.website_url);
  formData.append("street_address", storeCompany.address);
  formData.append("company_field", storeCompany.field);
  formData.append("country", storeCompany.country);
  formData.append("state", storeCompany.state);
  formData.append("city", storeCompany.city);
  formData.append("zip_code", storeCompany.zip);

  await store.dispatch("company/storeCompanyData", formData)
    .then(() => {
      resetModal();
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
      console.log(validation);
      validation = error.response.data;
    });
}

function deleteCompany(id) {
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
  })
    .then(async (result) => {
      if (result.isConfirmed) {
        await store.dispatch("company/deleteCompanyData", id)
          .then(() => {
            Swal.fire({
              title: 'BERHASIL!',
              text: "Data Berhasil Dihapus!",
              icon: 'success',
              showConfirmButton: false,
              timer: 1000
            });
            router.push({ name: "company" });
          });
      }
    })
}
</script>