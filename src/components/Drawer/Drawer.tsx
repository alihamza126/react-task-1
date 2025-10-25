import type React from "react";
import { useDispatch } from "react-redux";
import { addFormData, updateFormData } from "../../redux/slice/InvoiceSlice";
import { FaTrash } from "react-icons/fa";
import type { InvoiceForm } from "../../types";
import { FormGroup } from "../../shared";

import { Formik, Form, FieldArray } from "formik";
import FormSection from "../common/FormSection";
import FormikController from "../common/FormikController";
import { validationSchema } from "../../validations";
import { initialValues } from "../../lib";
import Button from "../../shared/Button/Button";

type sidebarProps = {
    isOpen: boolean;
    onClose: () => void;
    isUpdate?: boolean;
    invoice?: InvoiceForm;
};

const Drawer = ({ isOpen, onClose, isUpdate = false, invoice = initialValues }: sidebarProps) => {
    const dispatch = useDispatch();

    const handleSubmit = (data: InvoiceForm) => {
        if (!isUpdate) {
            dispatch(addFormData(data));
        } else {
            dispatch(updateFormData({ invoiceNumber: invoice.invoiceNumber, data }));
        }
        onClose();
    };

    const formData = isUpdate ? invoice : initialValues;
    const sidebarClass = isOpen ? "translate-x-0" : "-translate-x-full";

    const paymentTermOptions = [
        { value: "1", label: "Net 1 Days" },
        { value: "7", label: "Net 7 Days" },
        { value: "14", label: "Net 14 Days" },
        { value: "30", label: "Net 30 Days" },
    ];

    return (
        <div className="h-full w-full relative">
            <span className={`fixed bg-gray-900 inset-0 opacity-50 w-screen h-full ${sidebarClass}`}></span>
            <div className={`fixed z-10 top-0 left-0 w-full md:w-[40%] h-full bg-white shadow-2xl transform ${sidebarClass} transition-transform duration-300 ease-in-out z-50`}>
                <div className="p-6 px-4 md:px-8 overflow-y-auto h-screen">
                    <div className="py-8 flex justify-between items-center">
                        <h2 className="text-3xl font-semibold">New Invoice</h2>
                    </div>

                    <Formik
                        initialValues={formData}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ values }) => (
                            <Form className="space-y-6">
                                {/* BILL FROM */}
                                <FormSection title="Bill From">
                                    <FormikController
                                        control="input"
                                        name="billFrom.address"
                                        label="Street Address"
                                    />
                                    <FormGroup cols={3} gap={2}>
                                        <FormikController
                                            control="input"
                                            name="billFrom.city"
                                            label="City"
                                        />
                                        <FormikController
                                            control="input"
                                            name="billFrom.postCode"
                                            label="Post Code"
                                        />
                                        <FormikController
                                            control="input"
                                            name="billFrom.country"
                                            label="Country"
                                        />
                                    </FormGroup>
                                </FormSection>

                                {/* BILL TO */}
                                <FormSection title="Bill To">
                                    <FormikController
                                        control="input"
                                        name="billTo.name"
                                        label="Client's Name"
                                    />
                                    <FormikController
                                        control="input"
                                        type="email"
                                        name="billTo.email"
                                        label="Client's Email"
                                    />
                                    <FormikController
                                        control="input"
                                        name="billTo.address"
                                        label="Street Address"
                                    />
                                    <FormGroup cols={3} gap={2}>
                                        <FormikController
                                            control="input"
                                            name="billTo.city"
                                            label="City"
                                        />
                                        <FormikController
                                            control="input"
                                            name="billTo.postCode"
                                            label="Post Code"
                                        />
                                        <FormikController
                                            control="input"
                                            name="billTo.country"
                                            label="Country"
                                        />
                                    </FormGroup>
                                </FormSection>

                                {/* INVOICE DATE + PAYMENT TERM */}
                                <section className="grid grid-cols-2 gap-2  ">
                                    <FormikController
                                        control="input"
                                        type="date"
                                        name="invoiceDate"
                                        label="Invoice Date"
                                    />
                                    <FormikController
                                        control="select"
                                        name="paymentTerm"
                                        label="Payment Term"
                                        options={paymentTermOptions}
                                        placeholder="Select payment term"
                                    />
                                </section>

                                {/* PROJECT DESCRIPTION */}
                                <FormSection title="">
                                    <FormikController
                                        control="input"
                                        name="description"
                                        label="Project Description"
                                        placeholder="eg. graphic design"
                                    />
                                </FormSection>

                                {/* ITEM LIST */}
                                <FormSection title="Item List">
                                    <FieldArray name="items">
                                        {({ push, remove }) => (
                                            <div>
                                                {values.items.map((item: any, index: React.Key) => (
                                                    <div
                                                        key={index}
                                                        className="grid grid-cols-4 gap-2  justify-center items-start"
                                                    >
                                                        <FormikController
                                                            control="input"
                                                            name={`items.${index}.name`}
                                                            label="Item Name"
                                                        />
                                                        <FormikController
                                                            control="input"
                                                            type="number"
                                                            name={`items.${index}.qty`}
                                                            label="QTY."
                                                            placeholder="Qty"
                                                        />
                                                        <FormikController
                                                            control="input"
                                                            type="number"
                                                            name={`items.${index}.price`}
                                                            label="Price"
                                                            placeholder="Price"
                                                        />
                                                        <div className="text-center ms-8 gap-8   h-full items-center flex font-semibold">
                                                            {item.qty * item.price || 0}
                                                            {values.items.length > 1 && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => remove(Number(index))}
                                                                    className="text-red-500 text-sm mt-1 col-span-1 text-right"
                                                                >
                                                                    <FaTrash />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                                <button
                                                    type="button"
                                                    onClick={() => push({ name: "", qty: 0, price: 0 })}
                                                    className="w-full py-2 mt-2 rounded-full bg-gray-700 text-white hover:bg-gray-800"
                                                >
                                                    + Add Item
                                                </button>
                                            </div>
                                        )}
                                    </FieldArray>
                                </FormSection>

                                {/* BUTTONS */}
                                <div className="flex shadow-xl mt-8 py-8 rounded-2xl shadow-gray-700 p-2 md:p-4 justify-between items-center">
                                    <Button onClick={onClose}  color="secondary">Cancel</Button>
                                    <Button type="submit"  color="primary">Save & Send</Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default Drawer;
