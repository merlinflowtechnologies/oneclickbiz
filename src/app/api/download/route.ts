import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'OneClickBiz Download Engine',
    timestamp: new Date().toISOString(),
  });
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const filename = (formData.get('filename') as string) || 'document.pdf';
    const contentType = (formData.get('contentType') as string) || 'application/pdf';
    const base64Data = formData.get('base64') as string;

    if (!base64Data) {
      return new NextResponse('Missing base64 data payload', { status: 400 });
    }

    // Remove data-URI scheme if present
    const cleanBase64 = base64Data.replace(/^data:[^;]+;base64,/, '');
    const buffer = Buffer.from(cleanBase64, 'base64');

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename.replace(/"/g, '')}"`,
        'Content-Length': buffer.length.toString(),
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (err: any) {
    console.error('Download route error:', err);
    return new NextResponse(err?.message || 'Server error during download processing', { status: 500 });
  }
}
