import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
   invoiceNumber: Yup.string().required("Invoice number is required"),
   status: Yup.string().required("Status is required"),
   billFrom: Yup.object({
      address: Yup.string().required("Street address is required"),
      city: Yup.string().required("City is required"),
      postCode: Yup.number()
         .min(1, "Enter number")
         .typeError("Enter number")
         .positive("Must be a positive number")
         .integer("Must be an integer")
         .required("Post code is required"),
      country: Yup.string().required("Country is required"),
   }),
   billTo: Yup.object({
      name: Yup.string().required("Client name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      address: Yup.string().required("Street address is required"),
      city: Yup.string().required("City is required"),
      postCode: Yup.number()
         .min(1, "Enter number")
         .typeError("Enter number")
         .positive("Must be a positive number")
         .integer("Must be an integer")
         .required("Post code is required"),
      country: Yup.string().required("Country is required"),
   }),
   invoiceDate: Yup.string().required("Invoice date is required"),
   paymentTerm: Yup.string().required("Payment term is required"),
   description: Yup.string().required("Project description is required"),
   items: Yup.array().of(
      Yup.object().shape({
         name: Yup.string().required("Name is required"),
         qty: Yup.number().min(1, "Min 1").required("Required").positive("Must positive"),
         price: Yup.number().min(1, "Price is Required").required("Required").positive("Must positive"),
      })
   ),
});
