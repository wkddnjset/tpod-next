interface BillingCreateParameter {
  cardNumber: string;
  cardExpirationYear: string;
  cardExpirationMonth: string;
  cardPassword: string;
  customerBirthday: string;
  uid: string;
}

interface BillingCreateResponse {
  authenticatedAt: string;
  billingKey: string;
  cardCompany: string;
  cardNumber: string;
  customerKey: string;
  mId: string;
  method: string;
}
