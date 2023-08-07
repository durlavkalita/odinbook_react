import React, { useState, useEffect } from "react";

interface FlashMessageProps {
  message: string;
}

const FlashMessage: React.FC<FlashMessageProps> = ({ message }) => {
  const [show, setShow] = useState(true);
  const duration = 5000;
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration]);

  const handleDismiss = () => {
    setShow(false);
  };

  if (!show) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-lg text-white bg-red-500`}
    >
      {message}
      <button className="float-right text-white ml-2" onClick={handleDismiss}>
        X
      </button>
    </div>
  );
};

export default FlashMessage;
