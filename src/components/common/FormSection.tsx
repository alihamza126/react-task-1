import type React from "react";

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const FormSection: React.FC<FormSectionProps> = ({ title, children, className }) => {
  return (
    <section className={className}>
      <h3 className="text-indigo-600 font-medium mb-2">{title}</h3>
      {children}
    </section>
  );
};

export default FormSection;
