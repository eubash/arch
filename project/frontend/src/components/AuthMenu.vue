<template>
  <div class="auth-menu float-right">
    <div v-if="!isAuthenticated">
      <a style="cursor: pointer;" class="text-decoration-underline menu-item" @click="navigate('/signin')">Signin </a>
      <span style="color: white;"> / </span>
      <a style="cursor: pointer;" class="text-decoration-underline menu-item" @click="navigate('/signup')"> Signup</a>
    </div>
    <div v-if="isAuthenticated">
      <a style="cursor: pointer;" class="text-decoration-underline menu-item" @click="logout">Logout</a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AuthService from "@/services/authService";
import store from "@/store";

export default Vue.extend({
  name: "AuthMenu",

  data: () => ({
  }),
  computed: {
    isAuthenticated(): boolean {
      return store.getters["session/token"];
    }
  },
  watch: {
    isAuthenticated: function(newVal) {
      return newVal;
    }
  },
  methods: {
    async logout() {
      await AuthService.logout();
    },
    navigate(path: string): void {
      if(this.$route.path !== path) {
        this.$router.push(path);
      }
    }
  }
});
</script>

<style lang="scss" scoped>
  .menu-item {
    color: white;
    &:hover {
      color: #4990e2;
    }
}
</style>