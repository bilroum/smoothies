<template>
  <div class="edit-smoothie container">
    <h2>Edit Smoothie: {{this.$route.params.smoothie_slug}}</h2>
  </div>
</template>

<script>
import db from "@/firebase/init";
export default {
  name: "EditSmoothie",

  data() {
    return {};
  }
};
</script>

<style>
</style>