const baseURL = "http://localhost:3008";

export const addPlanApi = async (url: any, formData: any = 0) => {
    try {
      const response = await fetch(`${baseURL}${url}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        },
        body: formData,
      });
      return response;
    } catch (error) {
      console.error("Error", error);
    }
  };

  export const productListApi = async (url: any, ) => {
    try {
      const response = await fetch(`${baseURL}${url}`, {
        method: "GET"
      });
      return response;
    } catch (error) {
      console.error("Error", error);
    }
  };
  
  export const UpdatePlanApi = async (url: any, products: any = 0) => {
    try {
      const response = await fetch(`${baseURL}${url}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(products),
      });
      return response;
    } catch (error) {
      console.error("Error", error);
    }
  };