<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

onMounted(() => (document.title = "Login | Admin"));

const user = reactive({
  email: "",
  password: "",
});

const validation = ref([]);
const store = useStore();

const router = useRouter();

function login() {
  let email = user.email;
  let password = user.password;

  store
    .dispatch("auth/login", {
      email,
      password,
    })
    .then(() => router.push({ name: "dashboard" }))
    .catch(error => {
      validation.value = error;
      console.log(validation.value);
    });
}

</script>

<template>
  <main>
    <section
      class="
        section
        min-vh-100
        d-flex
        flex-column
        align-items-center
        justify-content-center
        py-4
      "
    >
      <div class="container">
        <div class="row justify-content-center">
          <div
            class="
              col-lg-4 col-md-6
              d-flex
              flex-column
              align-items-center
              justify-content-center
            "
          >
            <div class="card mb-3">
              <div class="card-body">
                <div class="pt-4 pb-2">
                  <h5 class="card-title text-center pb-0 fs-4">
                    Login to System
                  </h5>
                </div>

                <div v-if="validation.message" class="mt-2 alert alert-danger">
                  {{ validation.message }}
                </div>

                <form @submit.prevent="login" class="row">
                  <div class="col-12">

                    <div class="form-floating mb-2 mt-2">
                      <input
                        type="email"
                        class="form-control"
                        v-model="user.email"
                        id="floatingInvalid"
                        placeholder="Email"
                        style="outline: none; box-shadow: none"
                      />
                      <label for="floatingInvalid">Email address</label>
                    </div>

                    <div class="form-floating">
                      <input
                        type="password"
                        v-model="user.password"
                        class="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                        style="outline: none; box-shadow: none"
                      />
                      <label for="floatingPassword">Password</label>
                    </div>

                  </div>

                  <div class="col-12 mt-4">
                    <button class="btn btn-primary btn-lg w-100" type="submit">
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>