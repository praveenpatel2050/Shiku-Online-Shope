const baseURL = "http://localhost:3008";

 const addBankAccountApi = async (url: any, formData: any = 0) => {
  try {
    const tempData = formData != 0 ? formData : {hello: 'hello'};
    const response = await fetch(`${baseURL}${url}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tempData),
    });
    return response;
  } catch (error) {
    console.error("Error", error);
  }
};

export default addBankAccountApi;