/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines class names using clsx and tailwind-merge
 * This ensures proper handling of Tailwind CSS classes and conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a file size in bytes to a human readable string
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

/**
 * Debounces a function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Creates a URL object from a file
 */
export function createObjectURL(file: File): string {
  return URL.createObjectURL(file)
}

/**
 * Revokes a URL object
 */
export function revokeObjectURL(url: string): void {
  URL.revokeObjectURL(url)
}

/**
 * Checks if an image file meets the minimum dimensions
 */
export function checkImageDimensions(
  file: File,
  minWidth: number,
  minHeight: number
): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image()
    img.src = createObjectURL(file)
    img.onload = () => {
      revokeObjectURL(img.src)
      resolve(img.width >= minWidth && img.height >= minHeight)
    }
    img.onerror = () => {
      revokeObjectURL(img.src)
      resolve(false)
    }
  })
}

/**
 * Checks if a file is an image
 */
export function isImageFile(file: File): boolean {
  return file.type.startsWith("image/")
}

/**
 * Gets the dimensions of an image
 */
export function getImageDimensions(
  file: File
): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const img = new Image()
    img.src = createObjectURL(file)
    img.onload = () => {
      revokeObjectURL(img.src)
      resolve({ width: img.width, height: img.height })
    }
  })
}

/**
 * Generates a random ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

/**
 * Downloads a blob as a file
 */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Converts a blob to a base64 string
 */
export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

/**
 * Converts a base64 string to a blob
 */
export function base64ToBlob(base64: string): Promise<Blob> {
  return fetch(base64).then((res) => res.blob())
}

/**
 * Validates image file type and dimensions
 */
export async function validateImage(
  file: File,
  options: { 
    maxSize?: number;
    minWidth?: number;
    minHeight?: number;
    acceptedTypes?: string[];
  } = {}
): Promise<{ valid: boolean; error?: string }> {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB
    minWidth = 1000,
    minHeight = 1000,
    acceptedTypes = ["image/jpeg", "image/png", "image/webp"]
  } = options;

  if (!isImageFile(file)) {
    return { valid: false, error: "File must be an image" }
  }

  if (!acceptedTypes.includes(file.type)) {
    return { 
      valid: false, 
      error: `File must be one of: ${acceptedTypes.join(", ")}` 
    }
  }

  if (file.size > maxSize) {
    return { 
      valid: false, 
      error: `File size must be less than ${formatFileSize(maxSize)}` 
    }
  }

  const dimensions = await getImageDimensions(file)
  if (dimensions.width < minWidth || dimensions.height < minHeight) {
    return { 
      valid: false, 
      error: `Image must be at least ${minWidth}x${minHeight}px` 
    }
  }

  return { valid: true }
}

/**
 * Gets the contrast ratio between two colors
 * Used for determining text color based on background
 */
export function getContrastRatio(color1: string, color2: string): number {
  const getLuminance = (r: number, g: number, b: number) => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255
      return c <= 0.03928
        ? c / 12.92
        : Math.pow((c + 0.055) / 1.055, 2.4)
    })
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
  }

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? [
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16),
        ]
      : [0, 0, 0]
  }

  const [r1, g1, b1] = hexToRgb(color1)
  const [r2, g2, b2] = hexToRgb(color2)
  const l1 = getLuminance(r1, g1, b1)
  const l2 = getLuminance(r2, g2, b2)
  const brightest = Math.max(l1, l2)
  const darkest = Math.min(l1, l2)
  return (brightest + 0.05) / (darkest + 0.05)
}

export type { ClassValue }