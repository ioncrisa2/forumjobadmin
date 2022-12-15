<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const router = useRouter();
const store = useStore();

const navigation = [
  {
    name: "Dashboard",
    to: { name: "dashboard" },
    icons: "bi-person"
  },
  {
    name: "Perusahaan",
    to: { name: "company" },
    icons: "bi-building"
  },
  {
    name: "Pekerjaan",
    to: { name: "job" },
    icons: "bi-briefcase",
    type: "menu"
  },
  {
    name: "Profile",
    to: { name: "profile" },
    icons: "bi-person"
  },
];

function logout() {
  Swal.fire({
    title: 'APAKAH ANDA YAKIN INGIN LOGOUT?',
    type: 'warning',
    showCancelButton: !0,
    confirmButtonColor: '#f44336',
    cancelButtonColor: '#0b5ed7',
    confirmButtonText: 'Logout',
    cancelButtonText: 'Batal',
    reverseButtons: !0
  }).then((result) => {
    if (result.isConfirmed) {
      store.dispatch("auth/logout").then(() => {
        router.push({ name: "login" });
      });
    }
  });
}
</script>

<template>
  <aside id="sidebar" class="sidebar">
    <ul class="sidebar-nav" id="sidebar-nav">
      <li v-for="item in navigation" :key="item.name" class="nav-item">
      <li v-if="item.to.name === 'dashboard'" class="nav-heading">Dashboard</li>
      <li v-if="item.to.name === 'company'" class="nav-heading">Menu</li>
      <li v-if="item.to.name === 'profile'" class="nav-heading">Account</li>
      <router-link class="nav-link" :class="[this.$route.name === item.to.name ? '' : 'collapsed']" :to="item.to">
        <i class="bi" :class="item.icons"></i>
        <span>{{ item.name }}</span>
      </router-link>
      </li>
      <li class="nav-item">
        <a class="nav-link collapsed" style="cursor:pointer;" @click="logout">
          <i class="fas fa-sign-out-alt"></i> Keluar
        </a>
      </li>
    </ul>
  </aside>
</template>