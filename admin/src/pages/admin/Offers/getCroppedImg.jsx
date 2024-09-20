

// Implement this function to return a cropped image URL
const getCroppedImg = (imageSrc, croppedAreaPixels) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;

    image.onload = () => {
      // Ensure croppedAreaPixels has all required properties
      if (!croppedAreaPixels || 
          typeof croppedAreaPixels.x !== 'number' || 
          typeof croppedAreaPixels.y !== 'number' || 
          typeof croppedAreaPixels.width !== 'number' || 
          typeof croppedAreaPixels.height !== 'number') {
        return reject(new Error('Invalid cropped area dimensions.'));
      }

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Set canvas size to the cropped area
      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      // Draw the cropped image on canvas
      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );

      // Convert canvas to blob and resolve with URL
      canvas.toBlob((blob) => {
        if (blob) {
          const croppedImageUrl = URL.createObjectURL(blob);
          resolve(croppedImageUrl);
        } else {
          reject(new Error('Failed to create cropped image blob.'));
        }
      }, 'image/jpeg');
    };

    image.onerror = () => {
      reject(new Error('Failed to load image.'));
    };
  });
};

export default getCroppedImg;