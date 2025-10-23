export type InvoiceForm = {
  invoiceNumber: string;
  status: string;
  billFrom: {
    address: string;
    city: string;
    postCode: string;
    country: string;
  };
  billTo: {
    name: string;
    email: string;
    address: string;
    city: string;
    postCode: number;
    country: string;
  };
  invoiceDate: string;
  paymentTerm: string;
  description: string;
  items: {
    name: string;
    qty: number;
    price: number;
  }[];
};
