/**
 * Automatically converts a standard Google Drive sharing/view link into a direct high-performance image hotlink.
 * Works with view links, direct query parameter links, and sharing formats.
 * 
 * Example Input:  https://drive.google.com/file/d/1A2B3C4D5E/view?usp=sharing
 * Example Output: https://lh3.googleusercontent.com/d/1A2B3C4D5E
 */
export function getDirectGoogleDriveLink(url: string): string {
  if (!url) return '';
  
  // If it's already a direct googleusercontent link or not from Google Drive, return as-is
  if (!url.includes('drive.google.com') && !url.includes('docs.google.com')) {
    return url;
  }
  
  let fileId = '';
  
  // 1. Try to match the standard /file/d/FILE_ID/ format
  const fileDMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileDMatch && fileDMatch[1]) {
    fileId = fileDMatch[1];
  } else {
    // 2. Try to match id=FILE_ID query parameter
    const idParamMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (idParamMatch && idParamMatch[1]) {
      fileId = idParamMatch[1];
    }
  }
  
  if (fileId) {
    // Return high-performance direct link via googleusercontent (Google's optimized CDN)
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }
  
  return url;
}
