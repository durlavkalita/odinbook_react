import React, { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  const baseStyle =
    "inline-block px-4 py-2 font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50";
  const classes = className ? `${baseStyle} ${className}` : baseStyle;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
