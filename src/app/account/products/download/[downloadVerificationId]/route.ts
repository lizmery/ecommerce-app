import prisma from '@/db/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
    req: NextRequest,
    {
        params: { downloadVerificationId },
    }: { params: { downloadVerificationId: string } }
) {
    const data = await prisma.downloadVerification.findUnique({
        where: { id: downloadVerificationId, expiresAt: { gt: new Date() } },
        select: { product: { select: { fileDownloadLink: true } } },
    })

    if (data == null) {
        return NextResponse.redirect(new URL('/products/download/expired', req.url))
    }

    return NextResponse.redirect(new URL(data.product.fileDownloadLink))
}