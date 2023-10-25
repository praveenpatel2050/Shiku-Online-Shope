export const referralColumns = [
  { id: "planItemName", label: "Item" },
  { id: "planAmount", label: "Plan" },
  { id: "createdUserName", label: "User Info" },
  { id: "earningAmount", label: "Earning Amount" },
  { id: "referralUserName", label: "Referred By" },
];

export const cashColumns = [
  { id: "information", label: "Information" },
  { id: "amount", label: "Amount" },
];

export const cashTransactionData = [
    {
      information:"Deposit Amount",
      amount: "+1000",
    },
    {
      information:"Withdraw Amount",
      amount: "-500",
    },
    {
      information:"Deposit Amount",
      amount: "+100",
    },
    {
      information:"Withdraw Amount",
      amount: "-200",
    },
    {
      information:"Deposit Amount",
      amount: "+140",
    },
    {
      information:"Deposit Amount",
      amount: "+100",
    },
    {
      information:"Withdraw Amount",
      amount: "-400",
    },
]

export interface ReferralUsers {
  planItemName: string;
  planAmount: string;
  createdUserName: string;
  earningAmount: string;
  referralUserName: string;
}

export const referralinititalState = {
  planItemName: "",
  planAmount: "",
  createdUserName: "",
  earningAmount: "",
  referralUserName: "",
}

export interface CashTransaction {
  information: string;
  amount: string;
}