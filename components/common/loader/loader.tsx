import { LoaderIcon } from "lucide-react";
import React from "react";

interface LoaderPropsType {
  className?: string;
}

const Loader = ({ className = "" }: LoaderPropsType) => {
  return <LoaderIcon className={`animate-spin w-4 h-4 ${className}`} />;
};

export default Loader;
