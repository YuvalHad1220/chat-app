import React from "react";
import classNames from "classnames";

type LoadingButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading: boolean;
};

const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading,
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={classNames("btn", className, {
        "opacity-50 cursor-not-allowed": isLoading,
      })}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="loading loading-spinner mr-2"></span>
          {children}
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default LoadingButton;
