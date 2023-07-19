export const getReferralBy = () => {
    const userString = sessionStorage.getItem("user");

    const user = userString ? JSON.parse(userString) : null;
    return user?.referralCode ?? "";
}
console.log(getReferralBy());