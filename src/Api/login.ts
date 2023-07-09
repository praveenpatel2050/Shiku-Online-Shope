const baseURL = "http://localhost:3005";

async function login(mobileNumber: number, password: string) {

  return await fetch(`${baseURL}/user/login`, {
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
  
  localStorage


