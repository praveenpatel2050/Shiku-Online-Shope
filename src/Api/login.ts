const baseURL = "http://localhost:3008";

async function login(mobileNumber: number, password: string, url: string) {
  return await fetch(`${baseURL}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mobileNumber, password }),
  }).then((data) => data.json());
}

const logout = () => {
  sessionStorage.removeItem("user");
};

export default {
  login,
  logout,
};

localStorage;
