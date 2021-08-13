<template>
  <v-card class="pa-6" id="signin" style="width: 100%">
    <header>
      <h1>Signup</h1>
      <p>Insert your credentials to signup</p>
    </header>
    <ValidationObserver v-slot="{ invalid }" ref="observer">
      <div class="form">
        <template>
          <v-text-field
            v-model="userName"
            name="userName"
            label="Insert your name"
          ></v-text-field>
          <ValidationProvider rules="required" v-slot="{ errors }">
            <v-text-field
              v-model="email"
              name="email"
              label="Insert email"
              :error-messages="errors[0]"
            ></v-text-field>
          </ValidationProvider>
          <ValidationProvider vid="password" rules="required" v-slot="{ errors }">
            <v-text-field
              id="password"
              name="password"
              v-model="password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              label="Insert password"
              :error-messages="errors[0]"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </ValidationProvider>
          <ValidationProvider
            rules="required|confirmed:password"
            data-vv-as="password"
            v-slot="{ errors }"
          >
            <v-text-field
              id="confirm-password"
              name="confirm-password"
              label="Confirm your password"
              v-model="repeatValue"
              :error-messages="errors[0]"
              :append-icon="repeatPassIsHidden ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="repeatPassIsHidden = !repeatPassIsHidden"
              :type="repeatPassIsHidden ? 'password' : 'text'"
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
import AuthService, {SignupData} from "@/services/authService";

export default Vue.extend({
  name: "Signup",
  components: {

  },
  data() {
    return {
      userName: "",
      email: "",
      password: "",
      repeatValue: "",
      repeatPassIsHidden: false,
      showPassword: false,
      loading: false
    };
  },
  methods: {
    async onSubmit(): Promise<void> {
      this.loading = true;
      try {
        await AuthService.signup({
          password: this.password,
          username: this.userName,
          email: this.email
        } as SignupData);
        this.$store.dispatch("notifications/displayNotification", {
          type: "success",
          message: "You are successfully registered"
        });
        await this.$router.push("/signin");
      } catch (e) {
        this.$store.dispatch("notifications/displayNotification", {
          type: "error",
          message: "Something went wrong. Try later."
        });
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