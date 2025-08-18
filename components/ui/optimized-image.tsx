import Image from "next/image"
import { CldImage } from 'next-cloudinary'
import { useState } from "react"

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  fill?: boolean
  sizes?: string
  priority?: boolean
  quality?: number
}

export function OptimizedImage({ 
  src, 
  alt, 
  className = "", 
  fill = false, 
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  priority = false,
  quality = 80
}: OptimizedImageProps) {
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  // Check if it's a Cloudinary image
  const isCloudinaryImage = src.includes('cloudinary') || src.includes('res.cloudinary.com')

  if (error) {
    return (
      <div className={`bg-muted flex items-center justify-center ${className}`}>
        <div className="text-center text-muted-foreground">
          <svg
            className="mx-auto h-12 w-12 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-xs">Imagen no disponible</p>
        </div>
      </div>
    )
  }

  if (isCloudinaryImage) {
    return (
      <CldImage
        src={src}
        alt={alt}
        fill={fill}
        className={`duration-700 ease-in-out ${
          isLoading
            ? 'scale-110 blur-2xl grayscale'
            : 'scale-100 blur-0 grayscale-0'
        } ${className}`}
        sizes={sizes}
        quality={quality}
        onLoad={() => setLoading(false)}
        onError={() => setError(true)}
        priority={priority}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      className={`duration-700 ease-in-out ${
        isLoading
          ? 'scale-110 blur-2xl grayscale'
          : 'scale-100 blur-0 grayscale-0'
      } ${className}`}
      sizes={sizes}
      quality={quality}
      onLoad={() => setLoading(false)}
      onError={() => setError(true)}
      priority={priority}
    />
  )
}
