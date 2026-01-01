import React from "react";

const LoadingIcon = ({ size = 40, strokeWidth = 4, className = "text-white" }) => {
  return (
      <div className="flex items-center justify-center">
      <svg
        className={`animate-spin ${className}`}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* fondo tenue */}
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="opacity-25"
        />
        {/* arco visible (sin fill) */}
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className="opacity-75"
          strokeDasharray="60" 
          strokeDashoffset="15"
        />
        </svg>
          
    </div>
  );
};

export default  LoadingIcon;
