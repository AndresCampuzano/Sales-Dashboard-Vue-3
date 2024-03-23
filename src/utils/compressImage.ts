import imageCompression from 'browser-image-compression'
import { convertToBase64 } from './convertToBase64.ts'

/**
 * Compresses an image and returns it as base64
 */
export const compressImage = async (image: File): Promise<string> => {
  const options = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 1000,
    useWebWorker: true
  }
  try {
    const compressedImage = await imageCompression(image, options)
    return await convertToBase64(compressedImage)
  } catch (error) {
    throw new Error("Couldn't compress image " + error)
  }
}
