/* eslint-disable @typescript-eslint/no-explicit-any */
export const addUserFormField = [
    {
      id: "1",
      label: "Name",
      errorLabel: "Please enter valid Name",
      type: "text",
      name: "userName",
      inputProps: {
        maxLength: 25,
        minLength: 3,
      },
    },
    // {
    //   id: "2",
    //   label: "Father Name",
    //   errorLabel: "Please enter valid Father Name",
    //   type: "text",
    //   name: "fatherName",
    //   inputProps: {
    //     maxLength: 12,
    //     minLength: 3,
    //   },
    // },
    {
      id: "3",
      label: "Email",
      name: "email",
      errorLabel: "Please enter valid email",
      type: "email",
    },
    {
      id: "4",
      label: "Password",
      name: "password",
      errorLabel: "Please enter valid password",
      type: "password",
      inputProps: {
        maxLength: 12,
        minLength: 6,
      },
    },
    {
      id: "5",
      label: "Mobile Number",
      name: "mobileNumber",
      errorLabel: "Please enter valid Mobile Number",
      type: "number",
      inputProps: {
        maxLength: 10,
        minLength: 10,
      },
    },
    // {
    //   id: "6",
    //   label: "Gender",
    //   name: "gender",
    //   errorLabel: "Please select enrollment number",
    //   type: "select",
    //   option: [
    //     {
    //       label: "Male",
    //       value: "male",
    //     },
    //     {
    //       label: "Female",
    //       value: "female",
    //     },
    //     {
    //       label: "Transgender",
    //       value: "transgender",
    //     },
    //   ],
    // },
    // {
    //   id: "7",
    //   label: "Date Of Birth",
    //   name: "dob",
    //   errorLabel: "Please enter valid date",
    //   type: "date",
    //   InputLabelProps: {
    //     shrink: true,
    //   },
    // },
    {
      id: "9",
      label: "Address",
      name: "address",
      errorLabel: "Please enter valid address",
      type: "text",
      inputProps: {
        maxLength: 60,
        minLength: 10,
      },
    },
    {
      id: "11",
      label: "Quantity",
      name: "totalItem",
      errorLabel: "Please select Quantity",
      type: "select",
      option: [
        {
          value: 1,
          label: 1,
        },
        {
          value: 2,
          label: 2,
        },
        {
          value: 3,
          label: 3,
        },
        {
          value: 4,
          label: 4,
        },
        {
          value: 5,
          label: 5,
        },
        {
          value: 6,
          label: 6,
        },
        {
          value: 7,
          label: 7,
        },
        {
          value: 8,
          label: 8,
        },
        {
          value: 9,
          label: 9,
        },
        {
          value: 10,
          label: 10,
        },
      ],
    },
  ];
  
  export interface FormData {
    planId: string;
    userName: string;
    password: string;
    mobileNumber: number | null;
    email: string;
    address: string;
    planAmount: number;
    totalItem: number;
    totalAmount: number;
    cartAmount: string;
    paymentStatus: string;
    planItemName: string;
}
export interface OrderData {
  requestAmount:  number
}
export interface SignUpFormData extends FormData {
  referralCode: string;
}
export interface Plan {
  _id: string;
  productName: string;
  imageUrl: string;
  price: number;
  mrp: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const initialState: any = {
  userName: "",
  password: "",
  email: "",
  address: "",
  mobileNumber: "",
  planAmount: 0,
  planItemName: "",
  totalAmount: 0,
  totalItem: 0,
  cartAmount: "0",
  paymentStatus: "0",
};
export const registerInitialState: any = {
  userName: "",
  password: "",
  email: "",
  address: "",
  mobileNumber: "",
  planAmount: 0,
  planItemName: "",
  totalAmount: 0,
  totalItem: 0,
  cartAmount: "0",
  paymentStatus: "0",
  referralCode: ""
};
