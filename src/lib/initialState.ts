function generateRandomAlphanumeric(length: number) {
   const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
   let result = "";
   for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
   }
   return result;
}


const initialValues = {
   invoiceNumber: generateRandomAlphanumeric(6),
   status: "pending",
   billFrom: { address: "", city: "", postCode: "", country: "" },
   billTo: {
      name: "",
      email: "",
      address: "",
      city: "",
      postCode: 0,
      country: "",
   },
   invoiceDate: "",
   paymentTerm: "",
   description: "",
   items: [{ name: "", qty: 0, price: 0 }],
};

export default initialValues;
