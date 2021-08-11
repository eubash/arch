const getArticulates = (productServiceUrl: string) => {
  return {
    template: {
      method: "GET",
      url: `${productServiceUrl}/articulates?companyId={companyId}`,
      headers: {
        "accepts": "application/json",
        "content-type": "application/json"
      },
    },
    functions: {
      "getArticulates": ["companyId"]
    }
  };
};

export default {
  getArticulates: getArticulates
}