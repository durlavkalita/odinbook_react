import React from "react";

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 24,
  color = "blue",
}) => {
  const spinnerStyle: React.CSSProperties = {
    width: size,
    height: size,
    borderTopColor: color,
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className="border-4 border-t-4 rounded-full animate-spin"
        style={spinnerStyle}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
