<template>
  <div>
    <base-header />
    <div class="mt-16">
      <v-row no-gutters justify="space-around">
        <v-col class="d-flex justify-center" sm="5" cols="12">
          <sign-in v-if="this.$route.name === 'Signin'" />
          <signup v-if="this.$route.name === 'Signup'" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import BaseHeader from "../components/BaseHeader.vue";
import SignIn from "@/components/auth/SignIn.vue";
import Signup from "@/components/auth/Signup.vue";

export default Vue.extend({
  name: "Home",

  components: {
    Signup,
    BaseHeader,
    SignIn
  },
});
</script>
