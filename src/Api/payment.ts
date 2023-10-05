const baseURL = "http://localhost:3008";

export const OrderIdGenerate = async (orderIdUrl: any, amount: any = 0) => {
    try {
      // const tempData = amount != 0 ? amount : { hello: "hello" };
      const response = await fetch(`${baseURL}${orderIdUrl}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(amount),
      });
      return response;
    } catch (error) {
      console.error("Error", error);
    }
  };