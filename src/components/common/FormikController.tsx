import type React from "react";
import { FormGroup, Input, Select } from "../../shared";



const FormikController: React.FC<any> = ({ control, ...rest }) => {
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "select":
      return <Select {...rest} />;
    case "group":
      return <FormGroup {...rest} />;
    default:
      return null;
  }
};

export default FormikController;
