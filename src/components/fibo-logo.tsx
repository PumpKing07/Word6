interface FiboLogoProps {
  className?: string;
  variant?: "default" | "light";
}

export function FiboLogo({ className, variant = "default" }: FiboLogoProps) {
  const mainColor = variant === "light" ? "#FFFFFF" : "#FFD23F";
  const textColor = variant === "light" ? "#FFFFFF" : "#1A1A1A";

  return (
    <svg
      viewBox="0 0 120 64"
      className={className}
      aria-label="FIBO Pasta Bar"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="0"
        y="38"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="900"
        fontSize="40"
        fill={mainColor}
        letterSpacing="-2"
      >
        fibo
      </text>
      <text
        x="1"
        y="54"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="700"
        fontSize="9"
        fill={textColor}
        letterSpacing="3"
      >
        PASTA BAR
      </text>
      <circle cx="92" cy="20" r="14" fill={mainColor} />
      <circle cx="92" cy="20" r="10" fill="#F5E6B0" />
      <circle cx="87" cy="18" r="2" fill="#B93228" />
      <circle cx="96" cy="22" r="2" fill="#B93228" />
      <circle cx="92" cy="25" r="1.5" fill="#2D1A40" />
    </svg>
  );
}
