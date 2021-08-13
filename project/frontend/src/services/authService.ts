import Vue from "vue";
import axios, { AxiosResponse } from "axios";
import configService from "./configService";
import "@/plugins/vueCookies";
import store from "@/store";
import router from "@/router";

export interface SigninData {
  password: string;
  email: string;
}

export interface SignupData {
  password: string;
  username: string;
  email: string;
}

export default {
  signup(data: SignupData): Promise<AxiosResponse> {
    return axios.post(configService.auth.signupUrl(), data);
  },
  async signin(data: SigninData): Promise<string> {
    const resp = await axios.post(configService.auth.loginUrl(), data);
    //set cookie
    Vue.$cookies.set("token", resp.data.token);
    return resp.data.token;
  },
  async getUser(): Promise<string> {
    const res = await axios.get(configService.auth.woAmIUrl());
    return res.data;
  },
  getTokenData(): string {
    return Vue.$cookies.get("token");
  },
  logout(): void {
    store.dispatch("session/logout");
    Vue.$cookies.remove("token");
    router.push("/signin");
  }
};
