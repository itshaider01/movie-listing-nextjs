import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const Container = ({
  children,
  center,
}: Readonly<{
  children: React.ReactNode;
  center?: boolean;
}>) => {
  return (
    <main
      className={cn(
        "h-screen",
        center && "flex flex-col items-center justify-center bg-background"
      )}
    >
      <Image
        className={`object-contain w-40 h-28`}
        src={"/icons/logo.png"}
        alt=""
        width={160}
        height={80}
      />
      {children}
    </main>
  );
};

export default Container;
