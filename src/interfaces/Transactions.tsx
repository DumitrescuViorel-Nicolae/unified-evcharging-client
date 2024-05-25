interface PaymentTransaction {
  transactionId: string;
  amount: number;
  currency: string;
  paymentMethodBrand: string;
  paymentMethodLast4: string;
  status: string;
  receiptUrl: string;
  createdAt?: Date | null;
}

export default PaymentTransaction;
