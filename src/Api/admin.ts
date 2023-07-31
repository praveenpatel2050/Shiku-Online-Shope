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