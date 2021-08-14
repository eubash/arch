const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;

export default {
  auth: {
    loginUrl(): string {
      return `${API_BASE_URL}/login`;
    },
    woAmIUrl(): string {
      return `${API_BASE_URL}/whoAmI`;
    },
    signupUrl(): string {
      return `${API_BASE_URL}/signup`;
    },
  },
  configurator: {
    getConfigurationsUrl(): string {
      return `${API_BASE_URL}/user-configurations`;
    },
    getCompaniesUrl(): string {
      return `${API_BASE_URL}/companies`;
    },
    getArticulatesUrl(): string {
      return `${API_BASE_URL}/articulates`;
    }
  },
  // admin: {
  //   baseUrl(): string {
  //     return `${API_BASE_URL}/api/${API_VERSION}/users/me`;
  //   },
  //   mfaUrl(): string {
  //     return `${API_BASE_URL}/api/${API_VERSION}/users/me/mfa`;
  //   },
  // },
  // file: {
  //   baseUrl(): string {
  //     return `${API_BASE_URL}/api/${API_VERSION}/files`;
  //   },
  // },
  // pod: {
  //   baseUrl(): string {
  //     return `${API_BASE_URL}/api/${API_VERSION}/pods`;
  //   },
  //   searchUrl(): string {
  //     return `${API_BASE_URL}/api/${API_VERSION}/pods/search`;
  //   },
  //   detailUrl(): string {
  //     return `${API_BASE_URL}/api/${API_VERSION}/pods/:id`;
  //   },
  //   getCommandUrl(): string {
  //     return `${API_BASE_URL}/api/${API_VERSION}/pods/:id`;
  //   },
  //   sendCommandUrl(): string {
  //     return `${API_BASE_URL}/api/${API_VERSION}/pods/:id/start-command`;
  //   },
  //   stopCommandUrl(): string {
  //     return `${API_BASE_URL}/api/${API_VERSION}/pods/:id/stop-command`;
  //   },
  // },
  // countriesUrl(): string {
  //   return `https://restcountries.eu/rest/v2/all`;
  // },
  // dashboardUrl(): string {
  //   return `${API_BASE_URL}/api/${API_VERSION}/dashboard`;
  // },
  // podPoliciesUrl(): string {
  //   return `${API_BASE_URL}/api/${API_VERSION}/pods/:id/policies`;
  // },
  // podApplyPolicyUrl(): string {
  //   return `${API_BASE_URL}/api/${API_VERSION}/pods/:pod-id/policies/:policy-id`;
  // },
  // podRemovePolicyUrl(): string {
  //   return `${API_BASE_URL}/api/${API_VERSION}/pods/:pod-id/policies/:policy-id`;
  // },
  // podApplyAllPolicies(): string {
  //   return `${API_BASE_URL}/api/${API_VERSION}/pods/:id/apply-policies`;
  // },
  // podLastCommandsUrl(): string {
  //   return `${API_BASE_URL}/api/${API_VERSION}/pods/:id/commands`;
  // },
  // licensesSearchUrl(): string {
  //   return `${API_BASE_URL}/api/${API_VERSION}/licenses/search`;
  // },
  // licensesDetailUrl(): string {
  //   return `${API_BASE_URL}/api/${API_VERSION}/licenses/:id`;
  // },
  // licensesDetailSearchUrl(): string {
  //   return `${API_BASE_URL}/api/${API_VERSION}/licenses/:id/search`;
  // },
  // licensesUrl(): string {
  //   return `${API_BASE_URL}/api/${API_VERSION}/licenses`;
  // },
  // usersSearchUrl(): string {
  //   return `${API_BASE_URL}/api/${API_VERSION}/users/search`;
  // },
  // usersUrl(): string {
  //   return `${API_BASE_URL}/api/${API_VERSION}/users`;
  // },
  // tag: {
  //   baseUrl(): string {
  //     return `${API_BASE_URL}/api/${API_VERSION}/tags`;
  //   },
  //   searchUrl(): string {
  //     return `${API_BASE_URL}/api/${API_VERSION}/tags/search`;
  //   },
  // },
  // policy: {
  //   baseUrl(): string {
  //     return `${API_BASE_URL}/api/${API_VERSION}/policies`;
  //   },
  //   groupsUrl(): string {
  //     return `${API_BASE_URL}/api/${API_VERSION}/policies/groups`;
  //   },
  //   searchUrl(): string {
  //     return `${API_BASE_URL}/api/${API_VERSION}/policies/search`;
  //   },
  //   fieldsUrl(): string {
  //     return `${API_BASE_URL}/api/${API_VERSION}/policies/:id/fields`;
  //   },
  // },
  // group: {
  //   baseUrl(): string {
  //     return `${API_BASE_URL}/api/${API_VERSION}/groups`;
  //   },
  //   searchUrl(): string {
  //     return `${API_BASE_URL}/api/${API_VERSION}/groups/search`;
  //   },
  // },
  // analytic: {
  //   baseUrl(): string {
  //     return `${API_BASE_URL}/api/${API_VERSION}/analytics`;
  //   },
  // },
};
