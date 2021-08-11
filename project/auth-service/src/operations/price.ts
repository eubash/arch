const getPrice = (productServiceUrl: string) => {
  return {
    template: {
      method: "GET",
      url: `${productServiceUrl}/price?companyId={companyId}&productId={productId}`,
      headers: {
        "accepts": "application/json",
        "content-type": "application/json"
      },
    },
    functions: {
      "getPrice": ["companyId", "productId"]
    }
  };
};

export default {
  getPrice: getPrice
}