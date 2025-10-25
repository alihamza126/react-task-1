import { Field, ErrorMessage } from "formik";

interface FormInput {
  label: string;
  name: string;
  type?: string;
  as?: string;
  placeholder?: string;
}

const Input = ({
  label,
  name,
  type = "text",
  as,
  placeholder,
}: FormInput) => {
  return (
    <div className="flex flex-col mb-2">
      <label htmlFor={name} className="text-sm font-medium text-gray-500">
        {label}
      </label>

      <Field
        id={name}
        name={name}
        type={type}
        as={as}
        placeholder={placeholder}
        className="border border-gray-300 rounded px-3 py-3 mt-1 text-sm h-12 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none appearance-none"
      />

      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-xs my-1"
      />
    </div>
  );
};

export default Input;
