<script setup>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
const username = store.state.auth.user.username;
//for toggle sidebar
let showMenu = ref(false);
//function for toggle sidebar
function toggleMenu() {
  showMenu.value = !showMenu.value;
  let body = document.body;
  showMenu.value
    ? body.classList.add("toggle-sidebar")
    : body.classList.remove("toggle-sidebar");
}

function logout() {
  store.dispatch("auth/logout").then(() => {
    router.push({ name: "login" });
  });
}
</script>

<template>
  <header id="header" class="header fixed-top d-flex align-items-center">
    <div class="d-flex align-items-center justify-content-between">
      <a href="index.html" class="logo d-flex align-items-center">
        <img src="assets/img/logo.png" alt="" />
        <span class="d-none d-lg-block">Admin Job Info</span>
      </a>
      <i @click="toggleMenu" class="bi bi-list toggle-sidebar-btn"></i>
    </div>
    <!-- End Logo -->

    <nav class="header-nav ms-auto">
      <ul class="d-flex align-items-center">
        <li class="nav-item dropdown pe-3">
          <a
            class="nav-link nav-profile d-flex align-items-center pe-0"
            href="#"
            data-bs-toggle="dropdown"
          >
            <span class="d-none d-md-block dropdown-toggle ps-2">
              {{ capitalEachWord(username) }}
            </span>
          </a>

          <ul
            class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile"
          >
            <li>
              <router-link
                :to="{ name: 'profile' }"
                class="dropdown-item d-flex align-items-center"
              >
                <i class="bi bi-person"></i>
                <span>Profile</span>
              </router-link>
            </li>
            <li>
              <hr class="dropdown-divider" />
            </li>

            <li style="cursor: pointer">
              <a
                @click="logout"
                class="dropdown-item d-flex align-items-center"
              >
                <i class="bi bi-box-arrow-right"></i>
                <span>Sign Out</span>
              </a>
            </li>
          </ul>
          <!-- End Profile Dropdown Items -->
        </li>
        <!-- End Profile Nav -->
      </ul>
    </nav>
    <!-- End Icons Navigation -->
  </header>
</template>