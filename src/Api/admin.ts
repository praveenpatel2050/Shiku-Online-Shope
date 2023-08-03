const baseURL = "http://localhost:3008";

export const AllUserListApi = async (url: any, ) => {
    try {
      const response = await fetch(`${baseURL}${url}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      console.error("Error", error);
    }
  };

  export const updateUserApi = async (url: any, formData: any = 0) => {
    try {
      const tempData = formData != 0 ? formData : {};
      const response = await fetch(`${baseURL}${url}`, {
        method: "PUT",
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