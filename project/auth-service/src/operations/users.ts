export const createUser = (userServiceUrl: string) => {
  return {
    template: {
      method: 'POST',
      url: `${userServiceUrl}/users`,//'http://user.service/users', //http://localhost:3001
      headers: {
        "accept": "application/json",
        "content-type": "application/json"
      },
      body: {
        guid: "{guid:string}",
        email: "{email:string}",
        username: "{username:string}",
        company: "{company:string}"
      },
    },
    functions: {
      "saveUser": [
        "guid",
        "email",
        "username",
        "company"
      ]
    }
  };
};

const getUserList = (userServiceUrl: string) => {
  return {
    template: {
      method: "GET",
      url: `${userServiceUrl}/users`,
      headers: {
        "accepts": "application/json",
        "content-type": "application/json"
      },
    },
    functions: {
      "getUserList": []
    }
  };
};

export default {
  createUser: createUser,
  getUserList: getUserList
}