export const merchantsData = {
  data: [],
};

export const totalRecordsData = {
  data: 0,
};

export const selectedMerchantData = {
  data: "",
};

export const lazyParamsData = {
  data: {
    first: 0,
    rows: 3,
    page: 1,
    sortField: "",
    sortOrder: null,
    filters: {
      merchant_name: { value: "", matchMode: "contains" },
      address: { value: "", matchMode: "contains" },
      npwp: { value: "", matchMode: "contains" },
    },
  },
};
