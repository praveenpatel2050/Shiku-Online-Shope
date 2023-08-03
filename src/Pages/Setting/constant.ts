export interface UserFormData {
  userName: string;
  // email: string;
  password: string;
  mobileNumber: string;
  planItemName: string;
  highestClass: string;
  totalItem: string | number;
  totalAmount: string | number;
  deliveryStatus: string | number;
  referralCode: string;
}

export const userInitialState = {
  userName: "",
  // email: string;
   password: "",
  mobileNumber: "",
  planItemName: "",
  highestClass: "",
  totalItem: "",
  totalAmount: "",
  referralCode: "",
  deliveryStatus: "",
};

export interface UserBankData {
  accountNumber: string;
  bankName: string;
  accountHolderName: string;
  ifscCode: string;
}

export const bankInitialState = {
  accountNumber: "",
  bankName: "",
  accountHolderName: "",
  ifscCode: "",
};