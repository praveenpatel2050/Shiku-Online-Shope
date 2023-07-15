export const referralColumns = [
  { id: "plan", label: "Plan" },
  { id: "userinfo", label: "User Info" },
  { id: "commission", label: "Commission" },
  { id: "amount", label: "Amount" },
  { id: "referredby", label: "Referred By" },
];

export const cashColumns = [
  { id: "information", label: "Information" },
  { id: "amount", label: "Amount" },
];

export const referralTransactionData = [
  {
    plan: 100,
    userinfo: "user 2",
    commission: "10%",
    amount: "+10",
    referredby: "You",
  },
  {
    plan: 100,
    userinfo: "user 3",
    commission: "5%",
    amount: "+5",
    referredby: "user 2",
  },
  {
    plan: 100,
    userinfo: "user 4",
    commission: "2.5%",
    amount: "+2.5",
    referredby: "user 3",
  },
  {
    plan: 100,
    userinfo: "user 5",
    commission: "1%",
    amount: "+1",
    referredby: "user 4",
  },
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
  plan: string;
  userInfo: string;
  commission: number | string;
  amount: string;
  referredby: string;
}
export interface CashTransaction {
  information: string;
  amount: string;
}