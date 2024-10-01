"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

interface CustomImageProps extends ImageProps {
  skeletonClassName?: string;
}

export function CustomImage({ skeletonClassName, ...props }: CustomImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative">
      {isLoading && (
        <Skeleton className={`w-full h-full ${skeletonClassName}`} />
      )}
      <Image
        {...props}
        onLoad={() => setIsLoading(false)}
        className={`${props.className} ${
          isLoading ? "opacity-0" : "opacity-100"
        } transition-opacity duration-300`}
        alt="123"
      />
    </div>
  );
}
