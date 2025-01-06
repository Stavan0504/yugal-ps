import React from "react";

function NextToggleIcon({ className,color }: { className?: string, color?: string;}) {
  return (
    <div className={className}>
      <svg
        width="11"
        height="12"
        viewBox="0 0 11 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.833171 6.00016H10.1665M10.1665 6.00016L5.49984 10.6668M10.1665 6.00016L5.49984 1.3335"
          stroke={color}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default NextToggleIcon;
