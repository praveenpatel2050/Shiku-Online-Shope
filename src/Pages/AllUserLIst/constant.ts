export const columns = [
    { id: "userName", label: "Name" },
    // { id: "email", label: "Email" },
    { id: "mobileNumber", label: "Mobile Number" },
    // { id: "gender", label: "Gender" },
    // { id: "dob", label: "DOB" },
    // { id: "address", label: "Address" },
    { id: "paymentStatus", label: "Payment Status" },
    { id: 'totalItem', label: "Total Items" },
    { id: "deliveryStatusText", label: "Delivery Status" },
    {
      id: "actions",
      label: "Details",
      action: [
        {
          id: "details",
          type: "button",
          icon: "BagdeIcon",
          label: "User Details",
        },
      ],
    },
  ];
