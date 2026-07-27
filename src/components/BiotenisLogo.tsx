import { SVGProps } from "react";

export default function BiotenisLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 300 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Background Swoosh */}
      <path
        d="M20,70 Q150,110 280,30 Q180,-10 20,70 Z"
        fill="#333333"
      />
      
      {/* Tennis Ball */}
      <circle cx="260" cy="35" r="12" fill="#E1FF00" />
      <path d="M255,25 Q265,35 255,45 M265,25 Q255,35 265,45" stroke="#333333" strokeWidth="2" fill="none" />
      
      {/* "Biotenis" Text */}
      <text
        x="150"
        y="75"
        fontFamily="'Arial Black', 'Impact', sans-serif"
        fontSize="56"
        fontWeight="900"
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth="2"
        textAnchor="middle"
        style={{ fontStyle: "italic" }}
      >
        Biotenis
      </text>

      {/* Bottom Swoosh */}
      <path
        d="M50,90 Q150,105 250,85"
        stroke="#333333"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}
