const baseURL = "http://localhost:3008";

export const addUserApi = async (url: any, formData: any = 0) => {
  try {
    const tempData = formData != 0 ? formData : { hello: "hello" };
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

export const RegisterUserApi = async (url: string, formData: any = 0) => {
  try {
    const tempData = formData != 0 ? formData : { hello: "hello" };
    console.log('formData', formData);
    return await fetch(`${baseURL}${url}`, {
      headers: { 'Content-Type': 'application/json' },
      method: "POST",
      body: JSON.stringify(tempData),
    });
  } catch (error) {
    console.error("Error", error);
  }
};

export const UpdateBankAccountApi = async (url: any, selectedUserIds: any = 0) => {
  try {
    const tempData = selectedUserIds != 0 ? selectedUserIds : {};
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

export const UpdateUserStatusApi = async (url: any, formData: any = 0) => {
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

export const SingleUserApi = async (url: any) => {
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

export const listUserApi = async (url: any, ) => {
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

export const ReferralTransactionApi = async (url: any) => {
  try {
    const response = await fetch(`${baseURL}${url}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    return response.json();
  } catch (error) {
    console.error("Error", error);
  }
};

// if (bankInfo) {
//   const { bankName, accountHolderName, accountNumber, ifscCode } =
//     bankInfo[0];
//   const data = {
//     bankName,
//     accountHolderName,
//     accountNumber,
//     ifscCode,
//   };
//   setFormData(data);
// }