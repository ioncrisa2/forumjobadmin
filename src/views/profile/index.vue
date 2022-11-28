<script setup>
import { computed, onMounted, reactive, ref } from "@vue/runtime-core";
import store from "@/store";
import { useRouter } from "vue-router";

onMounted(() => (document.title = "Profile | Admin"));

let edit = ref(false);
const validation = ref([]);
const router = useRouter();
const user = reactive({
  username: "",
  email: "",
  status: ""
});

const password = reactive({
  old: "",
  new: "",
  new_confirm: ""
});


onMounted(() => {
  const data = store.state.auth.user;
  if (data) Object.assign(user, data);
});

const enableEdit = () => edit.value = !edit.value;


function update() {
  console.log(user);
}

function updatePassword(){
  console.log(password);
}
</script>
<template>
  <div class="pagetitle">
    <h1>Profile</h1>
  </div>
  <section class="section profile">
    <div class="row">

      <div class="col-lg-6 col-md-12">
        <form @submit.prevent="update">
        <div class="card">
          <div class="card-header">
            <div class="d-grid d-md-flex justify-content-between">
              <h6>Data Pengguna</h6>
              <div class="d-grid d-md-flex align-content-center justify-content-end gap-2">
                <div v-if="edit == true">
                  <button type="submit" class="btn btn-primary btn-sm">
                    <i class="fas fa-save"></i> Save
                  </button>
                </div>
                <button type="button" class="btn btn-sm" :class="[edit === false ? 'btn-warning' : 'btn-danger']" @click="enableEdit">
                  <i class="far" :class="[edit === false ? 'fa-edit' : 'fa-window-close']"></i> 
                    {{ edit === false ? 'Edit' : 'Cancel' }}
                </button>
              </div>
            </div>
          </div>
          <div class="card-body p-3">

              <div class="row g-3">
                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="text" name="email" class="form-control" :disabled="!edit" v-model="user.email" id="email" placeholder="Enter Email Here">
                    <label for="email">Alamat Email</label>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="text" name="username" class="form-control" :disabled="!edit" v-model="user.username" id="username" placeholder="Enter Username Here">
                    <label for="username">Nama Pengguna</label>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="text" name="status" disabled class="form-control" :disabled="!edit" v-model="user.status">
                    <label for="floatingName">Status</label>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </form>
      </div>

      <div class="col-lg-6 col-md-12">
        <form @submit.prevent="updatePassword">
        <div class="card">
          <div class="card-header">
            <div class="d-grid align-content-center d-md-flex justify-content-between">
              <h6>Ganti Password</h6>
              <button class="btn btn-primary btn-sm" type="submit">
                <i class="fas fa-save"></i> Save
              </button>
            </div>
          </div>
          <div class="card-body p-3">

            <div class="row g-3">
              <div class="col-md-12">
                <div class="form-floating">
                  <input type="password" autocomplete="old-password" name="old_password"  class="form-control" v-model="password.old"  placeholder="insert your old password">
                  <label for="floatingName">Password Lama</label>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-floating">
                  <input type="password" autocomplete="new-password" name="new_password" class="form-control" v-model="password.new" placeholder="insert your old password">
                  <label for="floatingName">Password Baru</label>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-floating">
                  <input type="password" autocomplete="new-password-confirm" name="new_passsword_confirm" class="form-control" v-model="password.new_confirm" placeholder="insert your old password">
                  <label for="floatingName">Konfirmasi Password Baru</label>
                </div>
              </div>
            </div>
              
            </div>
          </div>
        </form>
      </div>

    </div>
  </section>
</template>