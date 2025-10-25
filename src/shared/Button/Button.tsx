import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "primary" | "secondary" | "danger";
  showAlert?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  color = "primary",
  children,
  onClick,
  className,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "text-white px-6 py-2 rounded-full flex gap-2 items-center  hover:cursor-pointer hover:opacity-90 transition-all",
        {
          "bg-primary": color === "primary",
          "bg-gray-400": color === "secondary",
          "bg-red-400": color === "danger",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
