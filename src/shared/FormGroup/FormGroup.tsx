import type React from "react";

interface FormGroupProps {
  children: React.ReactNode;
  cols?: number;
  gap?: number;
  className?: string;
}

const FormGroup: React.FC<FormGroupProps> = ({
  children,
  cols = 3,
  gap = 2,
  className,
}) => {
  return (
    <div className={className || `grid grid-cols-${cols} gap-${gap} mt-2`}>
      {children}
    </div>
  );
};

export default FormGroup;
