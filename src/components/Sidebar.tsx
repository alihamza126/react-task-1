import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { validationSchema } from "../validations/formSchema";
import { FaTrash } from "react-icons/fa";
import initialValues from "../lib/initialState";
import { useDispatch } from "react-redux";
import { addFormData, updateFormData } from "../redux/Slice";
import type React from "react";
import type { InvoiceForm } from "../types";

type sidebarProps = {
    isOpen: boolean;
    onClose: () => void;
    isUpdate?: boolean;
    invoice?: InvoiceForm;
}


const InvoiceSidebar = ({ isOpen, onClose, isUpdate = false, invoice = initialValues }: sidebarProps) => {
    const dispatch = useDispatch();

    const handleSubmit = (data: InvoiceForm) => {
        if (!isUpdate) {
            dispatch(addFormData(data));
            onClose();
        } else {
            dispatch(updateFormData({ invoiceNumber: invoice.invoiceNumber, data }))
            onClose();
        }

    };

    const formData = isUpdate ? invoice : initialValues
    formData.status == 'pending'
    const sidebarClass = isOpen
        ? "translate-x-0"
        : "-translate-x-full";

    return (
        <div className="h-full w-full  relative">
            <span className={`fixed bg-gray-900 inset-0 opacity-50 w-screen h-full ${sidebarClass}`}></span>
            <div
                className={`fixed z-10 top-0 left-0 w-full md:w-[40%] h-full bg-white shadow-2xl transform ${sidebarClass} transition-transform duration-300 ease-in-out z-50`}
            >

                <div className="p-6 px-3 md:px-8 overflow-y-auto h-screen">
                    <div className="py-8 flex justify-between items-center">
                        <h2 className="text-3xl font-semibold">New Invoice</h2>
                    </div>
                    <Formik
                        initialValues={formData}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            console.log(values)
                            handleSubmit(values);
                        }}
                    >
                        {({ values, errors }) => (
                            <Form className="space-y-6">
                                {/* BILL FROM */}
                                <section>
                                    <h3 className="text-indigo-600 font-medium mb-2">Bill From</h3>
                                    <label htmlFor="Street Address">Street Address</label>
                                    <Field
                                        name="billFrom.address"
                                        className="input"
                                    />
                                    <ErrorMessage name="billFrom.address" component="div" className="error" />

                                    <div className="grid grid-cols-3 gap-2 mt-2">
                                        <span>
                                            <label htmlFor="Street Address">Street Address</label>
                                            <Field name="billFrom.city" className="input" />
                                            <ErrorMessage name="billFrom.city" component="div" className="error" />
                                        </span>
                                        <span>
                                            <label htmlFor="Street Address">Post Code</label>
                                            <Field name="billFrom.postCode" className="input" />
                                            <ErrorMessage name="billFrom.postCode" component="div" className="error" />
                                        </span>
                                        <span>
                                            <label htmlFor="Street Address">Country</label>
                                            <Field name="billFrom.country" className="input" />
                                            <ErrorMessage name="billFrom.country" component="div" className="error" />
                                        </span>
                                    </div>
                                </section>

                                {/* BILL TO */}
                                <section>
                                    <h3 className="text-indigo-600 font-medium mb-2">Bill To</h3>
                                    <span>
                                        <label htmlFor="Client's Name">Client's Name</label>
                                        <Field name="billTo.name" className="input" />
                                        <ErrorMessage name="billTo.name" component="div" className="error" />
                                    </span>

                                    <span>
                                        <label htmlFor="Client's Email">Client's Email</label>
                                        <Field
                                            name="billTo.email"
                                            className="input mt-2"
                                        />
                                        <ErrorMessage name="billTo.email" component="div" className="error" />
                                    </span>

                                    <span>
                                        <label htmlFor="Street Address">Street Address</label>
                                        <Field
                                            name="billTo.address"
                                            className="input mt-2"
                                        />
                                        <ErrorMessage name="billTo.address" component="div" className="error" />
                                    </span>

                                    <div className="grid grid-cols-3 gap-2 mt-2">
                                        <span>
                                            <label htmlFor="City">City</label>
                                            <Field name="billTo.city" className="input" />
                                            <ErrorMessage name="billTo.city" component="div" className="error" />
                                        </span>
                                        <span>
                                            <label htmlFor="post Code">Post Code</label>
                                            <Field name="billTo.postCode" className="input" />
                                            <ErrorMessage name="billTo.postCode" component="div" className="error" />
                                        </span>
                                        <span>
                                            <label htmlFor="Country">Country</label>
                                            <Field name="billTo.country" className="input" />
                                            <ErrorMessage name="billTo.country" component="div" className="error" />
                                        </span>
                                    </div>
                                </section>

                                {/* INVOICE DATE + PAYMENT TERM */}
                                <section className="grid grid-cols-2 gap-2">
                                    <span>
                                        <label htmlFor="Invoice Date">Invoice Date</label>
                                        <Field type="date" name="invoiceDate" className="input input    " />
                                        <ErrorMessage name="invoiceDate" component="div" className="error" />
                                    </span>

                                    <span>
                                        <label htmlFor="payment term">Payment Term</label>
                                        <Field as="select" name="paymentTerm" className="input py-[15px]!">
                                            <option value="">Select payment term</option>
                                            <option value="1">Net 1 Days</option>
                                            <option value="7">Net 7 Days</option>
                                            <option value="14">Net 14 Days</option>
                                            <option value="30">Net 30 Days</option>
                                        </Field>
                                        <ErrorMessage name="paymentTerm" component="div" className="error" />
                                    </span>
                                </section>

                                {/* PROJECT DESCRIPTION */}
                                <section>
                                    <span>
                                        <label htmlFor="description"> Project Description</label>
                                        <Field
                                            name="description"
                                            placeholder="eg. graphic design"
                                            className="input"
                                        />
                                        <ErrorMessage name="description" component="div" className="error" />
                                    </span>
                                </section>

                                {/* ITEM LIST */}
                                <section>
                                    <h3 className="text-indigo-600 font-semibold mb-3">Item List</h3>
                                    <FieldArray name="items">
                                        {({ push, remove }) => (
                                            <div>
                                                {values.items.map((item: any, index: React.Key) => (
                                                    <div
                                                        key={index}
                                                        className="grid grid-cols-4 gap-2 justify-center items-center mb-3"
                                                    >
                                                        <span>
                                                            <label htmlFor="Item Name">Item Name</label>
                                                            <Field
                                                                name={`items.${index}.name`}
                                                                className={`input   border-red-500`}
                                                            />
                                                            <ErrorMessage name={`items.${index}.name`} component="div" className="error" />
                                                        </span>
                                                        <span>
                                                            <label htmlFor="qty">QTY.</label>
                                                            <Field

                                                                type="number"
                                                                name={`items.${index}.qty`}
                                                                placeholder="Qty"
                                                                className="input"
                                                            />
                                                            <ErrorMessage name={`items.${index}.qty`} component="div" className="error" />
                                                        </span>
                                                        <span>
                                                            <label htmlFor="price">Price.</label>
                                                            <Field
                                                                type="number"
                                                                name={`items.${index}.price`}
                                                                placeholder="Price"
                                                                className="input"
                                                            />
                                                            <ErrorMessage name={`items.${index}.price`} component="div" className="error" />
                                                        </span>
                                                        <div className="text-center ms-8 gap-8 flex font-semibold">
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
                                </section>

                                {/* BUTTONS */}
                                <div className="flex shadow-xl mt-8 py-8 rounded-2xl shadow-gray-700 p-2 md:p-4 justify-between items-center">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="px-4 py-2 rounded-full bg-gray-500 text-gray-100 hover:bg-gray-400"
                                    >
                                        Discard
                                    </button>
                                    <button
                                        type="submit"
                                        className=" cursor-pointer rounded-full px-6 py-2 hover:bg-amber-200 bg-primary text-white "
                                    >
                                        Save & Send
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>

    );
};

export default InvoiceSidebar;
