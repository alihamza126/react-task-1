import { createSlice } from "@reduxjs/toolkit";
import type { InvoiceForm } from "../types";

interface InvoiceState {
    forms: InvoiceForm[];
    currentFormIndex: number;
}

const invoiceSlice = createSlice({
    name: "invoice",
    initialState: {
        forms: [],
        currentFormIndex: 0,
    } as InvoiceState,
    reducers: {
        addFormData: (state, action: { payload: InvoiceForm }) => {
            // console.log(action.payload as InvoiceForm)
            state.forms.push(action.payload); // Add a new form data object
        },
        updateFormData: (state, action: { payload: { data: InvoiceForm, invoiceNumber: string } }) => {
            const { invoiceNumber, data } = action.payload;
            const index = state.forms.findIndex((form) => form.invoiceNumber === invoiceNumber)
            state.forms[index] = { ...state.forms[index], ...data, status: 'pending' }; // Update existing form data
        },
        deleteFormData: (state, action) => {
            const invoiceNumber = action.payload;
            const index = state.forms.findIndex((form) => form.invoiceNumber === invoiceNumber)
            state.forms.splice(index, 1);
        },
        setPaidData: (state, action) => {
            const invoiceNumber = action.payload;
            const index = state.forms.findIndex((form) => form.invoiceNumber === invoiceNumber)
            state.forms[index].status = 'paid'
        }
    },
});


export const { addFormData, updateFormData, deleteFormData, setPaidData } = invoiceSlice.actions;
export default invoiceSlice.reducer;