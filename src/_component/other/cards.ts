export const getCartAmount = () => {
    const userString = sessionStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    return user?.cartAmount ?? "";
}

export const getTotalAmount = () => {
    const userString = sessionStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    return user?.totalAmount ?? "";
}

