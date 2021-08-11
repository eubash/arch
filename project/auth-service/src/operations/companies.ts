const getCompanies = (productServiceUrl: string) => {
  return {
    template: {
      method: "GET",
      url: `${productServiceUrl}/companies`,
      headers: {
        "accepts": "application/json",
        "content-type": "application/json"
      },
    },
    functions: {
      "getCompanies": []
    }
  };
};

export default {
  getCompanies: getCompanies
}