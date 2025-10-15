import { NextRequest, NextResponse } from 'next/server';
import { dbStatements } from '@/lib/db';
import { saveImageFile } from '@/lib/upload';

export async function GET() {
  try {
    const products = await dbStatements.getAllProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = parseInt(formData.get('price') as string);
    const quantity = parseInt(formData.get('quantity') as string);
    const image = formData.get('image') as File | null;

    if (!name || !description || !price || !quantity) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let imagePath: string | null = null;

    if (image) {
      // Handle file upload using the new saveImageFile function
      try {
        imagePath = await saveImageFile(image);
      } catch (error) {
        console.error('Error uploading image:', error);
        return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
      }
    }

    // Create product
    const result = await dbStatements.createProduct(name, description, price, quantity, imagePath);

    return NextResponse.json({
      id: result.lastInsertRowid || result.id,
      name,
      description,
      price,
      quantity,
      image_path: imagePath
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}