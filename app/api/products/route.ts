import { NextRequest, NextResponse } from 'next/server';
import { dbStatements } from '@/lib/db';
import { saveImageFile } from '@/lib/upload';

export async function GET() {
  try {
    const products = dbStatements.getAllProducts.all();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  return new Promise((resolve) => {
    const formData = request.formData();

    formData.then((data) => {
      const name = data.get('name') as string;
      const description = data.get('description') as string;
      const price = parseInt(data.get('price') as string);
      const quantity = parseInt(data.get('quantity') as string);
      const image = data.get('image') as File | null;

      if (!name || !description || !price || !quantity) {
        resolve(NextResponse.json({ error: 'Missing required fields' }, { status: 400 }));
        return;
      }

      let imagePath: string | null = null;

      if (image) {
        // Handle file upload using the new saveImageFile function
        saveImageFile(image).then((path) => {
          imagePath = path;
          createProduct();
        }).catch((error) => {
          console.error('Error uploading image:', error);
          resolve(NextResponse.json({ error: 'Failed to upload image' }, { status: 500 }));
        });
      } else {
        createProduct();
      }

      function createProduct() {
        try {
          const result = dbStatements.createProduct.run(name, description, price, quantity, imagePath);

          resolve(NextResponse.json({
            id: result.lastInsertRowid,
            name,
            description,
            price,
            quantity,
            image_path: imagePath
          }, { status: 201 }));
        } catch (error) {
          console.error('Error creating product:', error);
          resolve(NextResponse.json({ error: 'Failed to create product' }, { status: 500 }));
        }
      }
    }).catch((error) => {
      console.error('Error parsing form data:', error);
      resolve(NextResponse.json({ error: 'Invalid form data' }, { status: 400 }));
    });
  });
}