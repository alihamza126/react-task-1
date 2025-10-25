import React from "react";
import { Link } from "react-router-dom";
import Chip from "../../shared/chip";


export interface InvoiceItemProps {
    invoice: InvoiceForm;
}

export interface InvoiceForm {
    invoiceNumber: string;
    invoiceDate: string;
    billTo: {
        name: string;
    };
    items: {
        price: number;
        qty: number;
    }[];
    status:any;
}

const InvoiceItem: React.FC<InvoiceItemProps> = ({ invoice }) => {
    const total = invoice.items.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );

    const chipColor =
        invoice.status === "pending"
            ? "warning" : "success"


    return (
        <Link
            to={`/invoice-details`}
            state={invoice.invoiceNumber}
            className="flex gap-x-20 gap-y-2 shadow-lg shadow-gray-300 flex-wrap justify-between hover:border-primary border border-transparent ease-in duration-150 rounded-lg cursor-pointer bg-white p-4"
        >
            <span className="font-semibold">#{invoice.invoiceNumber}</span>
            <span className="text-gray-500">{invoice.invoiceDate}</span>
            <span className="text-gray-500">{invoice.billTo.name}</span>
            <span className="font-semibold">${total}</span>
            <Chip color={chipColor} >
                {invoice.status}
            </Chip>
        </Link>
    );
};

export default InvoiceItem;
