const baseURL = "http://localhost:3008";

export const addUserApi = async (url: any, formData: any = 0) => {
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

// export const updateTeacherApi = async (url: any, formData: any = 0) => {
//   try {
//     const tempData = formData != 0 ? formData : {};
//     const baseURL = "http://localhost:3005";
//     const response = await fetch(`${baseURL}${url}`, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${sessionStorage.getItem("token")}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(tempData),
//     });
//     return response;
//   } catch (error) {
//     console.error("Error", error);
//   }
// };

export const singleUserApi = async (url: any ) => {
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

export const listUserApi =  async (url: any, teachers: any) => {
  try {
    const data = teachers;
    const response = await fetch(`${baseURL}${url}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      "Content-Type": "application/json"
    },
  });
  return response;
} catch (error) {
  console.error("Error", error);
}
}