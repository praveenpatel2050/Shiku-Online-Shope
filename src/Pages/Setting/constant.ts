export interface SchoolFormData {
  schoolName: string;
  email: string;
  password: string;
  mobileNumber: string;
  startClass: string;
  highestClass: string;
  medium: string;
  foundedYear: string;
  contactDesignation: string;
  telephoneNumber: string;
  affiliatedBy: string;
  address: string;
}

export const schoolInitialState = {
  schoolAdminId: "",
  schoolName: "",
  email: "",
  password: "",
  mobileNumber: "",
  startClass: "",
  highestClass: "",
  medium: "",
  foundedYear: "",
  contactDesignation: "",
  telephoneNumber: "",
  affiliatedBy: "",
  address: "",
};
