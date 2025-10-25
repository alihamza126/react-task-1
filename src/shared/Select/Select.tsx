import { Field, ErrorMessage } from "formik";
import type React from "react";

interface SelectProps {
  name: string;
  label?: string;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({
  name,
  label,
  options,
  placeholder = "Select an option",
}) => {
  return (
    <div className="flex flex-col mb-2">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-500">
          {label}
        </label>
      )}
      <Field
        as="select"
        name={name}
        id={name}
        className="border border-gray-300 rounded px-3 py-3 mt-1 text-sm h-12  focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none appearance-none bg-white"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field>
      <ErrorMessage
        name={name}
        className="text-red-500 text-xs my-1"
        component="span"
      />
    </div>
  );
};

export default Select;
