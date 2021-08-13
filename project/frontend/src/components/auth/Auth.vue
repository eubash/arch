<template>
  <v-row no-gutters justify="space-around">
    <v-col class="d-flex justify-center" sm="5" cols="12">
      <router-view />
    </v-col>
  </v-row>
</template>

<script>
import Vue from "vue";
// import SignIn from "@/components/auth/SignIn";

export default Vue.extend({
  name: "Auth",
  components: {
    // SignIn
  },
})
</script>

<style scoped>

</style>