<template>
  <v-card class="pa-6" id="signin" style="width: 100%">
    <header>
      <h1>Signin</h1>
      <p>Insert your credentials to signin</p>
    </header>
    <ValidationObserver v-slot="{ invalid }" ref="observer">
      <div class="form">
        <template>
          <ValidationProvider rules="required" v-slot="{ errors }">
            <v-text-field
              v-model="email"
              name="email"
              label="Insert email"
              :error-messages="errors[0]"
            ></v-text-field>
          </ValidationProvider>
          <ValidationProvider rules="required" v-slot="{ errors }">
            <v-text-field
              v-model="password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              name="password"
              label="Insert password"
              :error-messages="errors[0]"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </ValidationProvider>
        </template>
      </div>
      <footer>
        <v-btn
          class="btn-signin"
          color="primary"
          :disabled="invalid || loading"
          :loading="loading"
          @click="onSubmit"
        >
          Submit
        </v-btn>
      </footer>
    </ValidationObserver>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import AuthService, { SigninData } from "@/services/authService";
import store from "@/store";

export default Vue.extend({
  name: "Signin",
  components: {

  },
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      loading: false
    };
  },
  methods: {
    async onSubmit(): Promise<void> {
      this.loading = true;
      try {
        const data = {
          email: this.email,
          password: this.password,
        } as SigninData;
        const token = await AuthService.signin(data);
        const userId: string = await AuthService.getUser();
        await store.dispatch("session/login", {
          user: { id: userId },
          tokenData: token,
        });
        await this.$router.push("/configurations");
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
</style>