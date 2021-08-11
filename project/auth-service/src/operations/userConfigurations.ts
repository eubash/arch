const getUserConfigurations = (productServiceUrl: string) => {
  return {
    template: {
      method: "GET",
      url: `${productServiceUrl}/user-configurations?userId={userId}`,
      headers: {
        "accepts": "application/json",
        "content-type": "application/json"
      },
    },
    functions: {
      "getUserConfigurationList": ["userId"]
    }
  };
};

const getUserConfigurationById = (productServiceUrl: string) => {
  return {
    template: {
      method: "GET",
      url: `${productServiceUrl}/user-configurations/{id}`,
      headers: {
        "accepts": "application/json",
        "content-type": "application/json"
      },
    },
    functions: {
      "getUserConfigurationById": ["id"]
    }
  };
};

const createUserConfiguration = (productServiceUrl: string) => {
  return {
      template: {
        method: 'POST',
        url: `${productServiceUrl}/user-configurations`,
        headers: {
          "accept": "application/json",
          "content-type": "application/json"
        },
        body: {
          userId: "{userId:string}",
          companyId: "{companyId:number}",
          configuration: "{configuration:array}",
          configurationName: "{configurationName:string}"
        },
      },
      functions: {
        "createUserConfiguration": [
          "userId",
          "companyId",
          "configuration",
          "configurationName"
        ]
      }
  };
};

const updateUserConfiguration = (productServiceUrl: string) => {
  return {
      template: {
        method: 'PUT',
        url: `${productServiceUrl}/user-configurations/{id}`,
        headers: {
          "accept": "application/json",
          "content-type": "application/json"
        },
        body: {
          configurationName: "{configurationName:string}",
          userId: "{userId:string}",
          companyId: "{companyId:number}",
          configuration: "{configuration:array}"
        },
      },
      functions: {
        "updateUserConfiguration": [
          "id",
          "userId",
          "companyId",
          "configuration",
          "configurationName"
        ]
      }
  };
};

// const patchUserConfiguration = (productServiceUrl: string) => {
//   return {
//       template: {
//         method: 'PATCH',
//         url: `${productServiceUrl}/user-configurations/{id}`,
//         headers: {
//           "accept": "application/json",
//           "content-type": "application/json"
//         },
//         body: {
//           userId: "{userId:string}",
//           companyId: "{companyId:number}",
//           configuration: "{configuration:array}",
//           configurationName: "{configurationName:string}"
//         },
//       },
//       functions: {
//         "patchUserConfiguration": [
//           "id",
//           "userId",
//           "companyId",
//           "configuration",
//           "configurationName"
//         ]
//       }
//   };
// };

const deleteUserConfiguration = (productServiceUrl: string) => {
  return {
    template: {
      method: "DELETE",
      url: `${productServiceUrl}/user-configurations/{id}`,
      headers: {
        "accepts": "application/json",
        "content-type": "application/json"
      },
    },
    functions: {
      "deleteUserConfiguration": ["id"]
    }
  };
};

export default {
  getUserConfigurations: getUserConfigurations,
  deleteUserConfiguration: deleteUserConfiguration,
  // patchUserConfiguration: patchUserConfiguration,
  updateUserConfiguration: updateUserConfiguration,
  createUserConfiguration: createUserConfiguration,
  getUserConfigurationById: getUserConfigurationById
}