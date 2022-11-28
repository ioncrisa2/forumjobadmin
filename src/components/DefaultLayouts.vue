<script setup>
import Header from "./Header.vue";
import Sidebar from "./Sidebar.vue";
import Footer from "./Footer.vue";
</script>

<template>
  <div>
    <Header />
    <Sidebar />
    <!-- End Sidebar-->
    <main id="main" class="main">
      <router-view></router-view>
    </main>
    <Footer />
  </div>
</template>