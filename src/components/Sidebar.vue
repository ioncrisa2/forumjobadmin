<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();

const navigation = [
  {
    name: "Dashboard",
    to: { name: "dashboard" },
    icons: "bi-person",
    type: "menu",
  },
  {
    name: "Perusahaan",
    to: { name: "company" },
    icons: "bi-building",
    type: "menu",
  },
  {
    name: "Profile",
    to: { name: "profile" },
    icons: "bi-person",
    type: "menu",
  },
];

function logout() {
  store.dispatch("auth/logout").then(() => {
    router.push({ name: "login" });
  });
}
</script>

<template>
  <aside id="sidebar" class="sidebar">
    <ul class="sidebar-nav" id="sidebar-nav">
      <li v-for="item in navigation" :key="item.name" class="nav-item">
        <router-link
          class="nav-link"
          :class="[
            this.$route.name === item.to.name ? '' : 'collapsed',
            item.to.name === 'profile' ? 'd-block d-sm-none' : '',
          ]"
          :to="item.to"
        >
          <i class="bi" :class="item.icons"></i>
          <span>{{ item.name }}</span>
        </router-link>
      </li>
    </ul>
  </aside>
</template>