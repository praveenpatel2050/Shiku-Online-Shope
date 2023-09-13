export const getPaymentStatus = () => {
    const userString = sessionStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    return user?.paymentStatus ?? "";
}