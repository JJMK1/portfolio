import { forwardRef } from "react";

const GradientText = forwardRef(function GradientText(
  {
    children,
    className = "",
    colors = ["#c084fc", "#ffffff", "#a855f7", "#ffffff", "#c084fc"], // purple + white
    animationSpeed = 8,
  },
  ref
) {
  return (
    <span
      ref={ref}
      className={`animated-gradient-text ${className}`}
      style={{
        "--gt-stops": colors.join(", "),
        "--gt-speed": `${animationSpeed}s`,
      }}
    >
      {children}
    </span>
  );
});

export default GradientText;
