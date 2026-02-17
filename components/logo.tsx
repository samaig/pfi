"use client";

import { useState } from "react";
import Image from "next/image";

export function Logo({
  width = 120,
  height = 32,
  className = "h-8 w-auto",
}: {
  width?: number;
  height?: number;
  className?: string;
}) {
  const [error, setError] = useState(false);

  if (error) {
    return <span className="text-xl font-bold text-[#117A65]">Parentfits</span>;
  }

  return (
    <Image
      src="/logo.png"
      alt="Parentfits"
      width={width}
      height={height}
      className={className}
      onError={() => setError(true)}
    />
  );
}
