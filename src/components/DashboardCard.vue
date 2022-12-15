<script setup>
defineProps({
  title: String,
  count: Number,
  icon: String,
});
</script>

<template>
  <div class="card info-card sales-card">
    <div class="card-body">
      <h5 class="card-title">{{ title }}</h5>

      <div class="d-flex align-items-center">
        <div
          class="
            card-icon
            rounded-circle
            d-flex
            align-items-center
            justify-content-center
          "
        >
          <i class="bi" :class="icon"></i>
        </div>
        <div class="ps-3">
          <h6>{{ count }}</h6>
        </div>
      </div>
    </div>
  </div>
</template>