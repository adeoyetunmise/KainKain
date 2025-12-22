import React from "react";
import Link from "next/link";

export interface ButtonLinkProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "primary" | "secondary" | "accent" | "ghost" | "link";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  disabled?: boolean;
  target?: "_blank" | "_self";
  rel?: string;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({
  href,
  onClick,
  children,
  className = "",
  variant = "default",
  size = "md",
  disabled = false,
  target,
  rel,
  ...props
}) => {
  const baseClasses = `btn ${
    variant !== "default" ? `btn-${variant}` : ""
  } btn-${size} ${className} px-12 py-3 hover:scale-105 transition-transform duration-200 ease-in-out`;

  // If href is provided, render a link
  if (href) {
    return (
      <Link
        href={href}
        className={baseClasses}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : rel}
        {...props}
      >
        {children}
      </Link>
    );
  }

  // Otherwise render a button
  return (
    <button
      className={baseClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default ButtonLink;
