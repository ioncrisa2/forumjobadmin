<script setup>
import { computed, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
import DashboardCard from "../../components/DashboardCard.vue";

onMounted(() => (document.title = "Dashboard | Admin"));

const store = useStore();
store.dispatch("dashboard/dashboardData");

const data = computed(() => store.state.dashboard.data);
</script>

<template>
  <div>
    <div class="pagetitle text-center mb-4 mt-3">
      <h1>Welcome Admin to Dashboard</h1>
    </div>
    <section class="section dashboard">
      <div class="row">
        <div class="col-lg-12">
          <div class="row">
            <!-- Dashboard Card -->
            <div class="col-md-4 col-sm-6 col-12">
              <DashboardCard
                title="Total Pekerjaan"
                :count="data.job"
                icon="bi-briefcase-fill"
              />
            </div>

            <div class="col-md-4 col-sm-6 col-12">
              <DashboardCard
                title="Total Perusahaan"
                :count="data.company"
                icon="bi-building"
              />
            </div>

            <div class="col-md-4 col-sm-6 col-12">
              <DashboardCard
                title="Total Pengguna"
                :count="data.user"
                icon="bi-people-fill"
              />
            </div>

            <!-- End Dashboard Card -->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
