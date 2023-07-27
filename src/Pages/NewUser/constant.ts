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
    // {
    //   id: "3",
    //   label: "Email",
    //   name: "email",
    //   errorLabel: "Please enter valid email",
    //   type: "email",
    // },
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
    // {
    //   id: "9",
    //   label: "Address",
    //   name: "address",
    //   errorLabel: "Please enter valid address",
    //   type: "text",
    //   inputProps: {
    //     maxLength: 60,
    //     minLength: 10,
    //   },
    // },  
    {
      id: "10",
      label: "Plan",
      name: "planItemName",
      errorLabel: "Please select Plan",
      type: "select",
      option: [
        {
          label: "Watch of ₹100",
          value: "watch",
          amount: 100,
        },
        {
          label: "Belt of ₹100",
          value: "belt",
          amount: 100,
        },
        {
          label: "Smart Watch of ₹1000",
          value: "smart Watch",
          amount: 1000,
        },
      ],
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
    userName: string;
    password: string;
    mobileNumber: string;
    // gender: string;
    // address: string;
    planAmount: string;
    totalItem: string;
    totalAmount: string;
    cartAmount: string;
    paymentStatus: string;
    planItemName: string;
}
export interface SignUpFormData extends FormData {
  referralCode: string;
}
