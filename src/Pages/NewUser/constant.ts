export const addUserFormField = [
    {
      id: "1",
      label: "Name",
      errorLabel: "Please enter valid Name",
      type: "text",
      name: "studentName",
      inputProps: {
        maxLength: 25,
        minLength: 3,
      },
    },
    {
      id: "2",
      label: "Father Name",
      errorLabel: "Please enter valid Father Name",
      type: "text",
      name: "fatherName",
      inputProps: {
        maxLength: 12,
        minLength: 3,
      },
    },
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
      type: "text",
      inputProps: {
        maxLength: 10,
        minLength: 10,
      },
    },
    {
      id: "6",
      label: "Gender",
      name: "gender",
      errorLabel: "Please select enrollment number",
      type: "select",
      option: [
        {
          label: "Male",
          value: "male",
        },
        {
          label: "Female",
          value: "female",
        },
        {
          label: "Transgender",
          value: "transgender",
        },
      ],
    },
    {
      id: "7",
      label: "Date Of Birth",
      name: "dob",
      errorLabel: "Please enter valid date",
      type: "date",
      InputLabelProps: {
        shrink: true,
      },
    },
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
      id: "10",
      label: "Plan",
      name: "plan",
      errorLabel: "Please select Plan",
      type: "select",
      option: [
        {
          label: "Watch of ₹100",
          value: 100,
        },
        {
          label: "Belt of ₹100",
          value: 100,
        },
        {
          label: "Smart Watch of ₹1000",
          value: 1000,
        },
      ],
    },
  ];
  
  export interface FormData {
    UserName: string;
    email: string;
    password: string;
    mobileNumber: string;
    fatherName: string;
    aadharNumber: string;
    gender: string;
    dob: string;
    address: string;
    plan: string;
  }