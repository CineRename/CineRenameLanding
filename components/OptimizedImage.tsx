import Image from "next/image";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  loading?: "lazy" | "eager";
  quality?: number;
  sizes?: string;
  fill?: boolean;
  style?: React.CSSProperties;
  fetchPriority?: "high" | "low" | "auto";
}

export default function OptimizedImage({
  src,
  alt,
  className = "",
  width,
  height,
  priority = false,
  loading,
  quality = 75,
  sizes,
  fill = false,
  style,
  fetchPriority,
}: OptimizedImageProps) {
  const effectiveLoading = priority ? undefined : (loading ?? "lazy");
  const effectiveFetchPriority = priority ? "high" : fetchPriority;

  const isGif = src.endsWith('.gif');

  if (isGif) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={className}
        loading={effectiveLoading}
        fetchPriority={effectiveFetchPriority}
        style={style}
      />
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        priority={priority}
        loading={effectiveLoading}
        fetchPriority={effectiveFetchPriority}
        quality={quality}
        sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
        style={style}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width || 800}
      height={height || 600}
      className={className}
      priority={priority}
      loading={effectiveLoading}
      fetchPriority={effectiveFetchPriority}
      quality={quality}
      sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
      style={style}
    />
  );
}
