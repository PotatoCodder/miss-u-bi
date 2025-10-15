import path from 'path';
import fs from 'fs';

// Ensure assets/images directory exists
const uploadDir = path.join(process.cwd(), 'assets', 'images');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export async function saveImageFile(file: File): Promise<string> {
  // Generate unique filename with timestamp
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  const extension = path.extname(file.name);
  const filename = 'product-' + uniqueSuffix + extension;

  // Check if it's an image
  if (!file.type.startsWith('image/')) {
    throw new Error('Only image files are allowed!');
  }

  // Check file size (5MB limit)
  if (file.size > 5 * 1024 * 1024) {
    throw new Error('File size too large. Maximum 5MB allowed.');
  }

  // Convert File to Buffer and save
  const buffer = Buffer.from(await file.arrayBuffer());
  const filepath = path.join(uploadDir, filename);
  fs.writeFileSync(filepath, buffer);

  // Also save to public directory for serving
  const publicDir = path.join(process.cwd(), 'public', 'assets', 'images');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  const publicFilepath = path.join(publicDir, filename);
  fs.writeFileSync(publicFilepath, buffer);

  return `/assets/images/${filename}`;
}