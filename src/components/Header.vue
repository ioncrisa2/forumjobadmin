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
</script>

<template>
  <header id="header" class="header fixed-top d-flex align-items-center">
    <div class="d-flex align-items-center justify-content-between">
      <a href="index.html" class="logo d-flex align-items-center">
        <!-- <img src="assets/img/logo.png" alt="" /> -->
        <span class="d-none d-lg-block">Admin Job Info</span>
      </a>
      <i @click="toggleMenu" class="bi bi-list toggle-sidebar-btn"></i>
    </div>
    <!-- End Logo -->

    <nav class="header-nav ms-auto">
      <ul class="d-flex align-items-center">
        <li class="nav-item pe-3">
          <div class="nav-link nav-profile d-flex align-items-center pe-0">
            Hello {{ username }}
          </div>
          <!-- End Profile Dropdown Items -->
        </li>
        <!-- End Profile Nav -->
      </ul>
    </nav>
    <!-- End Icons Navigation -->
  </header>
</template>