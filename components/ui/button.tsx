import React from "react";

const buttonStyles = {
  base: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  
  variants: {
    default: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg transition-all duration-300",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    outline: "border-2 border-blue-600/30 bg-transparent hover:border-blue-600 hover:bg-blue-600/5",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
    ghost: "hover:bg-gray-100 hover:text-gray-900",
    link: "text-blue-600 underline-offset-4 hover:underline",
    hero: "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 shadow-lg font-semibold transition-all duration-300",
    accent: "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90 shadow-lg transition-all duration-300",
  },
  
  sizes: {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  }
} as const;

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonStyles.variants;
  size?: keyof typeof buttonStyles.sizes;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className = "", 
    variant = "default", 
    size = "default",
    children,
    ...props 
  }, ref) => {
    const classes = [
      buttonStyles.base,
      buttonStyles.variants[variant],
      buttonStyles.sizes[size],
      className
    ].filter(Boolean).join(" ");

    return (
      <button 
        ref={ref} 
        className={classes} 
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";