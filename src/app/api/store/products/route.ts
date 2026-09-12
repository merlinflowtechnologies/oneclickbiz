import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionUser } from '@/lib/auth';

// GET products for organization
export async function GET(req: NextRequest) {
  try {
    const session = await getSessionUser(req);
    if (!session || !session.organizationId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const products = await prisma.product.findMany({
      where: { organizationId: session.organizationId },
      orderBy: { order: 'asc' }
    });

    return NextResponse.json({ success: true, products });
  } catch (error: any) {
    console.error('Fetch products error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

// POST create product
export async function POST(req: NextRequest) {
  try {
    const session = await getSessionUser(req);
    if (!session || !session.organizationId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { name, description, price, currency, imageUrl, category, sku, isAvailable } = body;

    if (!name || price === undefined) {
      return NextResponse.json({ error: 'Product name and price are required' }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        organizationId: session.organizationId,
        name,
        description: description || '',
        price: parseFloat(price) || 0,
        currency: currency || 'INR',
        imageUrl: imageUrl || null,
        sku: sku || `SKU-${Date.now().toString(36).toUpperCase()}`,
        isAvailable: isAvailable !== undefined ? isAvailable : true
      }
    });

    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error: any) {
    console.error('Create product error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

// DELETE product
export async function DELETE(req: NextRequest) {
  try {
    const session = await getSessionUser(req);
    if (!session || !session.organizationId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    const product = await prisma.product.findUnique({
      where: { id }
    });

    if (!product || product.organizationId !== session.organizationId) {
      return NextResponse.json({ error: 'Product not found or unauthorized' }, { status: 404 });
    }

    await prisma.product.delete({
      where: { id }
    });

    return NextResponse.json({ success: true, message: 'Product deleted' });
  } catch (error: any) {
    console.error('Delete product error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
