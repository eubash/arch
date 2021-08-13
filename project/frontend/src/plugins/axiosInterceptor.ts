import axios from "axios";
import store from "@/store";
import AuthService from "@/services/authService";
import configService from "@/services/configService";
import router from "@/router/index";


export default function start(): void {
  axios.interceptors.request.use(
    async (config) => {
      config.headers["Content-Type"] = "application/json";
      config.headers.Accept = "application/json";
      if (!config.url?.split("/").includes("auth")) {
        let token = AuthService.getTokenData();
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (!error.response) {
        return Promise.reject(error);
      }
      if (error.response.status === 401) {
        store.dispatch("session/logout");
        router.push("/auth");
      }
      return Promise.reject(error);
    }
  );
}
