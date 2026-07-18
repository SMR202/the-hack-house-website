"use client";

import * as React from "react";
import type { ImgHTMLAttributes } from "react";

const defaultFallback = "/images/program-fallback.jpg";

export function ImageWithFallback({ fallbackSrc = defaultFallback, onError, src, ...props }: ImgHTMLAttributes<HTMLImageElement> & { fallbackSrc?: string }) {
  const imageRef = React.useRef<HTMLImageElement>(null);
  const [resolvedSrc, setResolvedSrc] = React.useState(src);

  React.useEffect(() => {
    setResolvedSrc(src);
    const timer = window.setTimeout(() => {
      if (imageRef.current && !imageRef.current.complete) setResolvedSrc(fallbackSrc);
    }, 4000);
    return () => window.clearTimeout(timer);
  }, [fallbackSrc, src]);

  return (
    <img
      {...props}
      ref={imageRef}
      src={resolvedSrc}
      onError={(event) => {
        onError?.(event);
        if (event.currentTarget.src !== fallbackSrc) setResolvedSrc(fallbackSrc);
      }}
    />
  );
}
